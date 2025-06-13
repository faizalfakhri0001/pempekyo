/** @format */

"use client";
import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { PAYMENT_OPTIONS } from "../../constants/components";
import { PaymentOption, PaymentMethodType } from "../../types/components"; // Corrected import path
import { RiBankLine } from "react-icons/ri";

interface PaymentOptionsProps {
  selectedPayment: string | undefined;
  onPaymentSelect: (paymentId: string) => void;
}

const getPaymentIcon = (id: string) => {
  switch (id) {
    case "bca":
      return <RiBankLine className="h-6 w-12 mr-2" />;
    case "mandiri":
      return <RiBankLine className="h-6 w-16 mr-2" />;
    case "bni":
      return <RiBankLine className="h-6 w-10 mr-2" />;
    case "gopay":
      return <RiBankLine className="h-6 w-16 mr-2" />;
    // Add more cases for other icons
    default:
      return null;
  }
};

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  selectedPayment,
  onPaymentSelect,
}) => {
  const groupedPayments = PAYMENT_OPTIONS.reduce((acc, option) => {
    (acc[option.type] = acc[option.type] || []).push(option);
    return acc;
  }, {} as Record<PaymentMethodType, PaymentOption[]>);

  return (
    <RadioGroup
      value={selectedPayment}
      onValueChange={onPaymentSelect}
      className="space-y-6"
    >
      {Object.entries(groupedPayments).map(([type, options]) => (
        <div key={type as PaymentMethodType}>
          {" "}
          {/* Added type assertion for key */}
          <h3 className="text-lg font-semibold mb-3 text-gray-800">{type}</h3>
          <div className="space-y-3">
            {options.map((option) => (
              <Label
                key={option.id}
                htmlFor={option.id}
                className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors data-[state=checked]:border-gray-800 data-[state=checked]:bg-gray-50"
              >
                <RadioGroupItem
                  value={option.id}
                  id={option.id}
                  className="mr-3"
                />
                {getPaymentIcon(option.id)}
                <span className="font-medium text-gray-700">{option.name}</span>
              </Label>
            ))}
          </div>
        </div>
      ))}
    </RadioGroup>
  );
};

export default PaymentOptions;
