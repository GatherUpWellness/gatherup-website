'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp, imageLoad, staggerContainer } from '@/utils/animations';

export const ResidentialHero: React.FC = () => {
    return (
        <section className="relative bg-[#053d3d] text-white  overflow-hidden min-h-[500px] md:min-h-[500px] flex items-end">
            {/* Background Image */}
            <motion.div
                className="absolute inset-0 z-0 h-[500px]"
                variants={imageLoad}
                initial="hidden"
                animate="visible"
            >
                <Image
                    src="/assets/images/IMG_1221.JPG"
                    alt="Residential Property"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0"></div>
            </motion.div>

            <div className="mt-60 container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
                <motion.div
                    className="bg-[#053d3d] text-center w-[90%] mx-auto pt-10 pb-20"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p
                        variants={fadeInUp}
                        className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#a6ff48] leading-tight"
                    >
                        Residential & Mixed-Use<br />
                        Communities
                    </motion.p>
                    <motion.div
                        variants={fadeInUp}
                        className="h-0.5 w-[70%] bg-[#a6ff48] mx-auto mt-10 -mb-20"
                    ></motion.div>
                </motion.div>
            </div>
        </section>
    );
};
