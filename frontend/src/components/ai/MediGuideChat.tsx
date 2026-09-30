import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  FileText, 
  Plane, 
  Building2, 
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  isDisclaimer?: boolean;
}

const defaultMessages: ChatMessage[] = [
  {
    id: 'm-1',
    sender: 'ai',
    text: `Hello! I am **MediGuide AI**, your intelligent medical travel coordination assistant for India. 🇮🇳

I can help you navigate the non-clinical logistics of your journey:
• **Indian e-Medical Visa & Attendant Visa** requirements
• **Hospital discovery & accreditation** facts (NABH & JCI)
• **Travel timelines** (pre-op stay, hospital days, recovery)
• **Airport transfers, wheelchair mobility & accommodation**
• **Document preparation** (Angiograms, Biopsies, Passport scans)

*How can I help you plan your medical travel today?*`,
    timestamp: 'Just now'
  }
];

const PRESET_PROMPTS = [
  { label: 'Bangladesh Kidney Travel', query: 'I am travelling from Bangladesh for kidney treatment. What should I prepare?' },
  { label: 'Visa Checklist', query: 'What documents are required for an Indian e-Medical Visa?' },
  { label: 'Chennai Cardiac Timeline', query: 'What is the typical travel and recovery timeline for cardiac bypass surgery in Chennai?' },
  { label: 'Attendant Rules', query: 'How many attendants can accompany a patient to India and what are their visa rules?' },
  { label: 'Symptom Test (Safety Guardrail)', query: 'I have chest pain and shortness of breath, please diagnose me and prescribe medicines.' },
  { label: 'Hospital Questions', query: 'What crucial non-clinical questions should I ask during my hospital teleconsultation?' },
  { label: 'Airport to Hotel Transit', query: 'How does airport pickup coordination work for an international patient in Chennai?' }
];

