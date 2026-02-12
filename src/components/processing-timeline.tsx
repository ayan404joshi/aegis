"use client";

import { Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface ProcessingTimelineProps {
  currentStep: number;
}

const steps = [
  "Structured Extraction",
  "Embedding Computation",
  "Reasoning Engine",
  "Optimization Agent",
];

export function ProcessingTimeline({ currentStep }: ProcessingTimelineProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">Processing</h3>
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isComplete = index < currentStep;
          const isCurrent = index === currentStep;
          const isPending = index > currentStep;

          return (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                  isComplete
                    ? "bg-primary border-primary text-primary-foreground"
                    : isCurrent
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground"
                }`}
              >
                {isComplete ? (
                  <Check className="w-4 h-4" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
              <span
                className={`text-sm font-medium transition-colors ${
                  isComplete || isCurrent ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
