import sharp from "sharp";
import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const src =
  "C:/Users/gabri/.cursor/projects/c-Users-gabri-OneDrive-Documents-arsyconsulting/assets/c__Users_gabri_AppData_Roaming_Cursor_User_workspaceStorage_097b38e493abb1d7f8b35fb6d1c57b5c_images_image-f3813ded-7003-4734-9cac-8c59470addfa.jpg";

const trimmed = await sharp(src).trim({ threshold: 20 }).toBuffer({ resolveWithObject: true });
const monoH = Math.round(trimmed.info.height * 0.48);
const mono = await sharp(trimmed.data)
  .extract({ left: 0, top: 0, width: trimmed.info.width, height: monoH })
  .trim({ threshold: 15 })
  .toBuffer();

const size = 512;
const pad = Math.round(size * 0.12);
const inner = size - pad * 2;

const logoOnWhite = await sharp(mono)
  .resize(inner, inner, {
    fit: "contain",
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  })
  .extend({
    top: pad,
    bottom: pad,
    left: pad,
    right: pad,
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  })
  .png()
  .toBuffer();

const circleSvg = Buffer.from(
  `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/></svg>`,
);

const circular = await sharp(logoOnWhite)
  .composite([{ input: circleSvg, blend: "dest-in" }])
  .png()
  .toBuffer();

await sharp(circular).resize(192, 192).png().toFile("src/app/icon.png");
await sharp(circular).resize(180, 180).png().toFile("src/app/apple-icon.png");
await sharp(circular).resize(180, 180).png().toFile("public/apple-icon.png");
await sharp(circular).resize(192, 192).png().toFile("public/icon-192.png");
await sharp(circular).resize(32, 32).png().toFile("public/favicon.png");
await sharp(circular).png().toFile("public/icon-512.png");

let toIco;
try {
  toIco = require("to-ico");
} catch {
  const { execSync } = await import("child_process");
  execSync("npm install to-ico --no-save --no-fund --no-audit", { stdio: "inherit" });
  toIco = require("to-ico");
}

const sizes = await Promise.all(
  [16, 32, 48].map((s) => sharp(circular).resize(s, s).png().toBuffer()),
);
const ico = await toIco(sizes);
fs.writeFileSync("src/app/favicon.ico", ico);
fs.writeFileSync("public/favicon.ico", ico);

console.log("circular favicon done");
