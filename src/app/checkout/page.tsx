import React from 'react';
import { CheckoutFlow } from '@/features/checkout/CheckoutFlow';

export const metadata = {
  title: 'Secure Checkout | ATELIER',
  description: 'Distraction-free acquisition and signature delivery authorization.',
};

export default function CheckoutPage() {
  return <CheckoutFlow />;
}
