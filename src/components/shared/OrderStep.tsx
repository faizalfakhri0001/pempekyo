
import React from 'react';

interface OrderStepProps {
  stepNumber: string;
  title: string;
  description: string;
}

const OrderStep: React.FC<OrderStepProps> = ({ stepNumber, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 text-white text-2xl font-bold mb-4">
        {stepNumber}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default OrderStep;
