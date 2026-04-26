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

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Disclaimer | SIEAP"
        description="Important legal disclaimers governing your use of SIEAP's evaluation-first startup investment platform. Not investment advice. For informational purposes only."
        canonical="https://sieapinvest.com/legal/disclaimer"
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
          Disclaimer
        </motion.h1>
        <motion.p
          initial="hidden" animate="visible" variants={fadeUp} custom={2}
          className="text-sm text-muted-foreground mb-12"
        >
          Effective Date: 1 January 2025 &nbsp;·&nbsp; Last Updated: 26 April 2026
        </motion.p>

        <div className="prose-invert">
          <Section title="1. General" i={3}>
            <p>
              This Disclaimer applies to all content, information, data, analysis, scores, evaluations,
              and materials published or made available by SIEAP Group ("SIEAP", "we", "us", or "our")
              through its platform at <span className="text-foreground">sieapinvest.com</span>, associated
              portals, dashboards, and any other digital or physical communications (collectively, the "Platform").
            </p>
            <p>
              By accessing or using the Platform, you acknowledge that you have read, understood, and
              accepted the limitations and qualifications set out in this Disclaimer. If you do not accept
              these terms, you must discontinue use of the Platform immediately.
            </p>
          </Section>

          <Section title="2. Not Investment Advice" i={4}>
            <p>
              Nothing on the Platform constitutes, or should be construed as, investment advice, financial
              advice, legal advice, tax advice, or any other form of professional advice regulated under
              applicable Indian law, including the Securities and Exchange Board of India (Investment
              Advisers) Regulations, 2013.
            </p>
            <p>
              SIEAP is an evaluation and facilitation platform. Scores, stage ratings, valuations,
              and data-room materials presented on the Platform are informational outputs derived from
              SIEAP's structured evaluation framework. They are provided to assist users in their own
              independent analysis and decision-making — not as recommendations to invest, divest, or
              hold any security or financial instrument.
            </p>
            <p>
              All investment decisions are made solely at your own risk. You should seek independent
              legal, financial, and tax advice from appropriately qualified and regulated professionals
              before making any investment decision.
            </p>
          </Section>

          <Section title="3. No Solicitation of Investment" i={5}>
            <p>
              SIEAP has not been authorised by the Securities and Exchange Board of India (SEBI) or any
              other capital markets regulator to solicit investments from the public. Nothing on the
              Platform constitutes a public offer, an invitation to subscribe to securities, or a
              solicitation of investment under the Securities Contracts (Regulation) Act, 1956, the
              Companies Act, 2013, or any other applicable legislation.
            </p>
            <p>
              SIEAP does not facilitate the online or offline buying, selling, or trading of securities.
              Any funding transactions that result from connections made through the Platform are
              concluded directly between the relevant startup and investor under their own legally binding
              agreements, independently of SIEAP.
            </p>
          </Section>

          <Section title="4. Not a Stock Exchange or Broker" i={6}>
            <p>
              SIEAP is neither a stock exchange nor does it intend to seek recognition as a stock
              exchange under the Securities Contracts (Regulation) Act, 1956 or any successor legislation.
              SIEAP is not a registered stockbroker, sub-broker, portfolio manager, or collective
              investment scheme operator under SEBI regulations.
            </p>
            <p>
              Where SIEAP partners with SEBI-registered entities, incubators, or other regulated
              intermediaries to distribute products or services on the Platform, such distribution is
              conducted solely as a channel partner. The regulatory obligations and liability for those
              products and services rest with the registered entity, not with SIEAP.
            </p>
          </Section>

          <Section title="5. Accuracy and Completeness of Information" i={7}>
            <p>
              Information published on the Platform — including startup profiles, evaluation scores,
              financial summaries, regulatory-filing references, and market data — is compiled from
              sources believed to be reliable, including publicly available databases (MCA21, GSTIN
              portal, DPIIT Startup India) and CA-verified financial statements. However, SIEAP makes
              no representation or warranty, express or implied, as to the accuracy, completeness,
              timeliness, or fitness for purpose of any such information.
            </p>
            <p>
              All trademarks, logos, registered trademarks, and brand identifiers referenced on the
              Platform belong to their respective owners and are used solely for identification and
              informational purposes. Their use does not imply endorsement by, or affiliation with,
              SIEAP.
            </p>
            <p>
              SIEAP expressly disclaims any and all responsibility arising from errors, omissions,
              or inaccuracies in information gathered from public sources or third-party submissions.
              Data provided by founders, investors, and incubators is presented in reliance on their
              representations and has not been independently verified in all respects beyond the scope
              of SIEAP's structured evaluation process.
            </p>
          </Section>

          <Section title="6. Risk Warning" i={8}>
            <p>
              Investing in early-stage startups carries a high degree of risk. The majority of
              early-stage companies do not achieve the projected outcomes reflected in their business
              plans or valuations. Past evaluation scores, mentor assessments, and CA-verified
              financial snapshots do not guarantee future performance or investment returns.
            </p>
            <p>
              You may lose all or part of any capital you invest. Before making any investment, you
              should carefully assess your financial circumstances, investment objectives, and risk
              tolerance, and obtain independent professional advice.
            </p>
          </Section>

          <Section title="7. Limitation of Liability" i={9}>
            <p>
              To the fullest extent permitted by applicable law, SIEAP Group, its directors, officers,
              employees, advisers, mentors, and affiliates shall not be liable for any direct, indirect,
              incidental, special, consequential, or punitive loss or damage — including financial loss,
              loss of data, loss of opportunity, or reputational harm — arising from:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your reliance on any information, score, valuation, or material published on the Platform.</li>
              <li>Any investment decision made on the basis of information available through the Platform.</li>
              <li>Any inaccuracy, error, or omission in information sourced from public databases or third-party submissions.</li>
              <li>Interruption, suspension, or unavailability of the Platform for any reason.</li>
              <li>Unauthorised access to or alteration of your data by a third party.</li>
            </ul>
          </Section>

          <Section title="8. Regulatory Status" i={10}>
            <p>
              SIEAP Group is a private limited company incorporated in India. It is recognised under
              the Startup India initiative by the Department for Promotion of Industry and Internal
              Trade (DPIIT). SIEAP structures its investment-advisory and facilitation activities
              in a manner designed to comply with applicable SEBI regulations; however, it is not
              itself a SEBI-registered investment adviser as of the date of this Disclaimer.
            </p>
            <p>
              Users are responsible for determining whether their own activities on the Platform
              are compliant with applicable laws and regulations in their jurisdiction.
            </p>
          </Section>

          <Section title="9. Forward-Looking Statements" i={11}>
            <p>
              The Platform may contain forward-looking statements, projections, and estimates relating
              to startups, market conditions, or SIEAP's own business. These statements involve known
              and unknown risks and uncertainties and are based on assumptions that may prove incorrect.
              Actual results may differ materially from those expressed or implied. SIEAP undertakes
              no obligation to update or revise any forward-looking statement following the date of
              publication.
            </p>
          </Section>

          <Section title="10. Changes to This Disclaimer" i={12}>
            <p>
              SIEAP reserves the right to update this Disclaimer at any time. Changes will be posted
              on the Platform with an updated effective date. Continued use of the Platform following
              any such update constitutes your acceptance of the revised Disclaimer.
            </p>
          </Section>

          <Section title="11. Contact" i={13}>
            <p>For legal queries relating to this Disclaimer:</p>
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
