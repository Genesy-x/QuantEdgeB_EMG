import React from 'react';
import { Contact } from '../sections/Contact';
import { Hero } from '../sections/Hero';
import { Pricing } from '../sections/Pricing';
import { Services } from '../sections/Services';
import { WhyChoosingQuantEdgeB } from '../sections/WhyChoosingQuantEdgeB';
import { PageBlurIn } from '../components/ui/page-blur-in';

function HomePage() {
  return (
    <PageBlurIn duration={1.}>
      <main>
        <Hero />
        <Services />
        <WhyChoosingQuantEdgeB />
        <Pricing />
        <Contact />
      </main>
    </PageBlurIn>
  );
}

export default HomePage;