import type { Metadata } from "next";
import LegalPageShell, { LegalSection } from "@/components/LegalPageShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Arsy Consulting — how we collect, use, and protect personal information, including A2P SMS messaging consent practices.",
  alternates: {
    canonical: "https://arsyconsulting.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      description="This Privacy Policy explains how Arsy Consulting collects, uses, and protects information when you use our website, request an operational audit, or communicate with us by SMS or email."
      lastUpdated="September 23, 2026"
    >
      <LegalSection title="1. Who We Are">
        <p>
          Arsy Consulting (&quot;Arsy,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides
          operational consulting services for manufacturing organizations. This policy applies to
          arsyconsulting.com and related inquiry, audit-request, and messaging channels.
        </p>
        <p>
          For privacy questions, contact us at{" "}
          <a
            href="mailto:info@arsyconsulting.com"
            className="font-medium text-emerald-600 underline-offset-2 hover:underline dark:text-emerald-400"
          >
            info@arsyconsulting.com
          </a>{" "}
          or +852 800 938 238.
        </p>
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <p>When you submit an audit request or otherwise contact us, we may collect:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Full name</li>
          <li>Business email address</li>
          <li>Company name</li>
          <li>Plant / facility location</li>
          <li>Operational challenges and related project details</li>
          <li>Phone number (when provided for SMS or call coordination)</li>
          <li>Discovery call preferences (date and time), if scheduled</li>
          <li>SMS consent preferences (non-marketing and/or marketing), when indicated</li>
        </ul>
        <p>
          We may also collect limited technical data such as browser type, device information, and
          pages visited through standard website analytics and cookies (see Cookies below).
        </p>
      </LegalSection>

      <LegalSection title="3. How We Use Information">
        <p>We use the information we collect to:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Provide operational consulting services and respond to inquiries</li>
          <li>Evaluate audit requests and prepare structured assessment proposals</li>
          <li>Schedule and confirm discovery calls</li>
          <li>
            Send non-marketing text messages regarding operational consulting inquiries when you
            provide consent
          </li>
          <li>
            Send marketing text messages regarding promotional updates and insights when you
            provide separate marketing consent
          </li>
          <li>Improve our website, forms, and service experience</li>
          <li>Comply with legal and regulatory obligations</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Mobile Information &amp; SMS Privacy (A2P Compliance)">
        <p>
          <strong className="font-semibold text-slate-800 dark:text-slate-100">
            No mobile information will be shared with third parties/affiliates for
            marketing/promotional purposes. All the above categories exclude text messaging
            originator opt-in data and consent; this information will not be shared with any third
            parties.
          </strong>
        </p>
        <p>
          Text messaging opt-in data, consent records, and related mobile numbers are used solely to
          deliver messages you have consented to receive and to honor opt-out requests. They are not
          sold, rented, or shared with third parties or affiliates for their own marketing or
          promotional use.
        </p>
      </LegalSection>

      <LegalSection title="5. Message Frequency &amp; Opt-Out Options">
        <p>
          Message frequency varies based on your inquiry and the communications you have consented
          to receive. Message and data rates may apply.
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Reply <strong className="font-semibold text-slate-800 dark:text-slate-100">STOP</strong>{" "}
            to any SMS message from Arsy Consulting to opt out at any time. You will receive a
            confirmation and no further messages of that program will be sent unless you opt in
            again.
          </li>
          <li>
            Reply <strong className="font-semibold text-slate-800 dark:text-slate-100">HELP</strong>{" "}
            for assistance with our SMS programs.
          </li>
        </ul>
        <p>
          You may also withdraw SMS consent or request assistance by emailing{" "}
          <a
            href="mailto:info@arsyconsulting.com"
            className="font-medium text-emerald-600 underline-offset-2 hover:underline dark:text-emerald-400"
          >
            info@arsyconsulting.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="6. Sharing of Information">
        <p>
          We do not sell personal information. We may share information only with service providers
          who help us operate our website, send transactional email, or deliver SMS messages you
          have consented to receive — and only as needed to perform those services under appropriate
          confidentiality obligations. As stated above, text messaging originator opt-in data and
          consent are not shared with third parties for marketing or promotional purposes.
        </p>
        <p>
          We may also disclose information if required by law, regulation, legal process, or to
          protect the rights, safety, or property of Arsy Consulting or others.
        </p>
      </LegalSection>

      <LegalSection title="7. Data Security">
        <p>
          We implement reasonable administrative, technical, and organizational measures designed to
          protect personal information against unauthorized access, loss, misuse, or alteration.
          However, no method of transmission or storage is completely secure, and we cannot
          guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="8. Cookies &amp; Similar Technologies">
        <p>
          Our website may use cookies or similar technologies to support core functionality, remember
          preferences (such as light/dark theme), and understand how visitors use the site. You can
          control cookies through your browser settings. Disabling certain cookies may affect site
          functionality.
        </p>
      </LegalSection>

      <LegalSection title="9. Data Retention">
        <p>
          We retain personal information for as long as needed to fulfill the purposes described in
          this policy, maintain business records, honor consent and opt-out preferences, and meet
          legal or regulatory requirements.
        </p>
      </LegalSection>

      <LegalSection title="10. Your Rights">
        <p>
          Depending on your location, you may have rights to access, correct, delete, or restrict
          processing of your personal information, or to object to certain uses. To exercise these
          rights, contact us using the details below. We may need to verify your identity before
          responding.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact Information for Privacy Inquiries">
        <p>Arsy Consulting</p>
        <p>
          Hopewell Centre, 3308A, 33/F.
          <br />
          183 Queen&apos;s Road East
          <br />
          Wanchai, Hong Kong
        </p>
        <p>
          Email:{" "}
          <a
            href="mailto:info@arsyconsulting.com"
            className="font-medium text-emerald-600 underline-offset-2 hover:underline dark:text-emerald-400"
          >
            info@arsyconsulting.com
          </a>
          <br />
          Phone:{" "}
          <a
            href="tel:+852800938238"
            className="font-medium text-emerald-600 underline-offset-2 hover:underline dark:text-emerald-400"
          >
            +852 800 938 238
          </a>
        </p>
      </LegalSection>

      <LegalSection title="12. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at
          the top of this page reflects the latest revision. Continued use of our website or
          services after changes constitutes acceptance of the updated policy where permitted by
          law.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
