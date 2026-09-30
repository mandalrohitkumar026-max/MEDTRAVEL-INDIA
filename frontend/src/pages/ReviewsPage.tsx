import React, { useState } from 'react';
import { mockReviews } from '../data/mockReviews';
import { ReviewItem } from '../types';
import { 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  Filter, 
  Plus, 
  ShieldCheck, 
  AlertCircle,
  Clock
} from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(mockReviews);
  const [selectedCat, setSelectedCat] = useState<string>('ALL');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [authorName, setAuthorName] = useState('');
  const [country, setCountry] = useState('Bangladesh (Dhaka)');
  const [targetName, setTargetName] = useState('Apollo Hospitals, Greams Road (Chennai)');
  const [category, setCategory] = useState<ReviewItem['category']>('HOSPITAL_SERVICE');
  const [rating, setRating] = useState<number>(5);
  const [content, setContent] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const filteredReviews = selectedCat === 'ALL'
    ? reviews
    : reviews.filter((r) => r.category === selectedCat);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      authorName,
      country,
      date: new Date().toISOString().split('T')[0],
      category,
      targetName,
      rating,
      content,
      isVerifiedStay: true,
      moderationStatus: 'APPROVED',
    };

    setReviews([newRev, ...reviews]);
    setSubmittedNotice(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmittedNotice(false);
      setContent('');
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Verified International Patient Experiences</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Patient Hospitality & Service Reviews
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl leading-relaxed">
            Authentic feedback on hospital international desks, nearby hotels, transport chauffeurs, and medical journey coordination.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Write a Service Review</span>
        </button>
      </div>

      {/* Non-Clinical Ethics Disclaimer */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3 text-xs text-slate-600">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <p>
          <strong>Review Guidelines:</strong> In compliance with international medical advertising standards, patient reviews evaluate customer coordination, language support, hotel accessibility, and chauffeur transit. They are strictly decoupled from subjective clinical outcome claims.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {[
          { id: 'ALL', label: 'All Reviews' },
          { id: 'HOSPITAL_SERVICE', label: 'Hospital International Desks' },
          { id: 'HOTEL', label: 'Accommodations' },
          { id: 'TRANSPORT', label: 'Transportation & Cabs' },
          { id: 'COORDINATION', label: 'Platform Concierge' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCat(tab.id)}
            className={`px-4 py-2 rounded-xl font-bold transition shrink-0 ${
              selectedCat === tab.id
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="space-y-4">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-2xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">{rev.authorName}</span>
                  <span className="text-xs text-slate-500">• {rev.country}</span>
                </div>
                <div className="text-xs font-semibold text-brand-700 mt-0.5">{rev.targetName}</div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Verified Trip
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
              "{rev.content}"
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Reviewed on {rev.date}
              </span>
              <span className="font-medium text-slate-500">Service & Hospitality Review</span>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-base font-bold text-slate-900">Share Your Service Experience</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            {submittedNotice ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Review Submitted for Moderation!</h4>
                <p className="text-xs text-slate-500">
                  Thank you for helping international patient families travel with confidence.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. Tariq R."
                      className="w-full p-2 bg-slate-50 border rounded-xl"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Country of Origin</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full p-2 bg-slate-50 border rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Review Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border rounded-xl"
                  >
                    <option value="HOSPITAL_SERVICE">Hospital International Desk Experience</option>
                    <option value="HOTEL">Hotel & Accommodation</option>
                    <option value="TRANSPORT">Chauffeur & Airport Transport</option>
                    <option value="COORDINATION">Platform Coordination Concierge</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Facility / Partner Name</label>
                  <input
                    type="text"
                    value={targetName}
                    onChange={(e) => setTargetName(e.target.value)}
                    className="w-full p-2 bg-slate-50 border rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    className="w-full p-2 bg-slate-50 border rounded-xl"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (Excellent)</option>
                    <option value={4}>⭐⭐⭐⭐ (Very Good)</option>
                    <option value={3}>⭐⭐⭐ (Average)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Your Experience (Hospitality, Communication & Amenities)
                  </label>
                  <textarea
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Describe how the desk assisted with languages, airport pickup, room comfort..."
                    className="w-full p-2.5 bg-slate-50 border rounded-xl"
                    required
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-xl text-slate-600">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-brand-600 text-white rounded-xl font-bold shadow-xs">Publish Review</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
