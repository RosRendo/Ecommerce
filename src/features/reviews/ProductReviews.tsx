'use client';

import React, { useState } from 'react';
import { Star, Check, Plus, X, MessageSquare } from 'lucide-react';
import { Review } from '@/types';

interface ProductReviewsProps {
  productId: string;
  productTitle: string;
  initialRating?: number;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'aether-01',
    authorName: 'Dr. Henrik Lindqvist',
    rating: 5,
    date: 'September 14, 2026',
    title: 'Remarkable transient response and total absence of acoustic coloration.',
    comment:
      'Having evaluated electroacoustic transducers in our Stockholm sound laboratory for fifteen years, the Aether 01 represents an astonishing standard of industrial calibration. The planar magnetic diaphragms resolve micro-dynamics with surgical clarity. Furthermore, the CNC-milled chassis exhibits zero microphonics.',
    verifiedPurchase: true,
  },
  {
    id: 'rev-2',
    productId: 'aether-01',
    authorName: 'Julian Meier',
    rating: 5,
    date: 'August 29, 2026',
    title: 'Monolithic build quality. The vegetable-tanned leather headband is sublime.',
    comment:
      'The tactile feel of the unblemished volcanic black finish exceeds any reference monitor I have owned. Long listening sessions of 4+ hours produce zero headband fatigue. The magnetic cable connector snaps into place with satisfying mechanical tactility.',
    verifiedPurchase: true,
  },
  {
    id: 'rev-3',
    productId: 'aether-01',
    authorName: 'Camille de Saint-Germain',
    rating: 4,
    date: 'August 02, 2026',
    title: 'Uncompromising fidelity, demands clean high-output amplification.',
    comment:
      'These are uncompromised monitors. With a high-current balanced amplifier, the holographic spatial imaging is breathtaking. Ensure your upstream DAC matches the resolving power of these transducers.',
    verifiedPurchase: true,
  },
];

export function ProductReviews({
  productId,
  productTitle,
  initialRating = 4.9,
}: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(DEFAULT_REVIEWS);
  const [modalOpen, setModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !comment) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId,
      authorName,
      rating,
      date: 'Just now • Verified Client',
      title: title || 'Atelier Instrument Evaluation',
      comment,
      verifiedPurchase: true,
    };

    setReviews([newReview, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setModalOpen(false);
      setSubmitted(false);
      setTitle('');
      setComment('');
      setAuthorName('');
    }, 1200);
  };

  return (
    <section className="py-20 lg:py-28 border-b border-[#E5E5E5] bg-[#FFFFFF]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E5E5] pb-8 gap-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block">
              Client Evaluations &amp; Peer Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-[0.06em] text-[#000000]">
              Provenance &amp; Field Evaluations
            </h2>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="flex items-center space-x-1 justify-end">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-sm text-[#000000]">
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-[#525252] block pt-1">
                <strong className="text-[#000000] font-mono text-sm">{initialRating}</strong> / 5.0 (
                {reviews.length} Verified Evaluations)
              </span>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="h-11 px-6 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#171717] transition-colors flex items-center space-x-2 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Submit Evaluation</span>
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="border border-[#E5E5E5] bg-[#FAFAFA] p-6 lg:p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#000000] text-xs tracking-widest">
                    {[...Array(rev.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-[#A3A3A3]">{rev.date}</span>
                </div>

                <h4 className="text-sm font-medium tracking-[0.02em] text-[#000000] leading-snug">
                  "{rev.title}"
                </h4>

                <p className="text-xs text-[#525252] leading-relaxed font-light">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E5E5] flex items-center justify-between text-xs">
                <span className="font-medium text-[#000000]">{rev.authorName}</span>
                {rev.verifiedPurchase && (
                  <span className="flex items-center space-x-1 text-[10px] uppercase tracking-[0.14em] text-[#525252]">
                    <Check className="w-3 h-3 text-[#000000]" />
                    <span>Verified Owner</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#000000]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#000000] w-full max-w-lg p-8 space-y-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 text-[#525252] hover:text-[#000000] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252]">
                Atelier Registry
              </span>
              <h3 className="text-xl font-light tracking-[0.06em] text-[#000000]">
                Submit Evaluation for {productTitle}
              </h3>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <Check className="w-8 h-8 text-[#000000] mx-auto" />
                <h4 className="text-sm uppercase tracking-[0.2em] text-[#000000]">
                  Evaluation Verified &amp; Published
                </h4>
                <p className="text-xs text-[#525252]">
                  Thank you for contributing to the Atelier collective archive.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Rating selection */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.18em] text-[#525252] block">
                    Acoustic &amp; Industrial Rating
                  </label>
                  <div className="flex space-x-3 text-lg cursor-pointer">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => setRating(star)}
                        className={`transition-colors ${
                          rating >= star ? 'text-[#000000]' : 'text-[#E5E5E5]'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-[0.18em] text-[#525252] block">
                    Client Name or Alias
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="w-full h-11 px-3 border border-[#E5E5E5] text-xs text-[#000000] focus:border-[#000000] focus:outline-none"
                  />
                </div>

                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-[0.18em] text-[#525252] block">
                    Headline
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Masterclass in acoustic transparency"
                    className="w-full h-11 px-3 border border-[#E5E5E5] text-xs text-[#000000] focus:border-[#000000] focus:outline-none"
                  />
                </div>

                {/* Detailed Comment */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-[0.18em] text-[#525252] block">
                    Detailed Field Notes
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe material finish, frequency accuracy, ergonomics, or companion components..."
                    className="w-full p-3 border border-[#E5E5E5] text-xs text-[#000000] focus:border-[#000000] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#171717] transition-colors cursor-pointer"
                >
                  Publish Evaluation
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
