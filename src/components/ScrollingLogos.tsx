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
        { name: "Life Time", logo: "/assets/images/logos/lifetime.png" },
        { name: "Cousins Properties", logo: "/assets/images/logos/cousins-properties-png.png" }
    ];

    // Duplicate the array multiple times for seamless scrolling
    const duplicatedPartners = [...partners, ...partners, ...partners, ...partners, ...partners, ...partners, ...partners, ...partners, ...partners, ...partners];

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <motion.div
            ref={sectionRef}
            className="bg-[#f8fcfc] py-4 overflow-x-hidden relative"
            variants={scrollReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <div className="flex w-max animate-scroll">
                {duplicatedPartners.map((partner, index) => (
                    <div key={index} className="flex-shrink-0 mx-0 md:mx-1 lg:mx-0">
                        <div className={`relative w-60 h-30 sm:w-40 sm:h-20 md:w-48 md:h-24 lg:w-56 lg:h-28 ${partner.name === "Amazon" ? "mt-[5px]" : ""} ${partner.name === "Cousins Properties" ? "flex items-center justify-center" : ""}`}>
                            <div className={partner.name === "Cousins Properties" ? "relative w-[56%] h-[56%]" : "absolute inset-0"}>
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    fill
                                    className="object-contain opacity-100 hover:opacity-100 transition-all duration-300"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

//SVG Code
// 'use client';

// import React, { useRef } from 'react';
// import { motion, useInView } from 'framer-motion';
// import Image from 'next/image';
// import { scrollReveal } from '@/utils/animations';

// export const ScrollingLogos: React.FC = () => {
//     const partners = [
//         { name: "Amazon", logo: "/assets/images/logos/amazon-svg.svg" },
//         { name: "CBRE", logo: "/assets/images/logos/cbre-svg.svg" },
//         { name: "Cox", logo: "/assets/images/logos/cox-svg.svg" },
//         { name: "Life Time", logo: "/assets/images/logos/lifetime-fitness-svg.svg" },
//         { name: "Cousins Properties", logo: "/assets/images/logos/cousins-properties-svg.svg" }
//     ];

//     // Duplicate the array multiple times for seamless scrolling
//     const duplicatedPartners = [...partners, ...partners, ...partners, ...partners, ...partners, ...partners, ...partners, ...partners, ...partners, ...partners];

//     const sectionRef = useRef(null);
//     const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

//     return (
//         <motion.div
//             ref={sectionRef}
//             className="bg-[#f8fcfc] py-6 md:py-8 overflow-x-hidden relative"
//             variants={scrollReveal}
//             initial="hidden"
//             animate={isInView ? "visible" : "hidden"}
//         >
//             <div className="flex w-max animate-scroll items-center">
//                 {duplicatedPartners.map((partner, index) => (
//                     <div key={index} className="flex-shrink-0 py-2 px-4 sm:px-6 md:px-8 lg:px-10">
//                         <div className="relative w-32 h-16 sm:w-40 sm:h-20 md:w-40 md:h-20 lg:w-56 lg:h-28 flex items-center justify-center">
//                             {/* <div className="relative w-40 h-20 flex items-center justify-center"> */}
//                             <Image
//                                 src={partner.logo}
//                                 alt={partner.name}
//                                 fill
//                                 className="object-contain object-center"
//                                 sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
//                             />
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </motion.div >
//     );
// };