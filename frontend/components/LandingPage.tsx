'use client';

import React from 'react';
import { Navbar } from './landing/Navbar';
import { HeroSection } from './landing/HeroSection';
import { ComparisonSection } from './landing/ComparisonSection';
import { WorkflowSection } from './landing/WorkflowSection';
import { FaqSection } from './landing/FaqSection';
import { CtaSection } from './landing/CtaSection';
import { Footer } from './Footer';

interface LandingPageProps {
  onStartBuilder: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartBuilder }) => {
  return (
    <div className="min-h-dvh bg-surface text-content flex flex-col font-sans selection:bg-content selection:text-content-inverse">
      <Navbar onStartBuilder={onStartBuilder} />
      <main className="flex-1">
        <HeroSection onStartBuilder={onStartBuilder} />
        <ComparisonSection onStartBuilder={onStartBuilder} />
        <WorkflowSection onStartBuilder={onStartBuilder} />
        <FaqSection />
        <CtaSection onStartBuilder={onStartBuilder} />
      </main>
      <Footer />
    </div>
  );
};
