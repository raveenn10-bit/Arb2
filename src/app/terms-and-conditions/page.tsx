import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/page-meta";
import { COMPANY } from "@/data/company";
import { LEGAL_DATES, UAE_LAW_LINKS as LAW } from "@/data/legal";
import { Ext, LegalPage, List, Note, type LegalSection } from "@/components/legal/LegalPage";

const DESCRIPTION = `Terms and conditions for using the ${COMPANY.name} website, sending manpower enquiries and submitting job applications in the United Arab Emirates.`;

export const metadata: Metadata = pageMeta({
  title: "Terms & Conditions",
  description: DESCRIPTION,
  path: "/terms-and-conditions",
  keywords: ["terms and conditions", "website terms", "manpower supply terms UAE", "recruitment fraud warning"],
});

const mail = <a href={`mailto:${COMPANY.email}`} className="font-medium text-brand underline underline-offset-2">{COMPANY.email}</a>;
const privacy = <Link href="/privacy-policy" className="font-medium text-brand underline underline-offset-2">Privacy Policy</Link>;

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance and scope of these terms",
    body: (
      <>
        <p>
          These Terms &amp; Conditions (the &ldquo;Terms&rdquo;) govern your use of {COMPANY.websiteDisplay} (the &ldquo;Website&rdquo;) and any enquiry or application you send to {COMPANY.name} through it. By using
          the Website, you agree to these Terms. If you do not agree, please do not use the Website.
        </p>
        <p>
          These Terms apply to the Website only. Manpower supply services are provided under separate written agreements (see section 11), and employment is governed by employment contracts and UAE labour law.
        </p>
      </>
    ),
  },
  {
    id: "company",
    title: "Company information",
    body: (
      <dl className="grid grid-cols-1 gap-x-6 gap-y-3 rounded-lg border border-line p-4 sm:grid-cols-[10rem_1fr]">
        <dt className="font-semibold text-navy-900">Company</dt>
        <dd>{COMPANY.name}</dd>
        <dt className="font-semibold text-navy-900">Office</dt>
        <dd>{COMPANY.office.address}</dd>
        <dt className="font-semibold text-navy-900">Email</dt>
        <dd>{mail}</dd>
        <dt className="font-semibold text-navy-900">Telephone</dt>
        <dd>{COMPANY.telephone.display} / {COMPANY.additionalMobile.display}</dd>
        <dt className="font-semibold text-navy-900">WhatsApp</dt>
        <dd>{COMPANY.whatsapp.display}</dd>
      </dl>
    ),
  },
  {
    id: "website-use",
    title: "Website usage conditions",
    body: (
      <>
        <p>You may use the Website for lawful purposes, to learn about our services and to contact us. When using it, you agree:</p>
        <List
          items={[
            "to provide information that is true and that you are entitled to share;",
            "not to impersonate any person or organisation;",
            "not to send unlawful, offensive, misleading or malicious content; and",
            "to comply with all applicable UAE laws, including Federal Decree-Law No. 34 of 2021 on Combatting Rumours and Cybercrimes.",
          ]}
        />
      </>
    ),
  },
  {
    id: "services",
    title: "Manpower supply services",
    body: (
      <p>
        The Website describes the manpower supply and workforce support services we offer to clients in the UAE. Descriptions of trades, industries, capabilities and certifications are general information. The
        availability, scope, numbers and timing of any workforce depend on project requirements, candidate availability and applicable legal approvals, and are confirmed only in a written agreement.
      </p>
    ),
  },
  {
    id: "client-enquiries",
    title: "Employer and corporate client enquiries",
    body: (
      <>
        <p>
          Manpower request forms and WhatsApp messages are enquiries only. Sending an enquiry <strong>does not create a binding service agreement</strong> and does not oblige either party to supply or engage
          manpower. We will respond to discuss your requirements, and any engagement begins only when both parties sign a written agreement or accept a written quotation.
        </p>
        <p>You confirm that you are authorised to make enquiries on behalf of the organisation you name.</p>
      </>
    ),
  },
  {
    id: "applications",
    title: "Recruitment and employment applications",
    body: (
      <>
        <p>Career enquiries sent through the Website or WhatsApp are applications for consideration only.</p>
        <Note>
          Submitting a job application <strong>does not guarantee</strong> an interview, employment, placement with any client, a work permit or a UAE visa. Any offer of employment will be made in writing, and
          employment in the UAE requires a valid work permit issued in line with MOHRE procedures.
        </Note>
        <p>
          All recruitment is carried out in accordance with Federal Decree-Law No. 33 of 2021 on the Regulation of Labour Relations, as amended, its implementing regulations, and applicable MOHRE requirements.
        </p>
      </>
    ),
  },
  {
    id: "accuracy-submitted",
    title: "Accuracy of submitted information",
    body: (
      <p>
        You are responsible for making sure that the information, CVs, certificates and documents you send us are accurate, complete and genuine. Submitting false, forged or misleading information may lead to an
        application being rejected or an engagement being ended, and may be reported to the relevant authorities where required by law.
      </p>
    ),
  },
  {
    id: "eligibility",
    title: "Candidate eligibility and documentation",
    body: (
      <>
        <p>To be considered for a role, candidates must meet the legal requirements for employment in the UAE and the requirements of the specific role. These may include:</p>
        <List
          items={[
            "minimum age and other conditions set by UAE labour law;",
            "valid identity and travel documents;",
            "medical fitness and other checks required for work permits and residence visas;",
            "trade qualifications, certificates or tests relevant to the role; and",
            "site-specific approvals required by a client or project.",
          ]}
        />
        <p>We will tell you which documents are needed at each stage. Please share identity documents only when requested and only through our official channels (see section 10).</p>
      </>
    ),
  },
  {
    id: "placement-disclaimer",
    title: "Employment and placement disclaimers",
    body: (
      <p>
        Vacancies, trades and project examples on the Website are illustrative and may change at any time. We do not guarantee that a particular role, salary, location, client or start date will be available. Final
        terms of employment are set only in the written employment contract and the documents approved by the competent authorities.
      </p>
    ),
  },
  {
    id: "fraud-prevention",
    title: "Recruitment fraud prevention",
    body: (
      <>
        <p>
          Article 6 of Federal Decree-Law No. 33 of 2021 prohibits employers from charging workers the fees and costs of recruitment and employment, directly or indirectly. In line with this:
        </p>
        <List
          items={[
            <><strong>We do not ask candidates to pay recruitment fees</strong> to be considered for, offered or placed in a job.</>,
            <>Anyone asking you for money in our name to secure a job or visa is <strong>not acting for us</strong>.</>,
            <>Our only official channels are this Website ({COMPANY.websiteDisplay}), email addresses ending in <strong>@{COMPANY.email.split("@")[1]}</strong>, WhatsApp {COMPANY.whatsapp.display}, and telephone {COMPANY.telephone.display} or {COMPANY.additionalMobile.display}.</>,
            "If you receive a suspicious offer, do not pay or send documents. Verify it with us first using the contacts above, and report fraud to the UAE authorities.",
          ]}
        />
      </>
    ),
  },
  {
    id: "quotations",
    title: "Quotations and commercial agreements",
    body: (
      <p>
        Nothing on the Website is an offer capable of acceptance. Commercial manpower supply arrangements, including scope, rates, durations and responsibilities, are governed exclusively by separate written agreements
        or quotations agreed between {COMPANY.name} and the client. If there is any conflict between these Terms and such an agreement, the agreement prevails.
      </p>
    ),
  },
  {
    id: "payment",
    title: "Payment terms where applicable",
    body: (
      <p>
        The Website does not process payments. Any fees, invoicing, payment periods and related conditions for client services are set out only in the relevant written agreement or quotation. No payment terms are
        created by using the Website.
      </p>
    ),
  },
  {
    id: "availability",
    title: "Service availability",
    body: (
      <p>
        We aim to keep the Website available and accurate, but it is provided on an &ldquo;as available&rdquo; basis. We may update, suspend or withdraw any part of it without notice, for example for maintenance,
        security or legal reasons. Response times to enquiries may vary.
      </p>
    ),
  },
  {
    id: "responsibilities",
    title: "Client and candidate responsibilities",
    body: (
      <>
        <p><strong>Clients</strong> are responsible for providing accurate project requirements and, under any agreement, for meeting the obligations that UAE law and that agreement place on them, including those relating to workplace health and safety.</p>
        <p><strong>Candidates</strong> are responsible for providing genuine information, attending agreed interviews or tests, and keeping their contact details up to date.</p>
      </>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    body: (
      <p>
        We treat project details shared by clients and recruitment information shared by candidates as confidential, and use them only for the purposes for which they were provided, as described in our {privacy}.
        Separate confidentiality obligations may be agreed in client agreements. Please do not send confidential information through the Website that is not needed for your enquiry.
      </p>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property rights",
    body: (
      <p>
        The Website and its content, including text, photographs, graphics, the {COMPANY.shortName} name and logo, are owned by or licensed to {COMPANY.name}. Client names and logos shown on the Website belong to their
        respective owners. You may view and print pages for personal or internal business reference, but you may not copy, republish, modify or use any content for commercial purposes without our prior written
        consent.
      </p>
    ),
  },
  {
    id: "unauthorized-use",
    title: "Unauthorised website usage",
    body: (
      <>
        <p>You must not:</p>
        <List
          items={[
            "attempt to gain unauthorised access to the Website, its servers or related systems;",
            "introduce viruses, malicious code or any material that could damage or disrupt the Website;",
            "use automated tools to overload the Website or scrape content for commercial reuse;",
            "use the Website or our name to mislead job seekers or the public; or",
            "use the Website in breach of any UAE law.",
          ]}
        />
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-party websites and services",
    body: (
      <p>
        The Website links to and uses third-party services, including WhatsApp and Google Maps. These services are governed by their own terms and privacy policies. We are not responsible for their content,
        availability or practices, and a link does not mean that we endorse them.
      </p>
    ),
  },
  {
    id: "information-accuracy",
    title: "Website information accuracy",
    body: (
      <p>
        We take reasonable care to keep the Website accurate and up to date, but its content is general information and is not professional, legal or immigration advice. Information may change without notice. Please
        contact us to confirm details before relying on them.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability, subject to applicable law",
    body: (
      <>
        <p>
          To the extent permitted by UAE law, {COMPANY.name} is not liable for any indirect or consequential loss arising from use of, or inability to use, the Website or reliance on its general content. Our liability
          in connection with services is governed by the relevant written agreement.
        </p>
        <p>
          Nothing in these Terms excludes or limits any liability that cannot be excluded under UAE law, or any mandatory statutory rights you have, including rights under UAE labour, consumer protection and data
          protection laws.
        </p>
      </>
    ),
  },
  {
    id: "force-majeure",
    title: "Force majeure",
    body: (
      <p>
        We are not responsible for any delay or failure to operate the Website or respond to enquiries caused by events beyond our reasonable control, such as natural events, government action, public health
        measures, power or network failures, or failures of third-party services. Force majeure in client services is governed by the relevant written agreement and applicable law.
      </p>
    ),
  },
  {
    id: "suspension",
    title: "Suspension of website access",
    body: (
      <p>
        We may restrict or block access to the Website, or decline to respond to enquiries, where we reasonably believe the Website is being misused, these Terms are being breached, or this is necessary to protect
        the Website, our business, candidates or clients.
      </p>
    ),
  },
  {
    id: "amendments",
    title: "Amendments to these terms",
    body: (
      <p>
        We may update these Terms from time to time. The &ldquo;Last updated&rdquo; date at the top of this page shows when they were last revised. Continued use of the Website after an update means you accept the
        updated Terms.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Applicable UAE laws and dispute resolution",
    body: (
      <>
        <p>
          These Terms are governed by the federal laws of the United Arab Emirates and, where applicable, the laws of the Emirate of Abu Dhabi. Relevant legislation includes Federal Decree-Law No. 33 of 2021 on the
          Regulation of Labour Relations, as amended; Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data; and Federal Decree-Law No. 46 of 2021 on Electronic Transactions and Trust Services.
        </p>
        <p>
          We encourage you to contact us first so that we can try to resolve any concern informally. Disputes that cannot be resolved will be subject to the jurisdiction of the competent courts of the Emirate of Abu
          Dhabi, without affecting the jurisdiction of MOHRE and the labour courts over employment disputes under UAE labour law, or any dispute resolution clause in a written agreement.
        </p>
        <p>
          Official legislation is published on the <Ext href={LAW.labour}>UAE Legislation portal</Ext>, and labour and recruitment information is available from <Ext href={LAW.mohre}>MOHRE</Ext>.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact information",
    body: (
      <p>
        For questions about these Terms, contact {COMPANY.name} at {mail}, call {COMPANY.telephone.display}, message us on WhatsApp at {COMPANY.whatsapp.display}, or write to {COMPANY.office.address}.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      path="/terms-and-conditions"
      title="Terms & Conditions"
      eyebrow="Legal"
      description={DESCRIPTION}
      effective={LEGAL_DATES.terms.effective}
      updated={LEGAL_DATES.terms.updated}
      related={{ label: "Privacy Policy", href: "/privacy-policy" }}
      intro={
        <p>
          Please read these Terms carefully. They explain how you may use our Website, what an enquiry or application through it does and does not mean, and how to protect yourself from recruitment fraud.
        </p>
      }
      sections={sections}
    />
  );
}
