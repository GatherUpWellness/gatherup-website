'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { scrollReveal, staggerContainer } from '@/utils/animations';

export const GatherUp5DApproach: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
    const steps = [
        {
            number: "01",
            keyword: "DISCOVER",
            description: "Not guessing. Not copying the property down the street. We collect real input from occupants and onsite teams, along with existing usage patterns, to understand what's working, what feels missing, and how the property is actually experienced day to day."
        },
        {
            number: "02",
            keyword: "DEFINE",
            description: "If it doesn't support outcomes, it doesn't make the cut. We align on clear priorities, such as satisfaction, renewals, occupancy, referrals, reviews, or leasing story, so every wellness and community initiative has a specific job to do."
        },
        {
            number: "03",
            keyword: "DESIGN",
            description: "Strategy first. Activities second. We create a focused activation roadmap that connects early momentum (quick wins) with a longer-term plan that can run with current staffing and scale across the property or portfolio."
        },
        {
            number: "04",
            keyword: "DELIVER",
            description: "No random acts of wellness. We run or support the rollout of targeted activations, workshops, and experiences that align with the property’s brand, the people who use it, and its overall positioning."
        },
        {
            number: "05",
            keyword: "DEMONSTRATE",
            description: "You shouldn’t have to “hope” wellness works, you should see it. We track a simple, property friendly set of metrics, engagement, satisfaction, renewal intent, and reputation or leasing story inputs, so you can report real outcomes, not just attendance."
        }
    ];

    return (
        <section className="px-2 md:px-4 py-8 md:py-12 bg-[#053d3d]">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={sectionRef}
                    className="text-center mb-12 max-w-4xl mx-auto"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.h2
                        variants={scrollReveal}
                        className="text-3xl md:text-4xl font-bold text-[#a6ff48] mb-6 font-display"
                    >
                        The GatherUp Approach
                    </motion.h2>
                    <motion.p
                        variants={scrollReveal}
                        className="text-md text-lg md:text-lg text-white leading-relaxed"
                    >
                        We don't throw events at the wall and hope they work. Every engagement runs through the GatherUp 5D Approach so wellness and community initiatives support retention, reputation, and performance.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="max-w-4xl mx-auto space-y-6 md:space-y-8"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={scrollReveal}
                            className="bg-[#3d6e6e]/30 border border-[#a6ff48]/20 rounded-2xl p-6 md:p-8"
                        >
                            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                                {/* Left Side - Number and Keyword */}
                                <div className="flex-shrink-0 w-full md:w-40 mx-auto md:mx-0">
                                    <div className="text-center text-4xl md:text-5xl font-bold text-[#a6ff48] mb-2 font-display">
                                        {step.number}
                                    </div>
                                    <div className="text-center text-2xl md:text-xl font-bold text-[#a6ff48] font-display">
                                        {step.keyword}
                                    </div>
                                </div>

                                {/* Right Side - Description */}
                                <div className="flex-1 flex items-center md:items-center min-w-0">
                                    <p className="text-center md:text-left text-base md:text-lg text-white leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
