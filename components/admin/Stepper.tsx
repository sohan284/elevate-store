"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("w-full py-6", className)}>
      <div className="relative flex justify-between">
        {/* Background Line */}
        <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-100 -z-10" />
        
        {/* Active Progress Line */}
        <div 
          className="absolute top-5 left-0 h-[2px] bg-primary transition-all duration-500 -z-10" 
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center group">
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-white shadow-sm",
                  isActive && "border-primary ring-4 ring-primary/10 scale-110",
                  isCompleted && "border-primary bg-primary text-white",
                  !isActive && !isCompleted && "border-gray-200 text-gray-400"
                )}
              >
                {isCompleted ? (
                  <Check size={18} strokeWidth={3} />
                ) : (
                  <span className={cn("text-sm font-black", isActive ? "text-primary" : "text-gray-400")}>
                    {step.id}
                  </span>
                )}
              </div>
              <div className="mt-4 text-center">
                <p className={cn(
                  "text-[12px] font-black uppercase tracking-widest",
                  isActive ? "text-gray-900" : "text-gray-400"
                )}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-[10px] font-bold text-gray-400/80 mt-0.5 hidden md:block italic">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
