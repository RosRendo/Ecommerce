'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useAuth } from '@/lib/store/auth-store';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated, user } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('Password must contain a minimum of 8 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await register(name, email, password);
      if (res.success) {
        router.push('/account');
      } else {
        setError(res.error || 'Failed to create membership. Please try again.');
      }
    } catch {
      setError('An error occurred during registration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#FFFFFF] flex items-center justify-center py-16 px-6 lg:px-12">
      <div className="w-full max-w-md space-y-10">
        {/* Header */}
        <div className="space-y-3 text-center sm:text-left">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block">
            Atelier Privé Membership
          </span>
          <h1 className="text-3xl font-light tracking-[0.06em] text-[#000000]">
            Request Client Registration
          </h1>
          <p className="text-xs text-[#525252] leading-relaxed">
            Register to save architectural shipping dossiers, access numbered archival drops, and consult with the Zurich salon.
          </p>
        </div>

        {isAuthenticated && user ? (
          <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-6 space-y-4">
            <div className="flex items-center space-x-2 text-xs text-[#000000] font-medium uppercase tracking-[0.14em]">
              <Check className="w-4 h-4 text-[#000000]" />
              <span>Membership Active</span>
            </div>
            <p className="text-xs text-[#525252]">
              You are currently registered as <strong className="text-[#000000]">{user.name}</strong> ({user.tier}).
            </p>
            <div className="pt-2">
              <Link
                href="/account"
                className="h-10 px-5 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.18em] inline-flex items-center justify-center hover:bg-[#171717] transition-colors"
              >
                Go to Client Portal
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 border border-[#000000] bg-[#FAFAFA] text-xs text-[#000000] tracking-[0.02em]">
                {error}
              </div>
            )}

            {/* Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-[11px] uppercase tracking-[0.18em] text-[#525252] block"
              >
                Full Legal Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Julian Meier"
                className="w-full h-12 px-4 bg-[#FFFFFF] border border-[#E5E5E5] text-sm text-[#000000] placeholder:text-[#A3A3A3] focus:border-[#000000] focus:outline-none transition-colors"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-[11px] uppercase tracking-[0.18em] text-[#525252] block"
              >
                Client Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="julian@atelier.design"
                className="w-full h-12 px-4 bg-[#FFFFFF] border border-[#E5E5E5] text-sm text-[#000000] placeholder:text-[#A3A3A3] focus:border-[#000000] focus:outline-none transition-colors"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-[11px] uppercase tracking-[0.18em] text-[#525252] block"
              >
                Create Security Key (Min 8 Characters)
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-12 px-4 bg-[#FFFFFF] border border-[#E5E5E5] text-sm text-[#000000] placeholder:text-[#A3A3A3] focus:border-[#000000] focus:outline-none transition-colors"
              />
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start space-x-3 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 rounded-none border-[#E5E5E5] accent-[#000000]"
              />
              <span className="text-[11px] text-[#525252] leading-tight">
                Enroll in the Atelier Privé register to receive notice of limited production batches and archival monographs.
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.24em] font-medium hover:bg-[#171717] transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Establishing Register...' : 'Complete Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="pt-6 border-t border-[#E5E5E5] space-y-4 text-xs text-[#525252]">
          <div className="flex justify-between items-center">
            <span>Already have an Atelier account?</span>
            <Link
              href="/login"
              className="text-[#000000] font-medium uppercase tracking-[0.14em] hover:underline"
            >
              Client Sign In →
            </Link>
          </div>

          <div className="flex items-center space-x-2 pt-2 text-[10px] text-[#A3A3A3] tracking-[0.06em]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#525252]" />
            <span>Strict privacy adherence. Your information is never syndicated or monetized.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
