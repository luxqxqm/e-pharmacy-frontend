import type { Metadata } from 'next';

import AddPharmacy from '@/components/Home/AddPharmacy/AddPharmacy';
import MainBanner from '@/components/Home/MainBanner/MainBanner';
import NearestStores from '@/components/Home/NearestStores/NearestStores';
import PromoBanners from '@/components/Home/PromoBanners/PromoBanners';
import Reviews from '@/components/Home/Reviews/Reviews';

export const metadata: Metadata = { title: 'Home' };

export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <MainBanner />
      <PromoBanners />
      <NearestStores />
      <AddPharmacy />
      <Reviews />
    </>
  );
}
