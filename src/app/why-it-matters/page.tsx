'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhyItMattersHero } from '@/components/WhyItMattersHero';
import { WellBeingImperative } from '@/components/WellBeingImperative';
import { WhatsAtStake } from '@/components/WhatsAtStake';
import { BusinessImpact } from '@/components/BusinessImpact';
import { BeyondPerks } from '@/components/BeyondPerks';
import { AtGatherUp } from '@/components/AtGatherUp';
import { BlogPreview } from '@/components/BlogPreview';
import { CTASection } from '@/components/CTASection';
import { pageLoad } from '@/utils/animations';

export default function WhyItMatters() {
    return (
        <motion.main
            className="min-h-screen bg-white overflow-x-hidden"
            variants={pageLoad}
            initial="hidden"
            animate="visible"
        >
            <Header />
            <WhyItMattersHero />
            <WellBeingImperative />
            <WhatsAtStake />
            <BusinessImpact />
            <BeyondPerks />
            <AtGatherUp />
            {/* <BlogPreview /> */}
            <CTASection />
            <Footer />
        </motion.main>
    );
}
