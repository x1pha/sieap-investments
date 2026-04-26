import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: "easeOut" as const },
  }),
};

const Section = ({ title, children, i = 0 }: { title: string; children: React.ReactNode; i?: number }) => (
  <motion.section
    initial="hidden" whileInView="visible" viewport={{ once: true }}
    variants={fadeUp} custom={i}
    className="mb-10"
  >
    <h2 className="text-xl font-semibold text-foreground mb-4">{title}</h2>
    <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">{children}</div>
  </motion.section>
);

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Privacy Policy | SIEAP"
        description="SIEAP's Privacy Policy — how we collect, use, and protect your personal and financial information on our evaluation-first investment platform."
        canonical="https://sieapinvest.com/legal/privacy"
      />
      <Navigation />

      <div className="container px-4 pt-32 pb-24 max-w-3xl mx-auto">
        <motion.p
          initial="hidden" animate="visible" variants={fadeUp}
          className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4"
        >
          Legal
        </motion.p>
        <motion.h1
          initial="hidden" animate="visible" variants={fadeUp} custom={1}
          className="text-4xl md:text-5xl font-bold mb-3"
        >
          Privacy Policy
        </motion.h1>
        <motion.p
          initial="hidden" animate="visible" variants={fadeUp} custom={2}
          className="text-sm text-muted-foreground mb-12"
        >
          Effective Date: 1 January 2025 &nbsp;·&nbsp; Last Updated: 26 April 2026
        </motion.p>

        <div className="prose-invert">
          <Section title="1. Introduction" i={3}>
            <p>
              SIEAP Group ("SIEAP", "we", "us", or "our") operates the platform at <span className="text-foreground">sieapinvest.com</span> and
              associated digital services (collectively, the "Platform"). We are committed to protecting
              the privacy and confidentiality of information entrusted to us by founders, investors,
              incubators, and other users of the Platform.
            </p>
            <p>
              This Privacy Policy describes the categories of information we collect, how we use and
              share that information, the choices available to you, and how we safeguard your data.
              By accessing or using the Platform, you acknowledge that you have read and understood
              this Policy.
            </p>
          </Section>

          <Section title="2. Information We Collect" i={4}>
            <p><span className="text-foreground font-medium">2.1 Information you provide directly</span></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Identity information: full name, date of birth, government-issued identification documents (PAN, Aadhaar, passport).</li>
              <li>Contact information: email address, phone number, postal address.</li>
              <li>Financial information: bank account details, CA-verified financial statements, MCA filings, GST registration numbers, and valuation-related disclosures.</li>
              <li>Professional background: company name, designation, LinkedIn profile, pitch decks, and business plan documents submitted through the Platform.</li>
              <li>Communication records: messages sent to SIEAP through the Platform, email correspondence, and support requests.</li>
            </ul>
            <p className="mt-3"><span className="text-foreground font-medium">2.2 Information collected automatically</span></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Device and browser information: IP address, browser type and version, operating system, and device identifiers.</li>
              <li>Usage data: pages visited, time spent on the Platform, navigation paths, and feature interactions.</li>
              <li>Cookies and similar technologies: session cookies, authentication tokens, and analytics trackers (detailed in Section 8).</li>
            </ul>
            <p className="mt-3"><span className="text-foreground font-medium">2.3 Information from third parties</span></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Publicly available regulatory databases: MCA21, GSTIN portal, DPIIT Startup India recognition records.</li>
              <li>Partner verification bodies: chartered accountants and legal professionals engaged as part of our due-diligence process.</li>
              <li>Referral partners: incubators, E-Cells, and accelerators who introduce startups to the Platform.</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information" i={5}>
            <p>We process personal information for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="text-foreground">Platform operations:</span> creating and managing accounts, processing applications, generating evaluation scores, and facilitating connections between startups and investors.</li>
              <li><span className="text-foreground">Evaluation and due diligence:</span> conducting CA-verified valuations, scoring startups on our 100-point framework, and preparing investor-ready documentation.</li>
              <li><span className="text-foreground">Investor matching:</span> presenting pre-evaluated startup profiles to pre-partnered investors on the SIEAP dashboard.</li>
              <li><span className="text-foreground">Communications:</span> sending transactional notices, evaluation updates, mentor session schedules, and platform announcements.</li>
              <li><span className="text-foreground">Legal and regulatory compliance:</span> meeting obligations under applicable Indian law, including SEBI guidelines, DPIIT regulations, and the Information Technology Act, 2000.</li>
              <li><span className="text-foreground">Security and fraud prevention:</span> monitoring for unauthorised access, suspicious activity, and integrity violations.</li>
              <li><span className="text-foreground">Analytics and product improvement:</span> understanding how the Platform is used to improve features, fix issues, and develop new services.</li>
            </ul>
          </Section>

          <Section title="4. Legal Bases for Processing" i={6}>
            <p>
              Where applicable under the Digital Personal Data Protection Act, 2023 ("DPDPA") and
              other applicable laws, we rely on the following legal bases:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="text-foreground">Consent:</span> where you have freely given, specific, informed, and unambiguous consent.</li>
              <li><span className="text-foreground">Contract performance:</span> where processing is necessary to fulfil our agreement with you.</li>
              <li><span className="text-foreground">Legal obligation:</span> where we are required to process data to comply with applicable law or a court order.</li>
              <li><span className="text-foreground">Legitimate interests:</span> where processing is necessary for our legitimate business interests, provided those interests are not overridden by your rights.</li>
            </ul>
          </Section>

          <Section title="5. Information Sharing and Disclosure" i={7}>
            <p>
              SIEAP does not sell or rent your personal information. We may share information in the
              following limited circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="text-foreground">Pre-partnered investors:</span> with your explicit consent, startup founders' evaluated profiles and data-room materials are shared with investors registered on the SIEAP dashboard.</li>
              <li><span className="text-foreground">Verification partners:</span> chartered accountants, legal advisers, and compliance professionals engaged to conduct CA-verification, valuation, and due diligence on your behalf.</li>
              <li><span className="text-foreground">Service providers:</span> cloud infrastructure, analytics, and communications providers operating under data processing agreements and bound by confidentiality obligations.</li>
              <li><span className="text-foreground">Regulatory authorities:</span> SEBI, MCA, DPIIT, Income Tax authorities, and law-enforcement bodies when required by applicable law or a valid legal process.</li>
              <li><span className="text-foreground">Business transfers:</span> in the event of a merger, acquisition, or sale of substantially all assets, your information may transfer to the successor entity subject to equivalent privacy protections.</li>
            </ul>
          </Section>

          <Section title="6. Data Retention" i={8}>
            <p>
              We retain personal information for as long as necessary to fulfil the purposes described
              in this Policy, unless a longer retention period is required or permitted by law. Specific
              retention periods include:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Account and profile data: for the duration of your active relationship with SIEAP, plus 7 years thereafter for regulatory and audit purposes.</li>
              <li>Financial and CA-verified documents: 8 years from the date of verification, in line with applicable Indian accounting standards.</li>
              <li>Usage and analytics data: up to 24 months in identifiable form; thereafter in aggregated, anonymised form indefinitely.</li>
              <li>Communications: 3 years from the date of the last interaction.</li>
            </ul>
          </Section>

          <Section title="7. Your Rights" i={9}>
            <p>
              Subject to applicable law, you may exercise the following rights with respect to your
              personal information:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="text-foreground">Access:</span> request a copy of the personal information we hold about you.</li>
              <li><span className="text-foreground">Correction:</span> request correction of inaccurate or incomplete information.</li>
              <li><span className="text-foreground">Erasure:</span> request deletion of your personal information, subject to legal retention requirements.</li>
              <li><span className="text-foreground">Restriction:</span> request that we limit processing of your data in certain circumstances.</li>
              <li><span className="text-foreground">Data portability:</span> receive your data in a structured, machine-readable format.</li>
              <li><span className="text-foreground">Withdraw consent:</span> where processing is based on consent, withdraw that consent at any time without affecting prior lawful processing.</li>
              <li><span className="text-foreground">Grievance redressal:</span> lodge a complaint with our Data Protection Officer or with the Data Protection Board of India under the DPDPA.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at <span className="text-foreground">privacy@sieapinvest.com</span>.
              We will respond within 30 days of receiving your verified request.
            </p>
          </Section>

          <Section title="8. Cookies and Tracking Technologies" i={10}>
            <p>
              We use cookies and similar tracking technologies to operate and improve the Platform.
              Categories include:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="text-foreground">Strictly necessary cookies:</span> essential for authentication, session management, and security. Cannot be disabled.</li>
              <li><span className="text-foreground">Functional cookies:</span> remember your preferences and settings to personalise your experience.</li>
              <li><span className="text-foreground">Analytics cookies:</span> collect aggregated, anonymised data on Platform usage to help us improve performance and usability.</li>
            </ul>
            <p className="mt-3">
              You may control non-essential cookies through your browser settings. Disabling certain
              cookies may affect the functionality of the Platform.
            </p>
          </Section>

          <Section title="9. Security" i={11}>
            <p>
              SIEAP implements industry-standard technical and organisational measures to protect
              your information against unauthorised access, disclosure, alteration, and destruction.
              These include TLS encryption in transit, encrypted storage at rest, role-based access
              controls (RBAC), and regular security audits.
            </p>
            <p>
              No method of transmission over the internet or electronic storage is entirely secure.
              While we employ commercially reasonable safeguards, we cannot guarantee absolute security.
              You are responsible for maintaining the confidentiality of your account credentials.
            </p>
          </Section>

          <Section title="10. Children's Privacy" i={12}>
            <p>
              The Platform is not directed to individuals under 18 years of age. We do not knowingly
              collect personal information from minors. If you believe we have inadvertently collected
              information from a minor, please contact us immediately and we will take prompt action
              to delete such data.
            </p>
          </Section>

          <Section title="11. Cross-Border Data Transfers" i={13}>
            <p>
              SIEAP primarily processes and stores data within India. Where data is transferred to
              service providers outside India, we ensure such transfers are subject to appropriate
              contractual safeguards consistent with applicable Indian data protection law.
            </p>
          </Section>

          <Section title="12. Changes to This Policy" i={14}>
            <p>
              We may update this Privacy Policy from time to time. Material changes will be communicated
              via email or a prominent notice on the Platform at least 14 days before taking effect.
              Continued use of the Platform after the effective date constitutes acceptance of the
              revised Policy.
            </p>
          </Section>

          <Section title="13. Contact Us" i={15}>
            <p>For privacy-related queries, requests, or complaints:</p>
            <ul className="list-none space-y-1">
              <li><span className="text-foreground">Data Protection Officer:</span> SIEAP Group</li>
              <li><span className="text-foreground">Email:</span> privacy@sieapinvest.com</li>
              <li><span className="text-foreground">Address:</span> SIEAP Group, India</li>
            </ul>
          </Section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
