'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { scrollReveal, imageLoad, staggerContainer, flipCardTransition, flipCardContainerStyle, flipCardBackfaceStyle, flipCardPerspectiveStyle } from '@/utils/animations';

export const BusinessImpact: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
    const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

    const handleCardFlip = (index: number) => {
        if (!flippedCards.has(index)) {
            setFlippedCards((prev) => new Set(prev).add(index));
        }
    };

    const impactMetrics = [
        {
            title: "Retention",
            description: "Tenants who feel connected to their building and community are significantly more likely to renew rather than relocate.",
            iconSrc: "/assets/icons/Retention-1.png",
            iconAlt: "Retention",
            iconSize: "w-20 h-20"
        },
        {
            title: "Engagement",
            description: "Activated amenities and shared experiences turn unused spaces into daily touchpoints that increase satisfaction and loyalty.",
            iconSrc: "/assets/icons/Engagement.png",
            iconAlt: "Engagement",
            iconSize: "w-20 h-20"
        },
        {
            title: "Community",
            description: "Properties with strong community see better tenant relationships, smoother communication, and fewer friction points.",
            iconSrc: "/assets/icons/Culture.png",
            iconAlt: "Community",
            iconSize: "w-20 h-20"
        },
        {
            title: "Occupancy & Leasing Velocity",
            description: "Engaged tenants become advocates supporting faster lease-ups and easier renewals through social proof and referrals.",
            iconSrc: "/assets/icons/Occupancy-Leasing-Velocity.png",
            iconAlt: "Occupancy-Leasing-Velocity",
            iconSize: "w-20 h-20"
        },
        {
            title: "Property Reputation",
            description: "Consistent on-site programming improves reviews, tours, and perception without major capital investments.",
            iconSrc: "/assets/icons/Property-Reputation.png",
            iconAlt: "Property-Reputation",
            iconSize: "w-24 h-24"
        },
        {
            title: "Performance",
            description: "Reduced turnover, improved renewals, and stronger demand directly protect and grow net operating income.",
            iconSrc: "/assets/icons/Profitability.png",
            iconAlt: "Performance",
            iconSize: "w-20 h-20"
        }
    ];

    return (
        <section className="px-2 md:px-4 pt-2 md:pt-4 pb-8 md:pb-12 bg-[#053d3d] text-white">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={sectionRef}
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.h2
                        variants={scrollReveal}
                        className="text-3xl md:text-4xl font-bold text-center mb-16 font-display"
                    >
                        The Impact on Property Performance
                    </motion.h2>

                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 gap-8 max-w-6xl mx-auto items-stretch"
                        variants={staggerContainer}
                    >
                        {impactMetrics.map((item, index) => {
                            const isFlipped = flippedCards.has(index);

                            return (
                                <motion.div
                                    key={index}
                                    variants={scrollReveal}
                                    className="relative h-full"
                                >
                                    {/* Mobile/Tablet: Simple card without flip - icon, title, and description */}
                                    <div className="lg:hidden h-full">
                                        <div className="bg-[#3d6e6e]/30 border border-[#a6ff48]/30 rounded-2xl p-8 flex flex-col items-center text-center h-full overflow-hidden">
                                            <motion.div
                                                className="flex items-center justify-center h-20"
                                                variants={imageLoad}
                                                initial="hidden"
                                                animate={isInView ? "visible" : "hidden"}
                                            >
                                                <div className={`relative ${item.iconSize}`}>
                                                    <Image
                                                        src={item.iconSrc}
                                                        alt={item.iconAlt}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            </motion.div>
                                            <h3 className="text-[#a6ff48] font-bold text-xl mb-4 font-display min-h-[62px] flex items-center justify-center">
                                                {item.title}
                                            </h3>
                                            <p className="text-white/90 text-base leading-relaxed flex-1">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Desktop: Flip card with transition */}
                                    <div
                                        className="hidden lg:block relative cursor-pointer h-full"
                                        style={flipCardPerspectiveStyle}
                                        onClick={() => handleCardFlip(index)}
                                        onMouseEnter={() => handleCardFlip(index)}
                                    >
                                        {/* Height placeholder - matches front card content with description */}
                                        <div className="opacity-0 pointer-events-none h-full">
                                            <div className="bg-[#3d6e6e]/30 border border-[#a6ff48]/30 rounded-2xl p-8 flex flex-col items-center text-center h-full overflow-hidden">
                                                <div className="flex items-center justify-center h-20">
                                                    <div className={`relative ${item.iconSize}`}></div>
                                                </div>
                                                <h3 className="text-[#a6ff48] font-bold text-xl mb-4 font-display min-h-[62px] flex items-center justify-center">{item.title}</h3>
                                                <p className="text-white/90 text-base leading-relaxed flex-1">{item.description}</p>
                                            </div>
                                        </div>

                                        {/* Flip container */}
                                        <motion.div
                                            className="absolute inset-0 w-full h-full"
                                            initial={{ rotateY: 180 }}
                                            animate={{
                                                rotateY: isFlipped ? 0 : 180,
                                            }}
                                            transition={flipCardTransition}
                                            style={flipCardContainerStyle}
                                        >
                                            {/* Back of card (shown initially) - icon and title only, centered */}
                                            <motion.div
                                                className="absolute inset-0 w-full h-full bg-[#3d6e6e]/30 border border-[#a6ff48]/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center backface-hidden overflow-hidden"
                                                style={{
                                                    ...flipCardBackfaceStyle,
                                                    transform: 'rotateY(180deg)',
                                                }}
                                            >
                                                <motion.div
                                                    className="flex items-center justify-center h-20"
                                                    variants={imageLoad}
                                                    initial="hidden"
                                                    animate={!isFlipped ? "visible" : "hidden"}
                                                >
                                                    <div className={`relative ${item.iconSize}`}>
                                                        <Image
                                                            src={item.iconSrc}
                                                            alt={item.iconAlt}
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                </motion.div>
                                                <h3 className="text-[#a6ff48] font-bold text-xl font-display">
                                                    {item.title}
                                                </h3>
                                            </motion.div>

                                            {/* Front of card (shown after flip) - icon, title, and full description */}
                                            <motion.div
                                                className="absolute inset-0 w-full h-full bg-[#3d6e6e]/30 border border-[#a6ff48]/30 rounded-2xl p-8 flex flex-col items-center text-center backface-hidden overflow-hidden"
                                                style={flipCardBackfaceStyle}
                                            >
                                                <motion.div
                                                    className="flex items-center justify-center h-20"
                                                    variants={imageLoad}
                                                    initial="hidden"
                                                    animate={isFlipped ? "visible" : "hidden"}
                                                >
                                                    <div className={`relative ${item.iconSize}`}>
                                                        <Image
                                                            src={item.iconSrc}
                                                            alt={item.iconAlt}
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                </motion.div>
                                                <h3 className="text-[#a6ff48] font-bold text-xl mb-4 font-display min-h-[62px] flex items-center justify-center">
                                                    {item.title}
                                                </h3>
                                                <p className="text-white/90 text-base leading-relaxed flex-1">
                                                    {item.description}
                                                </p>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
