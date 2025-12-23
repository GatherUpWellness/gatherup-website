'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { scrollReveal, imageLoad } from '@/utils/animations';

interface TestimonialItem {
    quote: string;
    author: string;
    authorTitle: string;
    image?: string;
}

interface TestimonialProps {
    title?: string;
    testimonials?: TestimonialItem[];
    autoPlayInterval?: number;
    // Legacy props for backward compatibility
    quote?: string;
    author?: string;
    authorTitle?: string;
}

export const Testimonial: React.FC<TestimonialProps> = ({
    title = "What Our Clients Say",
    testimonials,
    autoPlayInterval = 2500,
    // Legacy props
    quote,
    author,
    authorTitle
}) => {
    const defaultItems: TestimonialItem[] = [
        {
            quote: "We used to treat our amenity floor like a line item. GatherUp turned it into something our tenants actually talk about in their recruiting and retention meetings. When renewals came up this year, we heard far fewer questions about ‘what else are we getting for this rent.’",
            author: "Sarah M.",
            authorTitle: "Senior Property Manager, 1.1M SF Office Portfolio",
        },
        {
            quote: "Before GatherUp, our amenities looked great in photos but felt empty in real life. Now, residents actually plan their week around what’s happening in the building. We’ve seen fewer “I’m just shopping around” responses at renewal and more people saying, “We don’t want to lose this community.”",
            author: "Elena R.",
            authorTitle: "Regional Manager, 900-Unit Urban Portfolio",
        },
        {
            quote: "The impact was immediate. Our tenants started using the amenity spaces we invested in, and the feedback during lease renewals completely changed. GatherUp made wellness a competitive advantage for our property.",
            author: "Jennifer L.",
            authorTitle: "VP Operations, Commercial Real Estate",
        },
    ];

    const items: TestimonialItem[] =
        testimonials ||
        (quote && author && authorTitle
            ? [
                {
                    quote,
                    author,
                    authorTitle,
                },
            ]
            : defaultItems);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(true);

    // Duplicate items for infinite scroll
    const duplicatedItems = [...items, ...items];

    const pauseAndResumeAutoplay = useCallback(() => {
        // Pause on interaction and resume after the configured interval
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), autoPlayInterval);
    }, [autoPlayInterval]);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            // When we reach the duplicate first item (items.length), show it seamlessly
            if (nextIndex === items.length) {
                // After transition completes, reset to 0 without animation
                setTimeout(() => {
                    setIsTransitioning(false);
                    setCurrentIndex(0);
                    setTimeout(() => setIsTransitioning(true), 50);
                }, 1000);
                return items.length; // Show duplicate first item (seamless from last original)
            }
            // Normal progression
            if (nextIndex < items.length) {
                return nextIndex;
            }
            // Shouldn't reach here, but safety fallback
            return prevIndex;
        });
        pauseAndResumeAutoplay();
    }, [items.length, pauseAndResumeAutoplay]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex === 0) {
                // Jump to duplicate last item (without animation)
                setIsTransitioning(false);
                const newIndex = items.length * 2 - 1;
                setTimeout(() => {
                    setCurrentIndex(newIndex);
                    setTimeout(() => setIsTransitioning(true), 50);
                }, 50);
                return newIndex;
            }
            return prevIndex - 1;
        });
        pauseAndResumeAutoplay();
    }, [items.length, pauseAndResumeAutoplay]);

    const goToSlide = (index: number) => {
        // Ensure we're using the original items index (not duplicated)
        setCurrentIndex(index);
        pauseAndResumeAutoplay();
    };

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying || items.length <= 1) return;

        const interval = setInterval(nextSlide, autoPlayInterval);
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide, autoPlayInterval, items.length]);

    // Pause auto-play on hover
    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    if (items.length === 0) return null;

    return (
        <motion.section
            ref={sectionRef}
            className="relative py-16 md:py-20 overflow-hidden min-h-[600px] w-full"
            style={{
                backgroundColor: '#f8fcfc',
                isolation: 'isolate',
                position: 'relative'
            }}
            variants={scrollReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {/* Background wrapper to ensure color is visible */}
            <div
                className="absolute inset-0 w-full"
                style={{
                    backgroundColor: '#f8fcfc',
                    zIndex: 0
                }}
            ></div>

            {/* Split background: top half color, bottom half image */}
            <div className="absolute inset-0 w-full" style={{ zIndex: 1, pointerEvents: 'none' }}>
                {/* Top half - background color overlay to ensure visibility */}
                <div
                    className="absolute inset-x-0 top-0 h-1/2 w-full"
                    style={{
                        backgroundColor: '#F5FAF5',
                        zIndex: 1
                    }}
                ></div>
                {/* Bottom half - background image using Next.js Image */}
                <motion.div
                    className="absolute inset-x-0 bottom-0 h-1/2 w-full overflow-hidden"
                    style={{ zIndex: 1 }}
                    variants={imageLoad}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <Image
                        src="/assets/images/IMG_1221.JPG"
                        alt="Background"
                        fill
                        className="object-cover"
                        style={{
                            objectPosition: 'bottom center',
                            objectFit: 'cover'
                        }}
                        priority
                        sizes="100vw"
                    />
                </motion.div>
            </div>

            <div className="container mx-auto px-4 md:px-8 max-w-6xl relative -mt-16" style={{ zIndex: 10 }}>
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-[#053d3d] mb-6 md:mb-8 text-center"
                    variants={scrollReveal}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {title}
                </motion.h2>

                <div
                    className="relative -mt-4"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Main Carousel Card with smooth slide transition */}
                    <div className="bg-[#053d3d] rounded-lg shadow-xl overflow-hidden">
                        <div className="overflow-hidden">
                            <div
                                className={`flex ${isTransitioning ? 'transition-transform duration-1000 ease-in-out' : ''}`}
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                {duplicatedItems.map((testimonial, index) => (
                                    <div key={index} className="w-full shrink-0">
                                        <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12 lg:p-16">
                                            {/* Profile Image */}
                                            <div className="flex-shrink-0">
                                                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-white">
                                                    {testimonial.image ? (
                                                        <Image
                                                            src={testimonial.image}
                                                            alt={testimonial.author}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                            <span className="text-4xl text-gray-500">
                                                                {testimonial.author.charAt(0)}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 text-center md:text-left">
                                                <h3 className="text-2xl md:text-3xl font-bold text-[#a6ff48] mb-2">
                                                    {testimonial.author}
                                                </h3>
                                                <p className="text-[#a6ff48] text-lg mb-6">
                                                    {testimonial.authorTitle}
                                                </p>
                                                <blockquote className="text-white text-base md:text-xl leading-relaxed italic">
                                                    "{testimonial.quote}"
                                                </blockquote>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dot Indicators */}
                        {items.length > 1 && (
                            <div className="flex justify-center gap-2 pb-6">
                                {items.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${(currentIndex % items.length) === index
                                            ? 'bg-[#a6ff48] w-8'
                                            : 'bg-white/40 hover:bg-white/60'
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Navigation Arrows - simple inline chevrons on the card */}
                    {items.length > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-6 top-1/2 -translate-y-1/2 text-[#a6ff48] hover:text-white transition-colors duration-200 z-20"
                                aria-label="Previous testimonial"
                            >
                                <svg
                                    className="w-7 h-7"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute right-6 top-1/2 -translate-y-1/2 text-[#a6ff48] hover:text-white transition-colors duration-200 z-20"
                                aria-label="Next testimonial"
                            >
                                <svg
                                    className="w-7 h-7"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </motion.section>
    );
};

