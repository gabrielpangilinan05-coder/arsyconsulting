import type { Metadata } from "next";
import LegalPageShell, { LegalSection } from "@/components/LegalPageShell";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and Conditions for Arsy Consulting — website use, audit requests, SMS messaging, intellectual property, and liability.",
  alternates: {
    canonical: "https://arsyconsulting.com/terms",
  },
};

export default function TermsPage() {
  return (
    <LegalPageShell
      title="Terms and Conditions"
      description="These Terms and Conditions govern your use of the Arsy Consulting website, audit request forms, ROI estimator tools, and related communications, including SMS."
      lastUpdated="September 23, 2026"
    >
      <LegalSection title="1. Acceptance of Terms">
        <p>
          By accessing arsyconsulting.com, submitting an audit request, using our ROI estimator, or
          otherwise interacting with Arsy Consulting (&quot;Arsy,&quot; &quot;we,&quot;
          &quot;us,&quot; or &quot;our&quot;), you agree to these Terms and Conditions and our{" "}
          <a
            href="/privacy-policy"
            className="font-medium text-emerald-600 underline-offset-2 hover:underline dark:text-emerald-400"
          >
            Privacy Policy
          </a>
          . If you do not agree, do not use the website or related forms.
        </p>
      </LegalSection>

      <LegalSection title="2. About Arsy Consulting">
        <p>
          Arsy Consulting provides operational consulting services for manufacturing organizations,
          including food and industrial production facilities. Content on this website describes our
          services generally and does not create a consulting engagement until agreed in a separate
          written agreement.
        </p>
      </LegalSection>

      <LegalSection title="3. Consulting Services Disclaimer">
        <p>
          Operational audits, discovery calls, ROI estimator outputs, case examples, and other tools
          or materials on this website are provided for informational and preliminary assessment
          purposes only. They do not constitute formal advice, a guaranteed outcome, or a binding
          proposal unless expressly confirmed in writing.
        </p>
        <p>
          Actual results depend on facility conditions, data quality, implementation effort, and
          other factors outside our control. Estimator figures are illustrative and should not be
          relied upon as definitive financial projections.
        </p>
      </LegalSection>

      <LegalSection title="4. User Responsibilities">
        <p>When using our website or submitting forms, you agree to:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Provide accurate, current, and complete information</li>
          <li>Use the site only for lawful purposes related to legitimate business inquiries</li>
          <li>Not attempt to disrupt, scrape, reverse engineer, or misuse the website or tools</li>
          <li>Not submit confidential third-party information without authorization</li>
        </ul>
        <p>
          You are responsible for the accuracy of information you submit in audit requests and
          related communications.
        </p>
      </LegalSection>

      <LegalSection title="5. SMS Messaging Terms">
        <p>
          By providing consent through our website forms, you may opt in to receive text messages
          from Arsy Consulting. Non-marketing and marketing consents are collected separately where
          offered.
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Message frequency varies</li>
          <li>Message and data rates may apply</li>
          <li>
            Reply <strong className="font-semibold text-slate-800 dark:text-slate-100">STOP</strong>{" "}
            to opt out at any time
          </li>
          <li>
            Reply <strong className="font-semibold text-slate-800 dark:text-slate-100">HELP</strong>{" "}
            for assistance
          </li>
        </ul>
        <p>
          Consent to receive SMS is not a condition of purchasing services. Mobile information and
          text messaging opt-in data are handled as described in our Privacy Policy and are not
          shared with third parties or affiliates for their marketing or promotional purposes.
        </p>
      </LegalSection>

      <LegalSection title="6. Intellectual Property">
        <p>
          All content on this website — including text, graphics, logos, frameworks, ROI estimators,
          methodology descriptions, and downloadable or interactive materials — is owned by or
          licensed to Arsy Consulting and is protected by intellectual property laws.
        </p>
        <p>
          You may view and use the site for personal or internal business evaluation related to
          engaging Arsy. You may not copy, modify, distribute, republish, or commercially exploit our
          content, estimators, or materials without prior written permission.
        </p>
      </LegalSection>

      <LegalSection title="7. Third-Party Links">
        <p>
          The website may contain links to third-party sites (for example, maps or social profiles).
          We are not responsible for the content, privacy practices, or terms of those sites.
        </p>
      </LegalSection>

      <LegalSection title="8. Limitation of Liability">
        <p>
          To the fullest extent permitted by law, Arsy Consulting and its officers, employees, and
          agents shall not be liable for any indirect, incidental, special, consequential, or
          punitive damages, or any loss of profits, data, or business opportunity, arising from your
          use of the website, forms, estimators, or SMS communications.
        </p>
        <p>
          Our total liability for any claim arising from website use shall not exceed the greater of
          (a) the fees you paid to Arsy Consulting for services directly related to that claim in the
          twelve months preceding the claim, or (b) USD $100, if no such fees were paid.
        </p>
        <p>
          Nothing in these terms excludes liability that cannot be limited or excluded under
          applicable law.
        </p>
      </LegalSection>

      <LegalSection title="9. Indemnification">
        <p>
          You agree to indemnify and hold harmless Arsy Consulting from claims, damages, and expenses
          (including reasonable legal fees) arising from your misuse of the website, inaccurate
          submissions, or violation of these Terms.
        </p>
      </LegalSection>

      <LegalSection title="10. Governing Law">
        <p>
          These Terms are governed by the laws of Hong Kong Special Administrative Region, without
          regard to conflict-of-law principles. Courts located in Hong Kong shall have exclusive
          jurisdiction over disputes arising from these Terms or your use of the website, except
          where mandatory local law provides otherwise.
        </p>
      </LegalSection>

      <LegalSection title="11. Changes to These Terms">
        <p>
          We may revise these Terms and Conditions from time to time. The &quot;Last updated&quot;
          date at the top of this page reflects the latest revision. Continued use of the website
          after changes constitutes acceptance of the updated Terms where permitted by law.
        </p>
      </LegalSection>

      <LegalSection title="12. Contact">
        <p>
          Questions about these Terms may be directed to{" "}
          <a
            href="mailto:info@arsyconsulting.com"
            className="font-medium text-emerald-600 underline-offset-2 hover:underline dark:text-emerald-400"
          >
            info@arsyconsulting.com
          </a>{" "}
          or +852 800 938 238.
        </p>
        <p>
          Arsy Consulting
          <br />
          Hopewell Centre, 3308A, 33/F.
          <br />
          183 Queen&apos;s Road East, Wanchai, Hong Kong
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
