'use client';

import React, { useState } from 'react';

interface ExpandableTextProps {
  text: string;
  maxLength?: number;
  className?: string;
  readMoreText?: string;
  readLessText?: string;
}

export const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  maxLength = 150,
  className = '',
  readMoreText = 'Read more',
  readLessText = 'Read less',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > maxLength;

  if (!shouldTruncate) {
    return <p className={className}>{text}</p>;
  }

  const truncatedText = text.slice(0, maxLength).trim() + '...';
  const displayText = isExpanded ? text : truncatedText;

  return (
    <div className={className}>
      <p className="leading-relaxed transition-all duration-400 ease-out">
        {displayText}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 text-[#a6ff48] hover:text-white font-semibold text-sm transition-colors duration-200 underline"
        aria-expanded={isExpanded}
        aria-label={isExpanded ? readLessText : readMoreText}
      >
        {isExpanded ? readLessText : readMoreText}
      </button>
    </div>
  );
};
