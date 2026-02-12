"use client";

import { motion } from "framer-motion";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";

interface RejectionReason {
  category: string;
  explanation: string;
  confidence_score: number;
  severity: "high" | "medium" | "low";
}

interface RejectionReasonCardsProps {
  reasons: RejectionReason[];
}

export function RejectionReasonCards({ reasons }: RejectionReasonCardsProps) {
  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case "high":
        return {
          icon: <AlertCircle className="w-5 h-5" />,
          color: "text-red-500",
          bg: "bg-red-500/10",
          border: "border-red-500/20",
        };
      case "medium":
        return {
          icon: <AlertTriangle className="w-5 h-5" />,
          color: "text-yellow-500",
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/20",
        };
      default:
        return {
          icon: <Info className="w-5 h-5" />,
          color: "text-blue-500",
          bg: "bg-blue-500/10",
          border: "border-blue-500/20",
        };
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Potential Rejection Reasons</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {reasons.map((reason, index) => {
          const config = getSeverityConfig(reason.severity);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-card border ${config.border} rounded-2xl p-6 hover:shadow-lg transition-shadow`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`${config.bg} ${config.color} p-2 rounded-lg`}>
                    {config.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{reason.category}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">Confidence:</span>
                      <span className="text-sm font-semibold">
                        {(reason.confidence_score * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${config.bg} ${config.color}`}
                >
                  {reason.severity.toUpperCase()}
                </span>
              </div>

              {/* Explanation */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {reason.explanation}
              </p>

              {/* Confidence Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Confidence Score</span>
                  <span>{reason.confidence_score.toFixed(2)}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${reason.confidence_score * 100}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    className={`h-full ${config.color.replace("text-", "bg-")}`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
