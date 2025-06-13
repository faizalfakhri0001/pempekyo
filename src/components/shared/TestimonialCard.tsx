/** @format */

import React from "react";
import Image from "next/image";
import { Testimonial } from "../../types/components";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { StarIcon } from "lucide-react";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <Card className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center h-full">
      <CardHeader className="w-full flex flex-col items-center">
        {testimonial.imageUrl && (
          <div className="relative size-20 rounded-full overflow-clip">
            <Image src={testimonial.imageUrl} alt={testimonial.name} fill />
          </div>
        )}
        <CardTitle className="text-xl font-semibold text-gray-800">
          {testimonial.name}
        </CardTitle>
        <p className="text-sm text-gray-500">{testimonial.role}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex justify-center my-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon
              key={index}
              className={`h-5 w-5 ${
                index < testimonial.rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="text-gray-600 italic leading-relaxed">
          {`"${testimonial.comment}"`}
        </p>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
