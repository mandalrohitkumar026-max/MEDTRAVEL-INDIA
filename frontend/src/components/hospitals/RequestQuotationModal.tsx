import React, { useState } from 'react';
import { Hospital, Treatment } from '../../types';
import { useJourney } from '../../context/JourneyContext';
import { useCurrency } from '../../context/CurrencyContext';
import { mockTreatments } from '../../data/mockTreatments';
import { 
  Building2, 
  FileUp, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Calendar, 
  Send,
  Users,
  ShieldCheck
} from 'lucide-react';

interface RequestQuotationModalProps {
  hospital: Hospital | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (quotationId: string) => void;
}

export const RequestQuotationModal: React.FC<RequestQuotationModalProps> = ({
  hospital,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { profile, documents, addQuotationRequest, uploadDocument, updateQuotationStatus } = useJourney();
  const { formatPrice } = useCurrency();

  const [selectedTreatment, setSelectedTreatment] = useState<string>(
    profile.selectedTreatmentId ? mockTreatments.find(t => t.id === profile.selectedTreatmentId)?.name || mockTreatments[0].name : mockTreatments[0].name
  );
  const [preferredDate, setPreferredDate] = useState<string>('2026-10-20');
  const [attendantsCount, setAttendantsCount] = useState<number>(profile.attendants.length || 1);
  const [symptomsNotes, setSymptomsNotes] = useState<string>(profile.diagnosisOrSymptom || '');
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>(documents.map(d => d.id));
  const [consentGranted, setConsentGranted] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  if (!isOpen || !hospital) return null;

  const handleDocToggle = (id: string) => {
    setSelectedDocIds(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const handleQuickUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      uploadDocument({
        title: file.name.replace(/\.[^/.]+$/, ''),
        category: 'Medical reports',
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newId = addQuotationRequest({
        patientId: profile.id,
        patientName: profile.fullName,
        patientCountry: profile.country,
        patientEmail: 'ahmed.hossain@demo.bd',
        patientPhone: '+880 1711 000000',
        hospitalId: hospital.id,
        hospitalName: hospital.name,
        treatmentName: selectedTreatment,
        preferredDate,
        attendantCount: attendantsCount,
        notes: symptomsNotes,
        documentIds: selectedDocIds,
        sharedWithHospitalConsent: consentGranted,
      });

      setIsSubmitting(false);
      setSubmittedId(newId);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-700 to-teal-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[11px] font-semibold tracking-wider uppercase text-teal-200">
                Official Hospital Enquiry
              </div>
              <h3 className="text-base font-bold leading-tight">{hospital.name}</h3>
              <p className="text-xs text-white/80">{hospital.city}, India</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedId ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Quotation Request Submitted!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Your inquiry and medical reports have been transmitted directly to the International Patient Department of <strong>{hospital.name}</strong>. Reference ID: <span className="font-mono font-bold text-brand-700">{submittedId}</span>.
            </p>
            <div className="p-3.5 bg-brand-50 border border-brand-200 rounded-xl text-left text-xs text-brand-900 max-w-md mx-auto space-y-1">
              <div className="font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                What happens next?
              </div>
              <p className="text-slate-600">
                1. Senior surgical panel reviews your diagnostic scans.<br/>
                2. Hospital issues an itemized package quotation & stay plan.<br/>
                3. Official Hospital Visa Invitation Letter (VIL) is drafted.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-2.5">
              {submittedId && (
                <button
                  type="button"
                  onClick={() => {
                    updateQuotationStatus(submittedId, 'Hospital Responded');
                    alert(`Simulated: Hospital International Desk at ${hospital.name} has responded with an itemized package quotation and Visa Invitation Letter!`);
                    onClose();
                    onSuccess(submittedId);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-xs transition"
                >
                  ⚡ Simulate Hospital Response
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSuccess(submittedId || '');
                }}
                className="bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-md transition"
              >
                Track in Patient Dashboard →
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 text-xs">
            {/* Non-diagnostic notice */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>
                <strong>Information Request Only:</strong> Hospital quotations are indicative preliminary estimates. Exact surgical procedures, stay duration, and billing require in-person clinical assessment upon hospital admission.
              </p>
            </div>

            {/* Treatment Selector */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Treatment / Procedure Required
              </label>
              <select
                value={selectedTreatment}
                onChange={(e) => setSelectedTreatment(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
              >
                {mockTreatments.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name} ({t.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Travel Date & Attendants */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-brand-600" />
                  Preferred Consultation Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-brand-600" />
                  Accompanying Family / Attendants
                </label>
                <input
                  type="number"
                  min="0"
                  max="4"
                  value={attendantsCount}
                  onChange={(e) => setAttendantsCount(parseInt(e.target.value) || 0)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800"
                />
              </div>
            </div>

            {/* Clinical Summary & Symptoms */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Medical Summary / Current Symptoms (Non-Diagnostic)
              </label>
              <textarea
                rows={3}
                value={symptomsNotes}
                onChange={(e) => setSymptomsNotes(e.target.value)}
                placeholder="Describe your current doctor advice, test summaries, and any ongoing medications..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
              />
            </div>

            {/* Attach Documents */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <FileUp className="w-4 h-4 text-brand-600" />
                  Attach Existing Medical Vault Documents
                </label>
                <label className="text-[11px] font-semibold text-brand-700 hover:text-brand-800 cursor-pointer flex items-center gap-1">
                  <span>+ Upload New PDF</span>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={handleQuickUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {documents.length === 0 ? (
                <div className="p-4 border border-dashed border-slate-300 rounded-xl text-center text-slate-500">
                  No medical reports uploaded yet. Click above to attach your Angiogram, MRI, or blood work.
                </div>
              ) : (
                <div className="space-y-1.5 max-h-36 overflow-y-auto p-1">
                  {documents.map((doc) => (
                    <label
                      key={doc.id}
                      className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition ${
                        selectedDocIds.includes(doc.id)
                          ? 'border-brand-500 bg-brand-50/60'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <input
                          type="checkbox"
                          checked={selectedDocIds.includes(doc.id)}
                          onChange={() => handleDocToggle(doc.id)}
                          className="rounded text-brand-600 focus:ring-brand-500"
                        />
                        <span className="truncate font-medium text-slate-800">{doc.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 shrink-0 uppercase tracking-wider font-semibold">
                        {doc.category} ({doc.fileSize})
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Explicit Patient Data Sharing Consent */}
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
              <label className="flex items-start gap-2 cursor-pointer text-xs font-semibold text-emerald-950">
                <input
                  type="checkbox"
                  checked={consentGranted}
                  onChange={(e) => setConsentGranted(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500 mt-0.5"
                  required
                />
                <span>
                  I explicitly consent to share my attached medical documents with the International Patient Department of {hospital.name} solely for preliminary clinical quotation and visa invitation evaluation.
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-1.5 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md transition disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Transmitting Enquiry...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Quotation Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
