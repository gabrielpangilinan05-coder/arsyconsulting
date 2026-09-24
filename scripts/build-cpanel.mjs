import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const apiDir = join(root, "src", "app", "api");
const apiBackup = join(root, "src", "app", "_api.static-backup");
const outDir = join(root, "out");
const htaccessSrc = join(root, "deploy", "htaccess");
const phpSrc = join(root, "deploy", "api");

function run(command, args, env = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, ...env },
    shell: true,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function removePath(path) {
  if (!existsSync(path)) return;
  rmSync(path, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}

let backedUp = false;

try {
  if (existsSync(apiDir)) {
    removePath(apiBackup);
    cpSync(apiDir, apiBackup, { recursive: true });
    removePath(apiDir);
    backedUp = true;
    console.log("Temporarily removed src/app/api (not supported by static export).");
  }

  run("npx", ["next", "build"], { DEPLOY_TARGET: "cpanel" });

  if (!existsSync(outDir)) {
    console.error("Build finished but out/ was not created.");
    process.exit(1);
  }

  const apiOut = join(outDir, "api");
  mkdirSync(apiOut, { recursive: true });
  cpSync(phpSrc, apiOut, { recursive: true });
  cpSync(htaccessSrc, join(outDir, ".htaccess"));

  const localConfig = join(apiOut, "config.local.php");
  if (existsSync(localConfig)) {
    removePath(localConfig);
  }

  const example = join(apiOut, "config.example.php");
  if (!existsSync(example)) {
    writeFileSync(
      example,
      "<?php\n// Copy to config.local.php on the server and fill in values.\n",
    );
  }

  console.log("\nCPanel build ready in out/");
  console.log("Upload the contents of out/ to public_html (or ~/arsycons/).");
  console.log("On the server, copy api/config.example.php → api/config.local.php and edit it.");
} finally {
  if (backedUp && existsSync(apiBackup)) {
    removePath(apiDir);
    cpSync(apiBackup, apiDir, { recursive: true });
    removePath(apiBackup);
    console.log("Restored src/app/api.");
  }
}
