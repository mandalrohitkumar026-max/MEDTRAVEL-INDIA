import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Globe 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('Bangladesh');
  const [subject, setSubject] = useState('Hospital Coordination Inquiry');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setMessage('');
      setName('');
      setEmail('');
    }, 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-xs font-bold text-brand-700">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Patient Support & International Liaison</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Contact MEDTRAVEL INDIA
        </h1>
        <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
          Reach our international patient concierge desk for questions on hospital quotations, travel planning, or accommodation coordination.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Information (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-6 shadow-md">
            <h3 className="text-base font-bold uppercase tracking-wider text-teal-300">
              International Liaison Desks
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">International Helpline</span>
                  <a href="tel:+914428290200" className="text-white font-bold text-sm hover:underline">
                    +91 44 2829 0200
                  </a>
                  <p className="text-slate-400 text-[11px]">9:00 AM – 8:00 PM IST (Mon–Sat)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Concierge Email</span>
                  <a href="mailto:care@medtravelindia.demo" className="text-white font-bold text-sm hover:underline">
                    care@medtravelindia.demo
                  </a>
                  <p className="text-slate-400 text-[11px]">Guaranteed response within 4 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Chennai Operations Hub</span>
                  <p className="text-slate-200 font-medium">
                    Greams Road Healthcare District, Thousand Lights, Chennai 600006, Tamil Nadu, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Delhi NCR Liaison Hub</span>
                  <p className="text-slate-200 font-medium">
                    Sector 44, Sushant Lok Phase I, Gurugram, Delhi NCR 122002
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Form (7 cols) */}
        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900">Send an Inquiry</h2>
          <p className="text-xs text-slate-500">
            Tell us about your medical travel requirements, preferred hospitals, or companion needs.
          </p>

          {sent ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">Message Received!</h3>
              <p className="text-xs text-slate-600">
                Our international patient concierge coordinator will get in touch with you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tariq Rahman"
                    className="w-full p-2.5 bg-slate-50 border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. patient@example.com"
                    className="w-full p-2.5 bg-slate-50 border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Country of Residence</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Bangladesh / Oman"
                    className="w-full p-2.5 bg-slate-50 border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                  >
                    <option value="Hospital Coordination Inquiry">Hospital Coordination Inquiry</option>
                    <option value="Medical Visa Questions">Medical Visa Guidance</option>
                    <option value="Accommodation & Attendants">Hotel / Attendant Accommodation</option>
                    <option value="Airport Pickup Assistance">Airport Transit & Wheelchair Vans</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Message / Medical Inquiry Details</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Include treatment needed, preferred city, or any questions for our liaison team..."
                  className="w-full p-3 bg-slate-50 border rounded-xl"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
