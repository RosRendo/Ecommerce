import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/store/cart-store';
import { WishlistProvider } from '@/lib/store/wishlist-store';
import { SearchProvider } from '@/lib/store/search-store';
import { CurrencyProvider } from '@/lib/store/currency-store';
import { AuthProvider } from '@/lib/store/auth-store';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/footer/Footer';
import { CartDrawer } from '@/features/cart/CartDrawer';
import { WishlistDrawer } from '@/features/wishlist/WishlistDrawer';
import { SearchModal } from '@/components/search/SearchModal';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ATELIER | Precision Instruments & Acoustic Architecture',
  description:
    'A luxury design atelier creating elemental acoustic monitors, mechanical chronometers, monolithic luminaires, and vegetable-tanned leather goods.',
  keywords: [
    'luxury ecommerce',
    'minimalist design',
    'planar magnetic headphones',
    'architectural lighting',
    'mechanical watches',
    'monochrome design',
  ],
  authors: [{ name: 'Atelier Systems Zurich' }],
  openGraph: {
    title: 'ATELIER | Precision Instruments & Acoustic Architecture',
    description:
      'Elemental acoustic monitors, mechanical chronometers, and monolithic luminaires forged from single-billet aluminum and volcanic stone.',
    url: 'https://atelier.design',
    siteName: 'ATELIER',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'ATELIER Archival Product Overview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ATELIER | Precision Instruments & Acoustic Architecture',
    description:
      'Elemental acoustic monitors, mechanical chronometers, and monolithic luminaires.',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FFFFFF] text-[#000000]">
        <CurrencyProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <SearchProvider>
                  <Header />
                  <main className="flex-1">{children}</main>
                  <CartDrawer />
                  <WishlistDrawer />
                  <SearchModal />
                  <Footer />
                </SearchProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
