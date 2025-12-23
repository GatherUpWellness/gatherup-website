'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { scrollReveal } from '@/utils/animations';

export const ScrollingLogos: React.FC = () => {
    const partners = [
        { name: "Amazon", logo: "/assets/images/logos/amazon.png" },
        { name: "CBRE", logo: "/assets/images/logos/cbre.png" },
        { name: "Cox", logo: "/assets/images/logos/cox.png" },
        { name: "Life Time", logo: "/assets/images/logos/lifetime.png" }
    ];

    // Duplicate the array multiple times for seamless scrolling
    const duplicatedPartners = [...partners, ...partners, ...partners, ...partners, ...partners, ...partners, ...partners, ...partners, ...partners, ...partners];

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <motion.div
            ref={sectionRef}
            className="bg-[#f8fcfc] py-6 md:py-8 overflow-x-hidden relative"
            variants={scrollReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <div className="flex w-max animate-scroll">
                {duplicatedPartners.map((partner, index) => (
                    <div key={index} className="flex-shrink-0 mx-0 md:mx-1 lg:mx-0">
                        <div className={`relative scale-120 w-64 h-32 sm:w-40 sm:h-20 md:w-96 md:h-48 lg:w-56 lg:h-28 ${partner.name === "Amazon" ? "mt-[5px]" : ""}`}>
                            <Image
                                src={partner.logo}
                                alt={partner.name}
                                fill
                                className="object-contain opacity-100 hover:opacity-100 transition-all duration-300"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
