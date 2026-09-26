'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useAuth } from '@/lib/store/auth-store';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, user, logout } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        router.push('/account');
      } else {
        setError(res.error || 'Authentication failed. Please verify credentials.');
      }
    } catch {
      setError('An error occurred during authentication.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoAccount = () => {
    setEmail('marcus.vance@atelier-prive.com');
    setPassword('••••••••••••');
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#FFFFFF] flex items-center justify-center py-16 px-6 lg:px-12">
      <div className="w-full max-w-md space-y-10">
        {/* Header */}
        <div className="space-y-3 text-center sm:text-left">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block">
            Atelier Privé Identity
          </span>
          <h1 className="text-3xl font-light tracking-[0.06em] text-[#000000]">
            Client Identification
          </h1>
          <p className="text-xs text-[#525252] leading-relaxed">
            Access your order milestones, certified acquisitions, and bespoke salon concierge.
          </p>
        </div>

        {isAuthenticated && user ? (
          <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-6 space-y-4">
            <div className="flex items-center space-x-2 text-xs text-[#000000] font-medium uppercase tracking-[0.14em]">
              <Check className="w-4 h-4 text-[#000000]" />
              <span>Currently Authenticated</span>
            </div>
            <p className="text-xs text-[#525252]">
              Logged in as <strong className="text-[#000000]">{user.name}</strong> ({user.email}).
            </p>
            <div className="flex space-x-4 pt-2">
              <Link
                href="/account"
                className="h-10 px-5 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.18em] flex items-center justify-center hover:bg-[#171717] transition-colors"
              >
                Go to Portal
              </Link>
              <button
                onClick={logout}
                className="h-10 px-5 border border-[#E5E5E5] text-[#000000] text-xs uppercase tracking-[0.18em] hover:border-[#000000] transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 border border-[#000000] bg-[#FAFAFA] text-xs text-[#000000] tracking-[0.02em]">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-[11px] uppercase tracking-[0.18em] text-[#525252] block"
              >
                Client Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="collector@atelier.design"
                className="w-full h-12 px-4 bg-[#FFFFFF] border border-[#E5E5E5] text-sm text-[#000000] placeholder:text-[#A3A3A3] focus:border-[#000000] focus:outline-none transition-colors"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label
                  htmlFor="password"
                  className="text-[11px] uppercase tracking-[0.18em] text-[#525252] block"
                >
                  Password / Passkey
                </label>
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#525252] hover:text-[#000000] cursor-pointer">
                  Forgot?
                </span>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-12 px-4 pr-12 bg-[#FFFFFF] border border-[#E5E5E5] text-sm text-[#000000] placeholder:text-[#A3A3A3] focus:border-[#000000] focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#525252] hover:text-[#000000] transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.24em] font-medium hover:bg-[#171717] transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Demo Quick Fill */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={fillDemoAccount}
                className="text-[10px] uppercase tracking-[0.18em] text-[#525252] hover:text-[#000000] underline underline-offset-4 cursor-pointer"
              >
                Auto-fill demo client (Marcus Vance)
              </button>
            </div>
          </form>
        )}

        {/* Footer Navigation */}
        <div className="pt-6 border-t border-[#E5E5E5] space-y-4 text-xs text-[#525252]">
          <div className="flex justify-between items-center">
            <span>New to the Atelier?</span>
            <Link
              href="/register"
              className="text-[#000000] font-medium uppercase tracking-[0.14em] hover:underline"
            >
              Request Access / Register →
            </Link>
          </div>

          <div className="flex items-center space-x-2 pt-2 text-[10px] text-[#A3A3A3] tracking-[0.06em]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#525252]" />
            <span>256-bit encrypted RSA handshake. Zero third-party data tracking.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
