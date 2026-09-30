import { db } from '../data/db.js';

export function chatAssistant(req, res) {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ success: false, error: 'Query message is required' });
  }

  const query = message.toLowerCase();

  // Intelligent domain response generator
  let reply = '';
  let suggestedActions = [];

  if (query.includes('cost') || query.includes('price') || query.includes('how much') || query.includes('budget')) {
    reply = "Medical procedures in India typically offer 65% to 85% savings compared to Western countries. For example, Coronary Artery Bypass (CABG) ranges from $4,200 to $6,500 in accredited Indian centers versus $85,000 in the USA. Knee Replacement starts at $4,000. You can use our Interactive Cost Calculator to customize estimates by city and hospital tier.";
    suggestedActions = [
      { label: 'Open Cost Calculator', action: '/estimator' },
      { label: 'Compare Hospital Packages', action: '/compare' }
    ];
  } else if (query.includes('kidney') || query.includes('renal') || query.includes('transplant')) {
    const kidneyHospitals = db.findHospitals({ treatment: 'Kidney' });
    const names = kidneyHospitals.slice(0, 3).map(h => `${h.name} (${h.city})`).join(', ');
    reply = `For renal care and kidney transplants, India features top quaternary centers such as ${names}. Under Indian THOTA regulations, living donor transplants require documentation establishing biological kinship or state approval. Our patient desk assists with all legal clearance protocols.`;
    suggestedActions = [
      { label: 'View Renal Centers', action: '/hospitals?specialty=Kidney/Urology' },
      { label: 'Visa & THOTA Checklist', action: '/visa-guide' }
    ];
  } else if (query.includes('visa') || query.includes('invitation') || query.includes('embassy')) {
    reply = "To travel to India for treatment, you will need an e-Medical Visa (Triple Entry, up to 60 days validity) and an e-Medical Attendant Visa for up to two companions. Partner hospitals issue an official Medical Visa Invitation Letter on hospital letterhead within 24 to 48 hours of report assessment.";
    suggestedActions = [
      { label: 'View Visa Guide & Checklist', action: '/visa-guide' },
      { label: 'Request Hospital Invitation Letter', action: '/hospitals' }
    ];
  } else if (query.includes('hospital') || query.includes('chennai') || query.includes('delhi') || query.includes('mumbai') || query.includes('bangalore')) {
    reply = `We feature top JCI and NABH accredited hospitals across 6 major hubs: Delhi NCR, Chennai, Mumbai, Bangalore, Hyderabad, and Kolkata. Each verified hospital offers dedicated International Patient Lounges, airport escort, language interpreters, and post-discharge coordination.`;
    suggestedActions = [
      { label: 'Explore All Hospitals', action: '/hospitals' },
      { label: 'Explore Medical Cities', action: '/cities' }
    ];
  } else {
    reply = "Hello! I am your MediGuide Care Assistant. I can assist you with comparing accredited hospitals across India, checking procedure cost estimates, understanding Indian Medical Visa requirements, and coordinating airport transfers and accommodation.";
    suggestedActions = [
      { label: 'Search Hospitals', action: '/hospitals' },
      { label: 'Calculate Treatment Cost', action: '/estimator' },
      { label: 'Patient Dashboard', action: '/dashboard' }
    ];
  }

  return res.json({
    success: true,
    data: {
      reply,
      suggestedActions,
      disclaimer: "MediGuide is an informational navigation service. It does not provide formal medical diagnoses or clinical prescriptions."
    }
  });
}
