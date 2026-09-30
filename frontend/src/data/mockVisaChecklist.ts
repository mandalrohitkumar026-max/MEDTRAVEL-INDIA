export interface VisaGuideCategory {
  id: string;
  title: string;
  badge: string;
  description: string;
  requirements: string[];
  keyRules: string[];
}

export const mockVisaGuideData = {
  visaTypes: [
    {
      id: 'e-med',
      name: 'e-Medical Visa (e-Med Visa)',
      target: 'International Patient',
      validity: 'Up to 60 Days / 6 Months (Triple Entry allowed)',
      purpose: 'Undergoing specialized medical treatment in recognized/reputed Indian healthcare institutions.',
    },
    {
      id: 'e-med-attendant',
      name: 'e-Medical Attendant Visa (e-Med Attendant)',
      target: 'Spouse, Child, Parent, or Blood Relative (Max 2 attendants per patient)',
      validity: 'Co-terminus with Patient’s Visa',
      purpose: 'Accompanying and assisting the primary medical visa holder throughout treatment and recovery.',
    }
  ],
  requiredDocuments: [
    {
      item: 'Valid Passport',
      details: 'Must have at least 6 months validity from date of arrival in India with minimum 2 blank pages.',
      category: 'Identity',
    },
    {
      item: 'Hospital Medical Visa Invitation Letter (VIL)',
      details: 'Official letter on hospital letterhead with doctor name, tentative treatment date, hospital registration number, and seal.',
      category: 'Hospital Support',
    },
    {
      item: 'Home Country Medical Records',
      details: 'Doctor referral letter or diagnostic reports from home country stating medical necessity for overseas treatment.',
      category: 'Clinical Proof',
    },
    {
      item: 'Digital Color Photograph',
      details: 'Recent square photo (51mm x 51mm or 2x2 inch) against white background, neutral expression.',
      category: 'Identity',
    },
    {
      item: 'Proof of Relationship for Attendants',
      details: 'Marriage certificate for spouse, birth certificate for children/parents, or certified affidavit.',
      category: 'Attendant Proof',
    },
    {
      item: 'Sufficient Funds / Financial Proof',
      details: 'Bank statement or sponsorship letter demonstrating ability to cover hospital and living expenses in India.',
      category: 'Financial',
    }
  ],
  officialGovernmentPortals: [
    {
      title: 'Official Indian e-Visa Portal (Govt of India)',
      url: 'https://indianvisaonline.gov.in/evisa/tvoa.html',
      notes: 'The ONLY official Government of India portal for e-Medical visa applications. Avoid third-party counterfeit sites.',
    },
    {
      title: 'Bureau of Immigration / FRRO Online Registration',
      url: 'https://boi.gov.in/',
      notes: 'For registration or visa extension if treatment requires staying in India longer than 180 consecutive days.',
    }
  ],
  stepByStepProcess: [
    {
      step: 1,
      title: 'Obtain Hospital Medical Visa Invitation Letter (VIL)',
      desc: 'Submit your reports on MEDTRAVEL INDIA. Once the hospital verifies your treatment plan, they generate an official VIL.',
    },
    {
      step: 2,
      title: 'Complete Online Application on Govt Portal',
      desc: 'Fill the official e-Visa form with patient details, attaching digital photograph and passport scan.',
    },
    {
      step: 3,
      title: 'Upload Hospital Invitation Letter',
      desc: 'Upload the PDF of the official invitation letter provided by your chosen hospital partner.',
    },
    {
      step: 4,
      title: 'Pay Official Visa Fee',
      desc: 'Pay the government visa processing fee online via international credit card / debit card.',
    },
    {
      step: 5,
      title: 'Receive Electronic Travel Authorization (ETA)',
      desc: 'Approved ETA is usually emailed within 72 to 96 hours. Print at least 2 physical copies before flight boarding.',
    }
  ],
  importantDisclaimer: 'MEDTRAVEL INDIA is an independent medical travel coordination platform. We do not issue visas, guarantee visa approvals, or charge government visa fees. All visa decisions are under the sole discretion of the Ministry of Home Affairs, Government of India.'
};
