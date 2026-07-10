'use client';

import React from 'react';
import { useRouter } from '@/i18n/navigation';
import { LandingPage } from '@/components/LandingPage';

export default function HomePage() {
  const router = useRouter();

  return <LandingPage onStartBuilder={() => router.push('/builder')} />;
}
