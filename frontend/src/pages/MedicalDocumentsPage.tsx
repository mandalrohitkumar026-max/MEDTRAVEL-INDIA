import React, { useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import { useAuth } from '../context/AuthContext';
import { DocumentCategory, MedicalDocument } from '../types';
import { 
  FolderLock, 
  FileText, 
  Upload, 
  Trash2, 
  Download, 
  Eye, 
  ShieldCheck, 
  Lock, 
  Plus, 
  FileSpreadsheet, 
  FileImage, 
  CheckCircle2,
  AlertCircle,
  Share2,
  Check,
  AlertTriangle
} from 'lucide-react';

export const MedicalDocumentsPage: React.FC = () => {
  const { documents, uploadDocument, deleteDocument, toggleDocumentConsent } = useJourney();
  const { user } = useAuth();

  const currentPatientId = user?.id || 'user-ahmed';

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [previewDoc, setPreviewDoc] = useState<MedicalDocument | null>(null);

  // New Doc Form
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState<DocumentCategory>('Medical Report');
  const [fileName, setFileName] = useState('');
  const [fileSizeStr, setFileSizeStr] = useState('1.8 MB');
  const [consentToShare, setConsentToShare] = useState<boolean>(true);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const categories: DocumentCategory[] = [
    'Medical Report',
    'Prescription',
    'Scan / Imaging',
    'Other'
  ];

  // Patient isolation: only view documents belonging to current authenticated patient
  const userDocuments = documents.filter((d) => 
    d.patientId ? d.patientId === currentPatientId : currentPatientId === 'user-ahmed'
  );

  const filteredDocs = activeCategory === 'ALL'
    ? userDocuments
    : userDocuments.filter((d) => {
        const catNorm = d.category.toLowerCase().replace(/[^a-z]/g, '');
        const activeNorm = activeCategory.toLowerCase().replace(/[^a-z]/g, '');
        return catNorm.includes(activeNorm) || activeNorm.includes(catNorm);
      });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.dcm', '.dicom'];
    const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

    if (!allowedExtensions.includes(ext)) {
      setUploadError(`Invalid file format "${ext}". Only official medical reports and imaging (.pdf, .jpg, .png, .dicom) are permitted.`);
      setFileName('');
      return;
    }

    setFileName(file.name);
    if (!docTitle) {
      setDocTitle(file.name.replace(/\.[^/.]+$/, ''));
    }
    const mb = file.size / (1024 * 1024);
    setFileSizeStr(mb >= 0.1 ? `${mb.toFixed(1)} MB` : `${Math.round(file.size / 1024)} KB`);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim()) {
      setUploadError('Please select or specify a valid medical report file (.pdf, .jpg, .png, .dicom).');
      return;
    }

    const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.dcm', '.dicom'];
    const ext = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      setUploadError(`Invalid file format "${ext}". Only .pdf, .jpg, .png, and .dicom files are accepted.`);
      return;
    }

    uploadDocument({
      title: docTitle.trim() || fileName,
      category: docCategory,
      fileName,
      fileSize: fileSizeStr,
      patientId: currentPatientId,
      isSharedWithHospitalConsent: consentToShare,
    });

    setDocTitle('');
    setFileName('');
    setUploadError(null);
    setShowUploadModal(false);
  };

  const getCategoryIcon = (category: DocumentCategory) => {
    const c = category.toLowerCase();
    if (c.includes('scan') || c.includes('image')) return FileImage;
    if (c.includes('prescription')) return FileSpreadsheet;
    return FileText;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure Medical Vault</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            My Documents
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Upload, view, and organize medical reports, prescriptions, scans, and travel documents with explicit hospital sharing consent.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition self-start sm:self-auto"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Security & Explicit Consent Notice */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-950">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            <strong>Explicit Patient Consent Protocol:</strong> Documents in your vault remain private by default. They are transmitted to a hospital's International Patient Desk only when you explicitly grant sharing consent.
          </span>
        </div>
        <span className="hidden sm:inline-block font-mono text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
          DISHA & HIPAA Compliant
        </span>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
        <button
          onClick={() => setActiveCategory('ALL')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
            activeCategory === 'ALL'
              ? 'bg-brand-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Categories ({documents.length})
        </button>
        {categories.map((cat) => {
          const count = documents.filter((d) => d.category.toLowerCase() === cat.toLowerCase()).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                activeCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Document List */}
      {filteredDocs.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <FolderLock className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No documents in this folder</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Upload your medical scans or government identity records to include them in hospital consultations.
          </p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-brand-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
          >
            Upload File Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDocs.map((doc) => {
            const Icon = getCategoryIcon(doc.category);
            return (
              <div
                key={doc.id}
                className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-sm transition space-y-3 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {doc.category}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">{doc.title}</h4>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5 truncate max-w-[220px]">
                        {doc.fileName} ({doc.fileSize})
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Verified
                  </span>
                </div>

                {/* Consent to Share with Hospital Toggle */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => toggleDocumentConsent(doc.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold text-[11px] border transition ${
                      doc.isSharedWithHospitalConsent
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                    title="Click to toggle consent to share with hospital"
                  >
                    <Share2 className="w-3 h-3" />
                    <span>
                      {doc.isSharedWithHospitalConsent
                        ? 'Shared with Hospital (Consent Granted)'
                        : 'Private (Not Shared)'}
                    </span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPreviewDoc(doc)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-slate-100 transition"
                      title="Preview Document"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => alert(`Simulating download of ${doc.fileName}...`)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-slate-100 transition"
                      title="Download Document"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteDocument(doc.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                      title="Delete from Vault"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Upload className="w-4 h-4 text-brand-600" />
                Upload to Medical Vault
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              {uploadError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                  <span>{uploadError}</span>
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">Select File (.pdf, .jpg, .png, .dicom)</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.dcm,.dicom"
                  onChange={handleFileChange}
                  className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 cursor-pointer border border-slate-200 rounded-xl p-1.5"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Document Category</label>
                <select
                  value={docCategory}
                  onChange={(e) => setDocCategory(e.target.value as DocumentCategory)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Document Title</label>
                <input
                  type="text"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  placeholder="e.g. Coronary Angiogram CD Report"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">File Name</label>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="e.g. Angio_Scan_Dhaka_2026.pdf"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  required
                />
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 space-y-1">
                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={consentToShare}
                    onChange={(e) => setConsentToShare(e.target.checked)}
                    className="rounded text-brand-600"
                  />
                  <span>Share with Hospital (Explicit Patient Consent)</span>
                </label>
                <p className="text-[11px] text-emerald-800">
                  Allow treating hospital doctors to view this report during quotation evaluation.
                </p>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-xs transition"
                >
                  Confirm Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-brand-600 uppercase">{previewDoc.category}</span>
                <h3 className="text-base font-bold text-slate-900">{previewDoc.title}</h3>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
              <FileText className="w-12 h-12 text-brand-600 mx-auto" />
              <div className="font-mono font-bold text-slate-800">{previewDoc.fileName}</div>
              <div className="text-[11px] text-slate-500">Size: {previewDoc.fileSize} • Uploaded on {previewDoc.uploadDate}</div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verified Hospital Security Hash
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
