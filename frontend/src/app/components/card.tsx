// src/app/Card.tsx
import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`flex flex-col w-[33%] bg-white border border-gray-200 rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;
