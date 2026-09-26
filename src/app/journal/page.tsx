import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'The Monograph Gazette | ATELIER',
  description: 'Essays on industrial reduction, material physics, and minimal living.',
};

export const ARTICLES = [
  {
    slug: 'form-follows-void',
    title: 'Form Follows Void: The Philosophy of Essentialism',
    subtitle: 'On the courageous act of subtraction in industrial object design.',
    date: 'Autumn 2026',
    author: 'Elena Rostova, Design Director',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1800&q=90',
    summary:
      'In a commercial landscape flooded with transient novelties, we make a deliberate vow: to strip away every extraneous line until only pure mass, tactile honesty, and acoustic silence remain.',
  },
  {
    slug: 'machined-silence',
    title: 'Machined Silence: Engineering Beryllium Diaphragms',
    subtitle: 'Eliminating harmonic discoloration through single-billet metal housing.',
    date: 'Summer 2026',
    author: 'Dr. Markus Keller, Head of Acoustic Research',
    readTime: '7 min read',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=90',
    summary:
      'Why conventional composite headphones vibrate unpredictably under high-velocity transients, and how 5-axis CNC-milled 6061 aluminum creates an acoustically inert acoustic chamber.',
  },
  {
    slug: 'living-patina',
    title: 'The Living Patina: Unlined Tuscan Vachetta',
    subtitle: 'The sixty-day bark tanning ritual that darkens under sunlight and skin touch.',
    date: 'Spring 2026',
    author: 'Matteo Bellini, Master Leather Artisan',
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1800&q=90',
    summary:
      'Unlike plastic-coated synthetic hides that look immaculate on day one and disintegrate by month six, vegetable-tanned leather absorbs the narrative of your hands, maturing into a deep honeyed armor.',
  },
];

export default function JournalPage() {
  const featured = ARTICLES[0];
  const others = ARTICLES.slice(1);

  return (
    <div className="w-full bg-[#FFFFFF] py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="border-b border-[#E5E5E5] pb-8 mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block">
            The Atelier Monograph
          </span>
          <h1 className="text-4xl sm:text-5xl font-light tracking-[0.06em] text-[#000000]">
            Essays on Industrial Reduction
          </h1>
          <p className="text-xs sm:text-sm text-[#525252] max-w-xl font-light leading-relaxed">
            In-depth white papers, material investigations, and philosophical inquiries published quarterly by our Zurich studio.
          </p>
        </div>

        {/* Featured Long-Form Essay */}
        <div className="border-b border-[#E5E5E5] pb-20 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <Link href={`/journal/${featured.slug}`} className="block relative aspect-[16/10] bg-[#FAFAFA] border border-[#E5E5E5] overflow-hidden group">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
              </Link>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center space-x-3 text-[10px] uppercase font-mono tracking-widest text-[#A3A3A3]">
                <span>{featured.date}</span>
                <span>•</span>
                <span>{featured.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-light tracking-[0.06em] text-[#000000] leading-snug">
                <Link href={`/journal/${featured.slug}`} className="hover:text-[#525252] transition-colors">
                  {featured.title}
                </Link>
              </h2>

              <p className="text-xs uppercase tracking-[0.1em] text-[#525252] font-normal">
                {featured.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-[#525252] leading-relaxed font-light">
                {featured.summary}
              </p>

              <div className="pt-2">
                <Link
                  href={`/journal/${featured.slug}`}
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-[#000000] border-b border-[#000000] pb-1 hover:text-[#525252] hover:border-[#525252] transition-colors"
                >
                  <span>Read Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {others.map((article) => (
            <div key={article.slug} className="space-y-6 flex flex-col justify-between border-b border-[#E5E5E5] pb-12">
              <Link href={`/journal/${article.slug}`} className="block relative aspect-[16/10] bg-[#FAFAFA] border border-[#E5E5E5] overflow-hidden group">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
              </Link>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-[10px] uppercase font-mono tracking-widest text-[#A3A3A3]">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-xl font-light tracking-[0.06em] text-[#000000]">
                  <Link href={`/journal/${article.slug}`} className="hover:text-[#525252] transition-colors">
                    {article.title}
                  </Link>
                </h3>

                <p className="text-xs text-[#525252] leading-relaxed font-light line-clamp-3">
                  {article.summary}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/journal/${article.slug}`}
                    className="inline-flex items-center space-x-1.5 text-[11px] uppercase tracking-[0.16em] text-[#000000] hover:text-[#525252] transition-colors"
                  >
                    <span>Read Investigation</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
