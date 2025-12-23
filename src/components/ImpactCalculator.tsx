'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export const ImpactCalculator: React.FC = () => {
    // Color constants - easy to modify
    const colors = {
        primary: '#053D3D',      // Dark Teal
        secondary: '#A6FF48',    // Fresh Green
        tertiary: '#E0F2CC',     // Soft Green
        background: '#F5F5F5',   // Light grey for input/output boxes
        text: '#053D3D',         // Dark Teal for text
        textLight: '#666666',    // Light grey for helper text
    };

    const [totalUnits, setTotalUnits] = useState<number>(200);
    const [rentPremium, setRentPremium] = useState<number>(200);
    const [estimatedUsage, setEstimatedUsage] = useState<number>(7); // 6-8 range

    // Calculate Annual Rent Uplift (Elite)
    const annualRentUplift = Math.max(0, totalUnits * rentPremium * 12);

    // Calculate Active Users / Mo. based on usage slider
    // For every 10 units, the slider represents 6-8 users
    const activeUsersPerMonth = Math.max(0, Math.round((totalUnits / 10) * estimatedUsage));

    const handleUnitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setTotalUnits(Math.max(1, value)); // Ensure minimum value of 1
    };

    const handleRentPremiumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setRentPremium(value);
    };

    const handleUsageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setEstimatedUsage(value);
    };

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    // Table data
    const tableData = [
        {
            amenityType: 'Basic Gym (Unstaffed)',
            monthlyUsage: '10-15%',
            retentionLift: '+0-3%',
            rentPremium: '$0-$25/unit/month',
            annualNOI: '$20K-$40K',
            isElite: false,
        },
        {
            amenityType: 'Pool (Seasonal)',
            monthlyUsage: '15-25% (summer only)',
            retentionLift: '+2-5%',
            rentPremium: '$0-$15/unit/month',
            annualNOI: '$30K-$50K',
            isElite: false,
        },
        {
            amenityType: 'Co-Working Space',
            monthlyUsage: '20-35%',
            retentionLift: '+3-5%',
            rentPremium: '$0-$25/unit/month',
            annualNOI: '$30K-$60K',
            isElite: false,
        },
        {
            amenityType: 'Pet Spa / Dog Park',
            monthlyUsage: '25-40%',
            retentionLift: '+5-8%',
            rentPremium: '$10-$20/unit/month',
            annualNOI: '$20K-$40K',
            isElite: false,
        },
        {
            amenityType: 'Gather Up Wellness',
            monthlyUsage: '60-80% of residents',
            retentionLift: '+20-25% renewal rate',
            rentPremium: '+$100-$300/unit/month',
            annualNOI: '$350K-$500K',
            isElite: true,
        }
    ];

    return (
        <section className="py-12 md:py-16 bg-[#F5FAF5]">
            <div className="px-2 md:px-4 container mx-auto px-4 md:px-8 max-w-7xl">
                {/* Comparison Table Section */}
                <div className="mb-12 md:mb-16">
                    {/* Header */}
                    <div
                        className="px-6 md:px-8 py-4 md:py-6 rounded-t-lg"
                        style={{ backgroundColor: colors.tertiary }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-[#053D3D] mb-1">
                            Gather Up Wellness vs Other Amenities
                        </h2>
                        <p className="text-sm md:text-base text-[#053D3D]/90">
                            (example: 200‑unit luxury property)
                        </p>
                    </div>

                    {/* Table Container */}
                    <div
                        className="rounded-b-lg border-t-2 border-color-[#053D3D]/80 overflow-hidden">
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-[#053D3D]" style={{ backgroundColor: colors.tertiary }}>
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-left text-sm md:text-base font-bold">
                                            Amenity Type
                                        </th>
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-center text-sm md:text-base font-bold">
                                            Monthly Usage
                                        </th>
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-center text-sm md:text-base font-bold">
                                            Retention Lift
                                        </th>
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-center text-sm md:text-base font-bold">
                                            Rent Premium
                                        </th>
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-center text-sm md:text-base font-bold">
                                            Annual NOI Impact
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((row, index) => (
                                        <tr
                                            key={index}
                                            style={{
                                                backgroundColor: index % 2 === 0 ? '#FFFFFF' : colors.background,
                                            }}
                                        >
                                            <td className="px-4 md:px-6 py-3 md:py-4 text-sm md:text-base"
                                                style={{
                                                    color: row.isElite ? colors.secondary : colors.text,
                                                    backgroundColor: row.isElite ? colors.primary : 'transparent',
                                                    fontWeight: row.isElite ? 'bold' : 'normal',
                                                    ...(row.isElite && {
                                                        minWidth: '200px',
                                                        width: 'auto',
                                                    }),
                                                }}>
                                                {row.isElite ? (
                                                    <div className="relative w-full h-[30px] md:h-[40px] flex items-center">
                                                        <Image
                                                            src="/assets/GatherUp-Lockups/PNG/Lockups_Full Logo_Fresh Green Transparent Background.png"
                                                            alt="Gather Up Wellness"
                                                            fill
                                                            className="object-contain object-left"
                                                            sizes="(max-width: 768px) 150px, 200px"
                                                            priority
                                                        />
                                                    </div>
                                                ) : (
                                                    row.amenityType
                                                )}
                                            </td>
                                            <td className="px-4 md:px-6 py-3 md:py-4 text-center text-sm md:text-base"
                                                style={{
                                                    color: row.isElite ? colors.secondary : colors.text,
                                                    backgroundColor: row.isElite ? colors.primary : 'transparent'
                                                }}>
                                                {row.monthlyUsage}
                                            </td>
                                            <td
                                                className="px-4 md:px-6 py-3 md:py-4 text-center text-sm md:text-base" style={{
                                                    color: row.isElite ? colors.secondary : colors.text,
                                                    backgroundColor: row.isElite ? colors.primary : 'transparent'
                                                }}>
                                                {row.retentionLift}
                                            </td>
                                            <td className="px-4 md:px-6 py-3 md:py-4 text-center text-sm md:text-base" style={{
                                                color: row.isElite ? colors.secondary : colors.text,
                                                backgroundColor: row.isElite ? colors.primary : 'transparent'
                                            }}>
                                                {row.rentPremium}
                                            </td>
                                            <td className="px-4 md:px-6 py-3 md:py-4 text-center text-sm md:text-base" style={{
                                                color: row.isElite ? colors.secondary : colors.text,
                                                backgroundColor: row.isElite ? colors.primary : 'transparent'
                                            }}>
                                                {row.annualNOI}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="px-2 md:px-4 md:hidden">
                            {tableData.map((row, index) => (
                                <div
                                    key={index}
                                    className="border-b-2 p-4"
                                    style={{
                                        backgroundColor: row.isElite ? '#053D3D' : (index % 2 === 0 ? '#FFFFFF' : colors.background),
                                        borderColor: colors.tertiary,
                                    }}
                                >
                                    <div className="mb-3">
                                        {row.isElite ? (
                                            <div className="relative w-full h-[60px] flex items-center">
                                                <Image
                                                    src="/assets/GatherUp-Lockups/PNG/Lockups_Full Logo_Brand Colours.png"
                                                    alt="Gather Up Wellness"
                                                    fill
                                                    className="object-contain object-left"
                                                    sizes="150px"
                                                />
                                            </div>
                                        ) : (
                                            <h3 className="font-bold text-base" style={{ color: colors.text }}>
                                                {row.amenityType}
                                            </h3>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                        <div className="flex flex-col">
                                            <span className="font-semibold" style={{ color: row.isElite ? '#A6FF48' : colors.textLight }}>Monthly Usage: </span>
                                            <span style={{ color: row.isElite ? '#A6FF48' : colors.text }}>{row.monthlyUsage}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold" style={{ color: row.isElite ? '#A6FF48' : colors.textLight }}>Retention Lift: </span>
                                            <span style={{ color: row.isElite ? '#A6FF48' : colors.text }}>{row.retentionLift}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold" style={{ color: row.isElite ? '#A6FF48' : colors.textLight }}>Rent Premium: </span>
                                            <span style={{ color: row.isElite ? '#A6FF48' : colors.text }}>{row.rentPremium}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold" style={{ color: row.isElite ? '#A6FF48' : colors.textLight }}>Annual NOI: </span>
                                            <span style={{ color: row.isElite ? '#A6FF48' : colors.text }}>{row.annualNOI}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Calculator Section - Inputs and Outputs aligned vertically on desktop */}
                <div className="px-2 md:px-4 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 md:items-stretch">
                    {/* Column 1: Total Units + Annual Rent Uplift */}
                    <div className="flex flex-col gap-4 md:gap-6 h-full">
                        {/* Total Units Input */}
                        <div className="md:min-h-[89px] flex flex-col justify-start">
                            <label
                                htmlFor="total-units"
                                className="block text-sm font-semibold mb-2"
                                style={{ color: colors.text }}
                            >
                                Total Units
                            </label>
                            <input
                                id="total-units"
                                type="number"
                                value={totalUnits}
                                onChange={handleUnitsChange}
                                min="1"
                                className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2"
                                style={{
                                    backgroundColor: colors.background,
                                    borderColor: colors.tertiary,
                                    color: colors.text,
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = colors.secondary;
                                    e.target.style.boxShadow = `0 0 0 3px ${colors.tertiary}`;
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = colors.tertiary;
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>
                        {/* Annual Rent Uplift Output */}
                        <div
                            className="p-6 rounded-lg md:h-full md:min-h-[194px] flex flex-col justify-between"
                            style={{ backgroundColor: colors.background }}
                        >
                            <div className="flex-1">
                                <h3
                                    className="text-base font-semibold mb-2 break-words"
                                    style={{ color: colors.text }}
                                >
                                    Annual Rent Uplift (Gather Up)
                                </h3>
                                <div
                                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 break-words overflow-wrap-anywhere"
                                    style={{ color: colors.text }}
                                >
                                    {formatCurrency(annualRentUplift)}
                                </div>
                            </div>
                            <p
                                className="text-sm break-words"
                                style={{ color: colors.textLight }}
                            >
                                units × premium × 12
                            </p>
                        </div>
                    </div>

                    {/* Column 2: Rent Premium + Active Users */}
                    <div className="flex flex-col gap-4 md:gap-6 h-full">
                        {/* Rent Premium Slider Input */}
                        <div className="md:h-[89px] flex flex-col justify-center">
                            <label
                                htmlFor="rent-premium"
                                className="block text-sm font-semibold mb-2 break-words"
                                style={{ color: colors.text }}
                            >
                                Choose Rent Premium ($/unit/mo)
                            </label>
                            <div className="relative">
                                <input
                                    id="rent-premium"
                                    type="range"
                                    min="100"
                                    max="300"
                                    value={rentPremium}
                                    onChange={handleRentPremiumChange}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
                                    style={{
                                        background: `linear-gradient(to right, ${colors.primary} 0%, ${colors.primary} ${((rentPremium - 100) / (300 - 100)) * 100}%, ${colors.background} ${((rentPremium - 100) / (300 - 100)) * 100}%, ${colors.background} 100%)`,
                                    }}
                                />
                                <div className="flex justify-between text-xs mt-1" style={{ color: colors.textLight }}>
                                    <span>$100</span>
                                    <span className="font-semibold" style={{ color: colors.primary }}>
                                        {formatCurrency(rentPremium)}
                                    </span>
                                    <span>$300</span>
                                </div>
                                <div className="h-4"></div>
                            </div>
                        </div>
                        {/* Active Users Output */}
                        <div
                            className="p-6 rounded-lg md:h-full md:min-h-[194px] flex flex-col justify-between"
                            style={{ backgroundColor: colors.background }}
                        >
                            <div className="flex-1">
                                <h3
                                    className="text-base font-semibold mb-2 break-words"
                                    style={{ color: colors.text }}
                                >
                                    Active Users / Mo.
                                </h3>
                                <div
                                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 break-words overflow-wrap-anywhere"
                                    style={{ color: colors.text }}
                                >
                                    {activeUsersPerMonth}
                                </div>
                            </div>
                            <p
                                className="text-sm break-words"
                                style={{ color: colors.textLight }}
                            >
                                based on usage slider
                            </p>
                        </div>
                    </div>

                    {/* Column 3: Estimated Usage + Why It Wins */}
                    <div className="flex flex-col gap-4 md:gap-6 h-full">
                        {/* Estimated Usage Slider Input */}
                        <div className="md:h-[89px] flex flex-col justify-center">
                            <label
                                htmlFor="estimated-usage"
                                className="block text-sm font-semibold mb-2 break-words"
                                style={{ color: colors.text }}
                            >
                                Estimated Usage
                            </label>
                            <div className="relative">
                                <input
                                    id="estimated-usage"
                                    type="range"
                                    min="6"
                                    max="8"
                                    step="0.1"
                                    value={estimatedUsage}
                                    onChange={handleUsageChange}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
                                    style={{
                                        background: `linear-gradient(to right, ${colors.primary} 0%, ${colors.primary} ${((estimatedUsage - 6) / (8 - 6)) * 100}%, ${colors.background} ${((estimatedUsage - 6) / (8 - 6)) * 100}%, ${colors.background} 100%)`,
                                    }}
                                />
                                <div className="flex justify-between text-xs mt-1" style={{ color: colors.textLight }}>
                                    <span>6 users</span>
                                    <span className="font-semibold" style={{ color: colors.primary }}>
                                        {estimatedUsage.toFixed(1)} users
                                    </span>
                                    <span>8 users</span>
                                </div>
                                <p className="text-xs mt-1" style={{ color: colors.textLight }}>
                                    per 10 units
                                </p>
                            </div>
                        </div>
                        {/* Why It Wins Output */}
                        <div
                            className="p-6 rounded-lg md:h-full md:min-h-[194px] flex flex-col justify-between"
                            style={{ backgroundColor: colors.background }}
                        >
                            <div className="flex-1">
                                <h3
                                    className="text-base font-semibold mb-2 break-words"
                                    style={{ color: colors.text }}
                                >
                                    Why It Wins
                                </h3>
                                <div
                                    className="text-base md:text-lg lg:text-xl font-bold mb-2 break-words"
                                    style={{ color: colors.primary }}
                                >
                                    Highest engagement & retention
                                </div>
                            </div>
                            <p
                                className="text-sm break-words"
                                style={{ color: colors.textLight }}
                            >
                                +20-25% renewal lift vs 0-8% others
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
