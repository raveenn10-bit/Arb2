import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/page-meta";
import { COMPANY } from "@/data/company";
import { LEGAL_DATES, THIRD_PARTY_POLICIES as TP, UAE_LAW_LINKS as LAW } from "@/data/legal";
import { Ext, LegalPage, List, Note, type LegalSection } from "@/components/legal/LegalPage";

const DESCRIPTION = `How ${COMPANY.name} collects, uses, shares and protects personal data from employers, job applicants and website visitors in the United Arab Emirates.`;

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description: DESCRIPTION,
  path: "/privacy-policy",
  keywords: ["privacy policy", "UAE PDPL", "personal data protection", "Pak Arab Manpower privacy"],
});

const mail = <a href={`mailto:${COMPANY.email}`} className="font-medium text-brand underline underline-offset-2">{COMPANY.email}</a>;

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction and scope",
    body: (
      <>
        <p>
          This Privacy Policy explains how {COMPANY.name} (&ldquo;Pak Arab Manpower&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) handles personal data when you visit{" "}
          <span className="font-medium">{COMPANY.websiteDisplay}</span> (the &ldquo;Website&rdquo;), send us a manpower enquiry, apply for work, or contact us by WhatsApp, email or telephone.
        </p>
        <p>It applies to:</p>
        <List
          items={[
            "representatives of employers, contractors and other organisations that request manpower or business information (“clients”);",
            "job seekers and candidates who send us career enquiries, CVs or recruitment documents (“candidates”); and",
            "visitors who browse the Website.",
          ]}
        />
        <p>
          It does not cover the personal data of workers already employed by us, which is handled under their employment documentation and applicable UAE labour requirements, or the practices of third-party websites and services
          that we link to (see section 21).
        </p>
      </>
    ),
  },
  {
    id: "data-controller",
    title: "Company identity and data controller details",
    body: (
      <>
        <p>
          For the purposes of Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (the &ldquo;PDPL&rdquo;), {COMPANY.name} is the controller of the personal data described in this policy.
        </p>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-3 rounded-lg border border-line p-4 sm:grid-cols-[10rem_1fr]">
          <dt className="font-semibold text-navy-900">Legal name</dt>
          <dd>{COMPANY.name}</dd>
          <dt className="font-semibold text-navy-900">Registered office</dt>
          <dd>{COMPANY.office.address}</dd>
          <dt className="font-semibold text-navy-900">Email</dt>
          <dd>{mail}</dd>
          <dt className="font-semibold text-navy-900">Telephone</dt>
          <dd>
            <a href={COMPANY.telephone.tel} className="underline underline-offset-2">{COMPANY.telephone.display}</a> /{" "}
            <a href={COMPANY.additionalMobile.tel} className="underline underline-offset-2">{COMPANY.additionalMobile.display}</a>
          </dd>
          <dt className="font-semibold text-navy-900">WhatsApp</dt>
          <dd>{COMPANY.whatsapp.display}</dd>
        </dl>
        <p>Questions about this policy or your personal data can be sent to us using the contact details above.</p>
      </>
    ),
  },
  {
    id: "information-collected",
    title: "Personal information we collect",
    body: (
      <>
        <p>We collect only the information that is reasonably needed for the purposes described in section 11. Depending on how you interact with us, this may include:</p>
        <List
          items={[
            <><strong>Identity and contact details:</strong> name, job title, company name, email address, telephone and WhatsApp number.</>,
            <><strong>Enquiry details:</strong> trades and number of workers required, project location, contract duration, mobilisation dates and other project requirements you choose to share.</>,
            <><strong>Candidate details:</strong> profession or trade, years of experience, current location, preferred division, CV, certificates and other information you choose to share (see sections 5 and 6).</>,
            <><strong>Communications:</strong> the content of WhatsApp messages, emails and telephone conversations with us.</>,
            <><strong>Technical data:</strong> IP address, browser and device type and pages requested, which are processed by our hosting provider when you load the Website (see section 9).</>,
          ]}
        />
        <Note>
          <strong>How the Website forms work.</strong> The enquiry forms on this Website do <strong>not</strong> send your details to a website server or database. When you press the form button, your browser
          prepares a WhatsApp message containing the details you entered and opens WhatsApp. Nothing is sent to us until you choose to press <em>Send</em> in WhatsApp.
        </Note>
      </>
    ),
  },
  {
    id: "business-enquiries",
    title: "Business and employer enquiries",
    body: (
      <>
        <p>
          The <Link href="/contact" className="font-medium text-brand underline underline-offset-2">Request Manpower</Link> form asks for your full name, company name, work email, phone or WhatsApp number, industry,
          project location and workforce requirements, with optional fields for contract duration, mobilisation date and additional requirements. The form checks these fields in your browser and shows you the
          complete message before WhatsApp opens, so you can review or edit it.
        </p>
        <p>
          If you select trades on the Website before opening the form, your selection is kept in your browser&rsquo;s session storage so it is not lost between pages. It is deleted automatically when you close
          the browser tab and is not sent to us unless you include it in your WhatsApp message.
        </p>
        <p>
          We use enquiry details to respond to you, prepare quotations and proposals, and take steps you request before entering into a manpower supply agreement. Please share business contact details rather than
          personal data of other individuals unless that is necessary for your enquiry.
        </p>
      </>
    ),
  },
  {
    id: "job-applicants",
    title: "Job applicant information",
    body: (
      <>
        <p>
          The <Link href="/careers" className="font-medium text-brand underline underline-offset-2">Careers</Link> form asks for your full name, phone number, email address, profession or trade, years of experience,
          current location and preferred division, with an optional field for additional information. As with other forms, it prepares a WhatsApp message in your browser; nothing is sent until you send that
          message yourself.
        </p>
        <p>We use candidate information to:</p>
        <List
          items={[
            "assess your skills and experience against current and future manpower requirements;",
            "contact you about suitable vacancies, interviews, trade tests or document requests;",
            "where you are shortlisted, share relevant profile information with the client employer or project for which you are being considered (see section 12); and",
            "carry out recruitment and onboarding steps required by UAE law, including work permit and Ministry of Human Resources and Emiratisation (MOHRE) procedures, if an offer is made.",
          ]}
        />
        <p>Submitting a career enquiry does not guarantee an interview, employment, a work permit or a visa.</p>
      </>
    ),
  },
  {
    id: "cv-documents",
    title: "CV and recruitment document processing",
    body: (
      <>
        <p>
          The Website does not accept file uploads. If you choose to send your CV, trade certificates or other documents, you do so by attaching them in WhatsApp or by email to {mail}.
        </p>
        <List
          items={[
            "Please do not type passport numbers, Emirates ID numbers, bank details or similar identifiers into Website form fields.",
            "Identity, medical, visa or immigration documents should be provided only when we request them for a specific recruitment step, and only through our official channels listed in section 2.",
            "CVs and documents are used for the recruitment purposes in section 5 and are accessed only by personnel involved in recruitment and onboarding.",
          ]}
        />
      </>
    ),
  },
  {
    id: "whatsapp",
    title: "WhatsApp communication and data handling",
    body: (
      <>
        <p>
          WhatsApp is our main enquiry channel. When you use a Website form, the floating WhatsApp button or any WhatsApp link, your device opens WhatsApp with a message addressed to {COMPANY.whatsapp.display}.
          When you send it:
        </p>
        <List
          items={[
            "the message, your WhatsApp profile name and phone number, and any files you attach are transmitted through WhatsApp and become available to our team on that number;",
            "WhatsApp (a Meta company) processes this data as an independent provider under its own terms and privacy policy, which we do not control; and",
            "messages may be stored on the devices our team uses for WhatsApp and in WhatsApp's own systems, which may be located outside the UAE.",
          ]}
        />
        <p>
          You can read WhatsApp&rsquo;s privacy practices at <Ext href={TP.whatsapp}>whatsapp.com/legal/privacy-policy</Ext>. If you prefer not to use WhatsApp, you can contact us by email or telephone instead.
        </p>
      </>
    ),
  },
  {
    id: "email-telephone",
    title: "Email and telephone communications",
    body: (
      <>
        <p>
          When you email {mail} or call {COMPANY.telephone.display} or {COMPANY.additionalMobile.display}, we receive your contact details and the information you share, and use them to respond to you and keep a
          record of business and recruitment correspondence. Email links on the Website open your own email application; the Website itself does not send or store emails. We do not record telephone calls through
          the Website.
        </p>
      </>
    ),
  },
  {
    id: "analytics-technical",
    title: "Website analytics and technical data",
    body: (
      <>
        <p>
          The Website is hosted by Vercel Inc. When you visit, Vercel&rsquo;s servers automatically process technical information needed to deliver and secure the Website, such as your IP address, browser type, the
          page requested and the time of the request. This is processed under Vercel&rsquo;s privacy policy: <Ext href={TP.vercel}>vercel.com/legal/privacy-policy</Ext>.
        </p>
        <p>
          We do <strong>not</strong> currently use Google Analytics, advertising pixels or other third-party analytics or marketing tools on the Website. If we introduce analytics in future, we will update this policy
          before doing so and, where required, ask for your consent before any non-essential analytics run.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and tracking technologies",
    body: (
      <>
        <p>The Website itself does not set cookies. It uses the following browser technologies:</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            <caption className="sr-only">Browser storage and third-party content used on this Website</caption>
            <thead>
              <tr className="border-b-2 border-navy-900 text-navy-900">
                <th scope="col" className="py-2 pr-4 font-bold">Item</th>
                <th scope="col" className="py-2 pr-4 font-bold">Purpose</th>
                <th scope="col" className="py-2 font-bold">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line align-top">
                <td className="py-2.5 pr-4 font-mono text-xs">pak-arab:workforce-selection<br /><span className="font-sans text-slate">(session storage)</span></td>
                <td className="py-2.5 pr-4">Remembers trades you select for a manpower request while you move between pages. Stays in your browser.</td>
                <td className="py-2.5">Deleted when the tab is closed</td>
              </tr>
              <tr className="border-b border-line align-top">
                <td className="py-2.5 pr-4">Google Maps (embedded map)</td>
                <td className="py-2.5 pr-4">
                  Shows our office location. The map loads <strong>only after you click</strong> to load it. Google may then set its own cookies and receive your IP address under the{" "}
                  <Ext href={TP.google}>Google Privacy Policy</Ext>.
                </td>
                <td className="py-2.5">Set by Google</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Because the Website does not use non-essential cookies, it does not display a cookie banner. You can clear session storage and block or delete cookies at any time in your browser settings.
        </p>
      </>
    ),
  },
  {
    id: "purposes-lawful-grounds",
    title: "Purposes and lawful grounds for processing",
    body: (
      <>
        <p>
          Article 4 of the PDPL sets out the cases in which personal data may be processed without consent; in other cases, processing is based on consent that meets the conditions of Article 6. We rely on the
          following grounds:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            <caption className="sr-only">Purposes of processing and lawful grounds</caption>
            <thead>
              <tr className="border-b-2 border-navy-900 text-navy-900">
                <th scope="col" className="py-2 pr-4 font-bold">Purpose</th>
                <th scope="col" className="py-2 font-bold">Lawful ground</th>
              </tr>
            </thead>
            <tbody className="align-top">
              {[
                ["Responding to manpower enquiries and preparing quotations", "Steps taken at your request before entering into a contract (PDPL Art. 4(9))"],
                ["Performing manpower supply agreements with clients", "Performance of a contract (PDPL Art. 4(9))"],
                ["Assessing candidates and sharing shortlisted profiles with prospective client employers", "Your consent, given when you submit a career enquiry (PDPL Art. 6), and steps before a contract at your request (Art. 4(9))"],
                ["Work permits, visa and other employment formalities", "Employment obligations and compliance with UAE law (PDPL Art. 4(8) and 4(10))"],
                ["Keeping records and defending legal claims", "Legal claims and compliance with UAE law (PDPL Art. 4(3) and 4(10))"],
                ["Delivering and securing the Website", "Necessary to provide the Website you request and protect it from misuse"],
              ].map(([p, g]) => (
                <tr key={p} className="border-b border-line">
                  <td className="py-2.5 pr-4">{p}</td>
                  <td className="py-2.5">{g}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>We do not use your personal data for automated decision-making that produces legal effects for you, and we do not sell personal data.</p>
      </>
    ),
  },
  {
    id: "sharing-disclosure",
    title: "Personal data sharing and disclosure",
    body: (
      <>
        <p>We share personal data only where necessary and only with:</p>
        <List
          items={[
            "client employers and projects, when a candidate is shortlisted for or deployed to their work (limited to information relevant to the role);",
            "UAE government authorities, including MOHRE and immigration and health authorities, where required for work permits, visas, medical fitness and other legal formalities;",
            "professional advisers such as lawyers, auditors and accountants, under duties of confidentiality;",
            "the third-party service providers described in section 13; and",
            "courts, police or regulators where required by UAE law or to establish, exercise or defend legal claims.",
          ]}
        />
      </>
    ),
  },
  {
    id: "service-providers",
    title: "Third-party service providers",
    body: (
      <>
        <p>The Website and our communications rely on the following providers. Each processes data under its own privacy policy:</p>
        <List
          items={[
            <><strong>Vercel Inc.</strong> &ndash; Website hosting and content delivery (<Ext href={TP.vercel}>privacy policy</Ext>).</>,
            <><strong>WhatsApp (Meta)</strong> &ndash; messaging for enquiries and applications (<Ext href={TP.whatsapp}>privacy policy</Ext>).</>,
            <><strong>Google</strong> &ndash; Google Maps, only when you load the map or open a map link (<Ext href={TP.google}>privacy policy</Ext>).</>,
            <><strong>Email service provider</strong> &ndash; for correspondence sent to {COMPANY.email}.</>,
          ]}
        />
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "International data transfers",
    body: (
      <>
        <p>
          Some of our providers, including Vercel, WhatsApp and Google, operate global infrastructure, so personal data may be processed outside the United Arab Emirates. Where we transfer personal data outside the
          UAE, we do so in line with Articles 22 and 23 of the PDPL, which govern transfers to countries with and without an adequate level of protection, and we rely on the contractual and security commitments of
          these providers.
        </p>
        <p>
          Candidate information may also be shared with clients or authorities in other countries where that is necessary for a recruitment you have applied for, such as when recruiting from or to a country outside
          the UAE.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "Data retention and deletion",
    body: (
      <>
        <p>We keep personal data only for as long as needed for the purpose for which it was collected, and then delete or anonymise it, unless UAE law requires or permits us to keep it longer. In particular:</p>
        <List
          items={[
            "client enquiries and correspondence are kept while we are discussing or performing a business relationship, and afterwards for as long as needed for record-keeping and legal claims;",
            "candidate information is kept while we are considering you for current or future roles; you may ask us to delete it at any time (see section 17); and",
            "records relating to employed workers are kept for the periods required by UAE labour and other applicable laws.",
          ]}
        />
        <p>Information that exists only in your browser (form entries and session storage) is not received by us and disappears when you close the tab.</p>
      </>
    ),
  },
  {
    id: "security",
    title: "Data security measures",
    body: (
      <>
        <p>We apply technical and organisational measures appropriate to the nature of the data, including:</p>
        <List
          items={[
            "serving the Website only over encrypted HTTPS connections with strict transport security and a content security policy;",
            "not storing form submissions on the Website, which reduces the amount of personal data held online;",
            "limiting access to enquiries, CVs and recruitment documents to personnel who need them for their work; and",
            "using messaging and email services that provide encryption in transit.",
          ]}
        />
        <p>
          No method of transmission or storage is completely secure. If you believe your information has been misused, please contact us immediately using the details in section 2.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your privacy rights",
    body: (
      <>
        <p>Subject to the conditions and exceptions in the PDPL, you have the right to:</p>
        <List
          items={[
            <><strong>Information and access</strong> &ndash; receive information about the personal data we hold about you and how it is processed (Art. 13).</>,
            <><strong>Data transfer</strong> &ndash; request a copy of your data in a structured, machine-readable format where technically possible (Art. 14).</>,
            <><strong>Correction and erasure</strong> &ndash; have inaccurate data corrected and data that is no longer needed erased (Art. 15).</>,
            <><strong>Restriction</strong> &ndash; ask us to restrict processing in certain circumstances (Art. 16).</>,
            <><strong>Objection</strong> &ndash; ask us to stop processing in certain circumstances, including direct marketing (Art. 17).</>,
            <><strong>Automated processing</strong> &ndash; object to decisions based solely on automated processing that have legal consequences for you (Art. 18).</>,
          ]}
        />
        <p>
          To exercise these rights, email {mail} with the subject line &ldquo;Privacy request&rdquo;. We may need to verify your identity before acting on a request, and we will respond within a reasonable time.
        </p>
      </>
    ),
  },
  {
    id: "withdraw-consent",
    title: "Withdrawal of consent",
    body: (
      <p>
        Where we rely on your consent, you may withdraw it at any time by contacting {mail} or messaging us on WhatsApp. Withdrawal does not affect the lawfulness of processing carried out before it
        (PDPL Art. 6(2)), and we may continue processing where another lawful ground applies, for example a legal obligation. If you withdraw consent to candidate processing, we will stop considering you for roles.
      </p>
    ),
  },
  {
    id: "marketing",
    title: "Marketing communication preferences",
    body: (
      <p>
        We do not use Website enquiries or career applications to send marketing newsletters, and submitting a form does not sign you up to marketing. If we send business updates to client contacts in future, we will
        do so only where permitted by law, and every message will tell you how to opt out. You can ask us to stop at any time by replying &ldquo;STOP&rdquo; on WhatsApp or emailing {mail}.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children's privacy",
    body: (
      <p>
        The Website and our recruitment services are intended for adults. We do not knowingly collect personal data from anyone under 18 through the Website. Employment of persons under 18 in the UAE is restricted
        by Federal Decree-Law No. 33 of 2021. If you believe a person under 18 has sent us personal data, please contact us and we will delete it.
      </p>
    ),
  },
  {
    id: "external-links",
    title: "External websites and links",
    body: (
      <p>
        The Website links to third-party services such as WhatsApp, Google Maps and government websites. We are not responsible for the content or privacy practices of those services. Please read their privacy policies
        before sharing personal data with them.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this Privacy Policy",
    body: (
      <p>
        We may update this Privacy Policy to reflect changes in our practices, the Website or the law, including any executive regulations issued under the PDPL. The &ldquo;Last updated&rdquo; date at the top of
        this page shows when it was last revised. Significant changes will be highlighted on this page.
      </p>
    ),
  },
  {
    id: "enquiries-complaints",
    title: "Privacy enquiries and complaints",
    body: (
      <>
        <p>
          Please contact us first so that we can try to resolve your concern: email {mail}, call {COMPANY.telephone.display}, or write to {COMPANY.name}, {COMPANY.office.address}.
        </p>
        <p>
          Under Article 24 of the PDPL, you may also submit a complaint to the competent UAE data protection authority. Federal data protection functions are being transferred to the Federal Authority for Artificial
          Intelligence and Data; official information is available on the <Ext href={LAW.uaeGov}>UAE Government portal</Ext>.
        </p>
      </>
    ),
  },
  {
    id: "effective-date",
    title: "Effective date and last updated date",
    body: (
      <p>
        This Privacy Policy is effective from the effective date shown at the top of this page and was last updated on the date shown there. The full text of the PDPL is published on the{" "}
        <Ext href={LAW.pdpl}>UAE Legislation portal</Ext>.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      path="/privacy-policy"
      title="Privacy Policy"
      eyebrow="Legal"
      description={DESCRIPTION}
      effective={LEGAL_DATES.privacy.effective}
      updated={LEGAL_DATES.privacy.updated}
      related={{ label: "Terms & Conditions", href: "/terms-and-conditions" }}
      intro={
        <>
          <p>
            {COMPANY.name} is an Abu Dhabi manpower supply company. We respect the privacy of the employers, candidates and visitors we deal with, and we handle personal data in line with Federal Decree-Law No. 45 of
            2021 on the Protection of Personal Data and other applicable laws of the United Arab Emirates.
          </p>
          <p className="text-sm text-slate">
            The executive regulations of the PDPL had not been published when this policy was prepared. We will review this policy when they are issued.
          </p>
        </>
      }
      sections={sections}
    />
  );
}
