"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ScoreGaugeProps {
  score: number;
}

export function ScoreGauge({ score }: ScoreGaugeProps) {
  const getScoreColor = (score: number) => {
    if (score >= 70) return { color: "text-green-500", bg: "bg-green-500" };
    if (score >= 40) return { color: "text-yellow-500", bg: "bg-yellow-500" };
    return { color: "text-red-500", bg: "bg-red-500" };
  };

  const getScoreIcon = (score: number) => {
    if (score >= 70) return <TrendingUp className="w-6 h-6" />;
    if (score >= 40) return <Minus className="w-6 h-6" />;
    return <TrendingDown className="w-6 h-6" />;
  };

  const { color, bg } = getScoreColor(score);
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-card border border-border rounded-2xl p-8 glow-effect">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 mb-6">
          <h3 className="text-xl font-bold">ATS Match Score</h3>
          <div className={`${color}`}>
            {getScoreIcon(score)}
          </div>
        </div>
        
        {/* Circular Gauge */}
        <div className="relative w-48 h-48 mb-6">
          <svg className="transform -rotate-90 w-48 h-48">
            {/* Background circle */}
            <circle
              cx="96"
              cy="96"
              r="90"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-muted/20"
            />
            {/* Progress circle with glow */}
            <motion.circle
              cx="96"
              cy="96"
              r="90"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              className={bg}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeDasharray={circumference}
            />
          </svg>
          
          {/* Score Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className={`text-6xl font-bold ${color}`}
            >
              {score}
            </motion.div>
            <div className="text-sm text-muted-foreground">out of 100</div>
          </div>
        </div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`mt-6 flex items-center gap-2 px-4 py-2 rounded-full ${color} bg-opacity-10`}
        >
          {getScoreIcon(score)}
          <span className="font-semibold">
            {score >= 70 ? "Strong Match" : score >= 40 ? "Moderate Match" : "Weak Match"}
          </span>
        </motion.div>

        {/* Confidence Badge */}
        <div className="mt-4 text-sm text-muted-foreground">
          Confidence: <span className="font-semibold text-foreground">High (0.89)</span>
        </div>
      </div>
    </div>
  );
}
