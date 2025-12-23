import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'accent';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    children,
    className = '',
    ...props
}) => {
    const baseStyles = "px-6 py-2.5 rounded-full font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 text-sm";

    const variants = {
        primary: "bg-[#a6ff48] text-[#053d3d] hover:bg-white shadow-md", // Bright green with dark text
        secondary: "bg-white text-[#053d3d] hover:bg-gray-100 shadow-md",
        outline: "border-2 border-white text-white hover:bg-white hover:text-[#053d3d]",
        accent: "bg-[#a6ff48] text-[#053d3d] hover:bg-white font-bold rounded-full"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
            {/* Add arrow icon for primary buttons usually, or just let children handle it if passed */}
            {(variant === 'primary' || variant === 'accent') && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            )}
        </button>
    );
};
