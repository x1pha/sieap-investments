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

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Terms of Service | SIEAP"
        description="SIEAP's Terms of Service — the rules and conditions governing your use of India's evaluation-first startup investment platform."
        canonical="https://sieapinvest.com/legal/terms"
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
          Terms of Service
        </motion.h1>
        <motion.p
          initial="hidden" animate="visible" variants={fadeUp} custom={2}
          className="text-sm text-muted-foreground mb-12"
        >
          Effective Date: 1 January 2025 &nbsp;·&nbsp; Last Updated: 26 April 2026
        </motion.p>

        <div className="prose-invert">
          <Section title="1. Acceptance of Terms" i={3}>
            <p>
              These Terms of Service ("Terms") constitute a legally binding agreement between you
              ("User", "you", or "your") and SIEAP Group ("SIEAP", "we", "us", or "our") governing
              your access to and use of the platform at <span className="text-foreground">sieapinvest.com</span> and
              all associated services, portals, dashboards, and content (collectively, the "Platform").
            </p>
            <p>
              By registering an account, submitting an application, or otherwise accessing the
              Platform, you confirm that you have read, understood, and agree to be bound by these
              Terms and our Privacy Policy. If you do not agree, you must not access or use the Platform.
            </p>
            <p>
              If you are using the Platform on behalf of an organisation, you represent and warrant
              that you have the authority to bind that organisation to these Terms.
            </p>
          </Section>

          <Section title="2. Eligibility" i={4}>
            <p>To access the Platform, you must:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Be at least 18 years of age.</li>
              <li>Be legally capable of entering into binding contracts under applicable Indian law.</li>
              <li>Not be prohibited from accessing the Platform under any applicable law or regulation.</li>
              <li>Provide accurate, complete, and current information during registration and throughout your use of the Platform.</li>
            </ul>
            <p className="mt-3">
              SIEAP reserves the right to verify eligibility and to suspend or terminate access for
              any user who does not meet these requirements.
            </p>
          </Section>

          <Section title="3. Platform Services" i={5}>
            <p>SIEAP provides an evaluation-first investment facilitation platform comprising:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="text-foreground">Startup Evaluation:</span> a structured 100-point scoring framework applied across 27 sub-parameters and 6 startup stages, conducted by SIEAP's evaluation team with CA-verified financial validation.</li>
              <li><span className="text-foreground">Mentorship Programme:</span> stage-matched advisory sessions with SIEAP's panel of domain-expert mentors.</li>
              <li><span className="text-foreground">Investor Dashboard:</span> a curated, scored deal-flow dashboard accessible to pre-partnered investors, presenting only startups that have reached Stage 5 (Investor Ready) or above.</li>
              <li><span className="text-foreground">Data Room:</span> secure, evidence-linked documentation repository presenting CA-verified financials, regulatory filings, and evaluation evidence for investor review.</li>
              <li><span className="text-foreground">Incubator Portal:</span> cohort management, startup tracking, demo-day facilitation, and mentor coordination tools for registered incubators and technology business incubators (TBIs).</li>
            </ul>
            <p className="mt-3">
              SIEAP is a facilitation and evaluation platform. We do not provide investment advice,
              broker securities, or guarantee any investment outcome. All investment decisions remain
              solely with the investor.
            </p>
          </Section>

          <Section title="4. User Obligations" i={6}>
            <p>As a condition of using the Platform, you agree to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide truthful, accurate, and complete information at all times. Submission of false, misleading, or fraudulent information is grounds for immediate termination and may result in legal action.</li>
              <li>Maintain the confidentiality of your account credentials and notify SIEAP immediately of any unauthorised access.</li>
              <li>Not use the Platform for any unlawful purpose or in a manner that violates applicable Indian law, including but not limited to the Securities and Exchange Board of India Act, 1992, the Companies Act, 2013, the Prevention of Money Laundering Act, 2002, and the Information Technology Act, 2000.</li>
              <li>Not reverse-engineer, decompile, disassemble, or attempt to derive the source code of any part of the Platform.</li>
              <li>Not scrape, crawl, or use automated means to extract data from the Platform without prior written authorisation.</li>
              <li>Not upload or transmit any material that contains viruses, malware, or any other harmful code.</li>
              <li>Not impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
            </ul>
          </Section>

          <Section title="5. Fees and Payment" i={7}>
            <p>
              SIEAP operates on a success-fee model. We charge a fee of <span className="text-foreground">1% of the total deal value</span> upon
              successful closing of a funding transaction facilitated through the Platform. No fee is
              charged prior to deal closure.
            </p>
            <p>
              Additional subscription fees may apply for premium incubator portal features, accelerated
              evaluation tracks, or bespoke advisory services. All applicable fees will be disclosed
              clearly before you commit to any paid service.
            </p>
            <p>
              All fees are exclusive of applicable goods and services tax (GST) or other statutory
              levies, which will be charged in addition at the prevailing rate.
            </p>
          </Section>

          <Section title="6. Intellectual Property" i={8}>
            <p>
              All content on the Platform — including the SIEAP evaluation framework, scoring
              methodology, software, design, text, graphics, logos, and data compilations — is the
              exclusive property of SIEAP Group or its licensors and is protected by Indian and
              international intellectual property laws.
            </p>
            <p>
              You are granted a limited, non-exclusive, non-transferable, revocable licence to access
              and use the Platform solely for its intended purpose. Nothing in these Terms transfers
              ownership of any intellectual property to you.
            </p>
            <p>
              You retain ownership of content you submit to the Platform (such as pitch decks and
              financial documents), but you grant SIEAP a non-exclusive, royalty-free licence to use,
              store, and display such content for the purpose of operating the Platform and providing
              services to you.
            </p>
          </Section>

          <Section title="7. Confidentiality" i={9}>
            <p>
              Information shared on the Platform — including startup financials, evaluation scores,
              investor identities, and data-room materials — is confidential. Users must not disclose,
              reproduce, or distribute such information to third parties without the prior written
              consent of SIEAP and the relevant information owner.
            </p>
            <p>
              This obligation of confidentiality survives termination of your account and these Terms
              for a period of five (5) years.
            </p>
          </Section>

          <Section title="8. Disclaimers and Limitation of Liability" i={10}>
            <p>
              The Platform is provided "as is" and "as available" without warranties of any kind,
              express or implied. SIEAP does not warrant that the Platform will be uninterrupted,
              error-free, or free from harmful components.
            </p>
            <p>
              To the fullest extent permitted by applicable law, SIEAP's total liability to you
              for any claim arising out of or in connection with these Terms or the Platform shall
              not exceed the fees paid by you to SIEAP in the six (6) months preceding the event
              giving rise to the claim.
            </p>
            <p>
              SIEAP shall not be liable for any indirect, incidental, special, consequential, or
              punitive damages, including loss of profits, loss of data, or loss of goodwill, arising
              out of or in connection with the Platform, even if advised of the possibility of such damages.
            </p>
          </Section>

          <Section title="9. Third-Party Links and Services" i={11}>
            <p>
              The Platform may contain links to third-party websites or services. SIEAP does not
              endorse, control, or assume responsibility for any third-party content, products, or
              services. Your interactions with third-party sites are governed solely by their terms
              and privacy policies.
            </p>
          </Section>

          <Section title="10. Termination" i={12}>
            <p>
              Either party may terminate this agreement at any time. You may close your account
              by contacting us at <span className="text-foreground">support@sieapinvest.com</span>.
              SIEAP may suspend or terminate your access immediately and without notice if you
              breach these Terms, engage in fraudulent activity, or if required by law.
            </p>
            <p>
              Upon termination, your right to access the Platform ceases immediately. Provisions
              that by their nature should survive termination — including confidentiality,
              intellectual property, limitation of liability, and dispute resolution — will continue
              to apply.
            </p>
          </Section>

          <Section title="11. Governing Law and Dispute Resolution" i={13}>
            <p>
              These Terms are governed by and construed in accordance with the laws of India,
              without regard to conflict-of-law principles.
            </p>
            <p>
              Any dispute arising out of or in connection with these Terms shall first be subject to
              good-faith negotiation between the parties for a period of 30 days. If unresolved,
              disputes shall be referred to arbitration under the Arbitration and Conciliation Act,
              1996, before a sole arbitrator appointed by mutual agreement. The seat of arbitration
              shall be India, and proceedings shall be conducted in English.
            </p>
            <p>
              Nothing in this clause shall prevent either party from seeking urgent injunctive or
              equitable relief from a court of competent jurisdiction.
            </p>
          </Section>

          <Section title="12. Modifications to Terms" i={14}>
            <p>
              SIEAP reserves the right to modify these Terms at any time. Material changes will be
              communicated via email or a notice on the Platform at least 14 days before taking
              effect. Your continued use of the Platform after the effective date constitutes
              acceptance of the revised Terms.
            </p>
          </Section>

          <Section title="13. Severability and Waiver" i={15}>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, that provision
              will be modified to the minimum extent necessary to make it enforceable, and the
              remaining provisions will continue in full force. SIEAP's failure to enforce any right
              or provision of these Terms shall not constitute a waiver of such right or provision.
            </p>
          </Section>

          <Section title="14. Contact" i={16}>
            <p>For legal or compliance queries regarding these Terms:</p>
            <ul className="list-none space-y-1">
              <li><span className="text-foreground">Email:</span> legal@sieapinvest.com</li>
              <li><span className="text-foreground">Platform:</span> sieapinvest.com</li>
              <li><span className="text-foreground">Address:</span> SIEAP Group, India</li>
            </ul>
          </Section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
