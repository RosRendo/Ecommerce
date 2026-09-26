'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('acoustic_consultation');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setTicketId(`TKT-2026-${Math.floor(10000 + Math.random() * 90000)}`);
    setSubmitted(true);
  };

  const SALONS = [
    {
      city: 'Zurich Head Atelier',
      address: 'Bahnhofstrasse 42, 8001 Zurich, Switzerland',
      phone: '+41 44 218 90 00',
      hours: 'Mon – Fri: 10:00 – 18:30 CET',
      focus: 'Acoustic Engineering, Custom Calibration & Global Dispatch',
    },
    {
      city: 'Tokyo Salon',
      address: '5-7-22 Minamiaoyama, Minato-ku, Tokyo 107-0062',
      phone: '+81 3 5410 8800',
      hours: 'Tue – Sun: 11:00 – 19:00 JST',
      focus: 'Private Listening Sessions & Minimalist Horology',
    },
    {
      city: 'New York Gallery',
      address: '456 West Broadway, SoHo, NY 10012',
      phone: '+1 212 555 0199',
      hours: 'Mon – Sat: 11:00 – 19:00 EST',
      focus: 'Architectural Monolith Displays & White Glove Consultations',
    },
    {
      city: 'Paris Salon',
      address: '18 Place Vendôme, 75001 Paris, France',
      phone: '+33 1 42 68 55 00',
      hours: 'Mon – Fri: 10:30 – 18:30 CET',
      focus: 'Precious Metallurgy & Archival Chronometry',
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] py-12 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 space-y-16">
        {/* Header */}
        <div className="border-b border-[#E5E5E5] pb-8 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block">
            Atelier Privé Concierge
          </span>
          <h1 className="text-3xl sm:text-4xl font-light tracking-[0.06em] text-[#000000]">
            Direct Concierge &amp; Salon Appointments
          </h1>
          <p className="text-xs text-[#525252] max-w-xl leading-relaxed">
            Reserve a private acoustic listening room, arrange custom laser engraving, or consult on room dimensions with an engineer.
          </p>
        </div>

        {/* Form & Salons Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 border border-[#E5E5E5] bg-[#FAFAFA] p-8 lg:p-10 space-y-8">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#525252]">
                Dossier Submission
              </span>
              <h2 className="text-xl font-light tracking-[0.06em] text-[#000000]">
                Initiate Private Inquiry
              </h2>
            </div>

            {submitted ? (
              <div className="p-8 border border-[#000000] bg-[#FFFFFF] space-y-4">
                <Check className="w-8 h-8 text-[#000000]" />
                <h3 className="text-base uppercase tracking-[0.16em] text-[#000000] font-medium">
                  Inquiry Registered: <span className="font-mono">{ticketId}</span>
                </h3>
                <p className="text-xs text-[#525252] leading-relaxed">
                  Your inquiry has been assigned to <strong className="text-[#000000]">Elena Rostova</strong>, Head of Client Relations. A detailed acoustic and scheduling response will be delivered to <strong className="text-[#000000]">{email}</strong> within 4 business hours.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="text-xs uppercase tracking-[0.18em] text-[#000000] underline cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-[0.18em] text-[#525252] block">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Marcus Vance"
                      className="w-full h-12 px-4 bg-[#FFFFFF] border border-[#E5E5E5] text-xs text-[#000000] focus:border-[#000000] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-[0.18em] text-[#525252] block">
                      Client Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="collector@atelier.design"
                      className="w-full h-12 px-4 bg-[#FFFFFF] border border-[#E5E5E5] text-xs text-[#000000] focus:border-[#000000] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-[0.18em] text-[#525252] block">
                    Nature of Inquiry
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full h-12 px-4 bg-[#FFFFFF] border border-[#E5E5E5] text-xs text-[#000000] focus:border-[#000000] focus:outline-none"
                  >
                    <option value="acoustic_consultation">
                      Private Salon Listening Session (Zurich / Tokyo / New York / Paris)
                    </option>
                    <option value="room_pairing">
                      Acoustic &amp; Room Dimension Consultation
                    </option>
                    <option value="bespoke_engraving">
                      Custom Laser Engraving &amp; Provenance Inscription
                    </option>
                    <option value="order_logistics">
                      Active Dispatch &amp; White Glove Delivery Modification
                    </option>
                    <option value="press_curation">
                      Architectural Curation &amp; Institutional Press
                    </option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-[0.18em] text-[#525252] block">
                    Inquiry Details
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Specify dates for listening room reservations, room ceiling height, or object serial references..."
                    className="w-full p-4 bg-[#FFFFFF] border border-[#E5E5E5] text-xs text-[#000000] focus:border-[#000000] focus:outline-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.24em] font-medium hover:bg-[#171717] transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Dispatch Dossier to Concierge</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Global Salons Directory (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#525252] block">
              Atelier Coordinates
            </span>
            <div className="space-y-6">
              {SALONS.map((salon, idx) => (
                <div key={idx} className="border border-[#E5E5E5] p-6 space-y-3 bg-[#FFFFFF]">
                  <h3 className="text-sm font-medium tracking-[0.06em] text-[#000000]">
                    {salon.city}
                  </h3>
                  <div className="space-y-1.5 text-xs text-[#525252] leading-relaxed">
                    <p className="flex items-start space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-[#000000] mt-0.5 flex-shrink-0" />
                      <span>{salon.address}</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <Phone className="w-3.5 h-3.5 text-[#000000] flex-shrink-0" />
                      <span className="font-mono text-[11px] text-[#000000]">{salon.phone}</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-[#A3A3A3] flex-shrink-0" />
                      <span className="text-[11px]">{salon.hours}</span>
                    </p>
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[#A3A3A3] pt-1 border-t border-[#E5E5E5]">
                    {salon.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