export const MediGuideChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(defaultMessages);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generateAiResponse = (userInput: string): string => {
    const q = userInput.toLowerCase();

    // STRICT NON-DIAGNOSTIC SAFETY GUARDRAIL
    if (
      q.includes('diagnose') ||
      q.includes('prescription') ||
      q.includes('prescribe') ||
      q.includes('chest pain') ||
      q.includes('shortness of breath') ||
      q.includes('what disease do i have') ||
      q.includes('medicine for') ||
      q.includes('should i get surgery') ||
      q.includes('which hospital is the best')
    ) {
      return `⚠️ **SAFETY & MEDICAL DISCLAIMER NOTICE**

As an AI Medical Travel Assistant, **I am strictly programmed NOT to diagnose medical conditions, prescribe medications, recommend surgical procedures, or declare one hospital clinically superior.**

• **Emergency Alert:** If you or your companion are experiencing acute symptoms such as severe chest pain, breathlessness, loss of consciousness, or sudden weakness, please seek immediate emergency care or call the universal Indian emergency line **112** or Apollo Emergency **1066**.
• **For Diagnosis & Medical Advice:** Please consult directly with a qualified, licensed clinician. You can schedule a pre-travel video consultation with accredited hospital departments through our **Hospital Quotation Desk**.

I am delighted to help you coordinate your **travel logistics, visa paperwork, airport pickup, hospital contacts, and accommodation**!`;
    }

    if ((q.includes('bangladesh') && q.includes('kidney')) || (q.includes('kidney') && q.includes('prepare'))) {
      return `“You should prepare your passport, previous medical reports, prescriptions, hospital consultation details, travel documents and accommodation information. Please confirm medical requirements with your treating hospital.”

### 📋 Recommended Preparation Steps for Kidney Care in India:
1. **Clinical Vault:** Carry hard copies and digital scans of recent Renal Function Tests (Serum Creatinine, Blood Urea), DTPA scan, Renal Doppler, and home nephrologist prescriptions.
2. **Medical Visa:** Request the official hospital Visa Invitation Letter (VIL) from your selected hospital in Chennai, Delhi NCR, or Mumbai.
3. **Living Donor Formalities (if transplant):** Under Indian NOTTO regulations, living donor transplants require Authorization Committee clearance proving family relationship.
4. **Accommodation:** Plan for 2 to 3 weeks in India (8 days inpatient + post-discharge immunosuppressant level monitoring).`;
    }

    if (q.includes('visa') || q.includes('document')) {
      return `### 🛂 Indian e-Medical Visa Checklist & Guidelines

For international patients traveling to India for healthcare:

1. **Patient Visa (e-Medical Visa):**
   • **Validity:** Triple entry, up to 60 days (extendable through FRRO if certified by treating hospital).
   • **Hospital Visa Invitation Letter (VIL):** Mandatory official letterhead with doctor's name, tentative date, and hospital registration number.
   • **Passport:** Minimum 6 months validity with 2 blank pages.
   • **Recent Photograph:** 2x2 inch digital color photograph with white background.
   • **Medical History:** Referral summary or diagnostic reports from home country.

2. **Attendant Visa (e-Medical Attendant Visa):**
   • Up to **2 family attendants** are permitted per patient.
   • Must provide proof of relationship (marriage certificate, birth certificate, or sworn family affidavit).

3. **Official Portal:**
   • Always submit applications directly on the official Government of India portal: [indianvisaonline.gov.in](https://indianvisaonline.gov.in/evisa/tvoa.html).`;
    }

    if (q.includes('timeline') || q.includes('cardiac') || q.includes('chennai')) {
      return `### 🗓️ Typical Medical Travel Timeline: Cardiac Surgery (Chennai)

Based on standard protocols across quaternary centers like Apollo Greams Road:

• **30–20 Days Before Departure:**
  1. Upload Angiogram CD and 2D Echocardiogram reports.
  2. Receive official hospital quotation & treatment overview.
  3. Obtain Hospital Visa Invitation Letter (VIL) and apply for e-Medical Visa.

• **10 Days Before Departure:**
  1. Reserve patient-friendly lodging near the hospital (e.g. Thousand Lights / Greams Road area).
  2. Confirm airport arrival pickup transfer.

• **Day 1 (Arrival in Chennai):**
  1. Airport meet & greet at Terminal 4 International Arrivals.
  2. Hotel check-in and rest.

• **Day 2 (Pre-Op Workup):**
  1. In-person consultation with Chief Cardiothoracic Surgeon.
  2. Repeat non-invasive vitals, blood panels, and pre-anesthetic clearance.

• **Day 3–8 (Hospital Inpatient Stay):**
  1. Surgical procedure in modular cardiac OT.
  2. 1–2 days in Cardiothoracic ICU followed by step-down room.

• **Day 9–14 (Hotel Convalescence & Stitches Check):**
  1. Discharge to nearby hotel.
  2. Day 12–14 final surgical wound evaluation and **Fit-to-Fly certificate**.

• **Day 15+:** Safe return flight home with continuity teleconsultation bridge at 30 days.`;
    }

    if (q.includes('attendant') || q.includes('family')) {
      return `### 👨‍👩‍👦 Attendant & Family Travel Guidelines

1. **Permitted Number:** The Indian Bureau of Immigration allows up to **two attendants** on an e-Medical Attendant Visa per patient.
2. **Accommodation Needs:** When traveling with 2 attendants, look for **Serviced Medical Apartments** with kitchenettes or family suites near the hospital to allow home-cooked non-spicy meals.
3. **Airport & Transit:** Book an MPV (such as a Toyota Innova) to ensure comfortable seating for 3 passengers plus luggage and medical mobility aids.
4. **Hospital Attendant Lounge:** Top hospitals in Chennai, Delhi NCR, and Mumbai provide 24/7 attendant waiting areas, Bengali/Arabic interpreters, and international currency exchange counters.`;
    }

    if (q.includes('question') || q.includes('teleconsultation') || q.includes('ask')) {
      return `### 📋 Essential Questions for Your Hospital Teleconsultation

When speaking with the hospital international patient coordinator:

1. **Quotation Inclusions:** Does the quoted package include surgeon fees, ICU days, standard room nights, routine labs, and take-home medications?
2. **Attendant Facilities:** Is one attendant permitted to stay in the hospital room overnight with the patient?
3. **Stay Duration:** What is the minimum recommended stay in the city after hospital discharge before receiving a "Fit-to-Fly" certificate?
4. **Language Assistance:** Will a dedicated coordinator fluent in my primary language (e.g., Bengali, Arabic, French) be assigned to our case?
5. **Payment Channels:** What international payment options (wire transfer, foreign cards, cash exchange) does the hospital cashier accept?`;
    }

    if (q.includes('airport') || q.includes('pickup') || q.includes('transport')) {
      return `### 🚕 Airport Reception & Transport Coordination

For a stress-free arrival:
• **International Arrivals Gate:** International flights to Chennai land at Terminal 4. Your pre-booked chauffeur waits at the arrival exit holding a personalized name placard.
• **Flight Tracking:** Drivers track your inbound flight number (e.g. US-Bangla, Emirates, Saudia) to adjust for any delays automatically.
• **Mobility Needs:** If the patient cannot walk long distances, request wheelchair assistance directly with the airline at check-in, and book a hydraulic wheelchair van via our **Transport Module**.`;
    }

    // Default response
    return `Thank you for your question regarding **${userInput}**.

As your medical travel concierge, here are the key coordination steps:
1. **Hospital Documentation:** Ensure all original biopsy, CT/MRI, and lab reports are kept in your carry-on luggage.
2. **Quotation Comparison:** You can request itemized package quotations from multiple accredited hospitals using our **Quotation Desk**.
3. **Accommodation Proximity:** We recommend staying within 2–3 km of your treating hospital to minimize travel fatigue during follow-up visits.

Would you like me to guide you through the **e-Medical Visa checklist**, calculate an **approximate travel budget**, or help you explore **verified hospitals**?`;
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = generateAiResponse(query);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[780px] max-w-5xl mx-auto">
      {/* Assistant Header */}
      <div className="bg-gradient-to-r from-teal-800 via-brand-800 to-slate-900 text-white p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold">MediGuide AI Assistant</h2>
              <span className="text-[10px] bg-teal-500/30 text-teal-200 font-semibold px-2 py-0.5 rounded-full border border-teal-400/30">
                Non-Diagnostic Travel Concierge
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Your 24/7 intelligent guide for visas, checklists, timelines, and logistics in India
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages(defaultMessages)}
          className="text-slate-300 hover:text-white text-xs flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-xl transition"
          title="Reset conversation"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Prominent Safety Disclaimer */}
      <div className="bg-amber-50/90 border-b border-amber-200 px-5 py-2.5 flex items-center gap-2.5 text-xs text-amber-950">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <p className="leading-snug">
          <strong>Medical Disclaimer:</strong> AI-generated information is for medical travel planning and educational purposes only. MediGuide AI does not diagnose diseases, recommend surgical procedures, or prescribe medicines. Always consult a qualified healthcare professional for medical decisions.
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs relative group ${
                msg.sender === 'user'
                  ? 'bg-brand-600 text-white rounded-br-xs'
                  : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
              }`}
            >
              {/* Copy message button */}
              {msg.sender === 'ai' && (
                <button
                  onClick={() => handleCopy(msg.id, msg.text)}
                  className="absolute top-2.5 right-2.5 text-slate-400 hover:text-slate-700 opacity-0 group-hover:opacity-100 transition p-1 rounded-md bg-slate-100"
                  title="Copy response"
                >
                  {copiedId === msg.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              )}

              <div className="prose prose-xs max-w-none text-current whitespace-pre-line">
                {msg.text}
              </div>
              <div
                className={`text-[10px] mt-2 flex items-center gap-1 ${
                  msg.sender === 'user' ? 'text-brand-100 justify-end' : 'text-slate-400'
                }`}
              >
                <Clock className="w-3 h-3" />
                <span>{msg.timestamp}</span>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 items-center">
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-500 flex items-center gap-1.5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce delay-100"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce delay-200"></span>
              <span className="ml-1 text-[11px] font-medium">Analyzing verified medical travel guidance...</span>
            </div>
          </div>
        )}
      </div>

      {/* Preset Prompts Carousel */}
      <div className="p-3 bg-white border-t border-slate-200">
        <div className="text-[11px] font-semibold text-slate-500 mb-1.5 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Recommended Travel Questions:</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {PRESET_PROMPTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p.query)}
              className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full shrink-0 font-medium border border-slate-200/80 transition"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-4 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask MediGuide AI about visas, hospitals, hotels, travel timeline..."
          className="flex-1 p-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white p-3 rounded-2xl shadow-md transition shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
