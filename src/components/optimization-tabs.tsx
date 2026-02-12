"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, FileText, GraduationCap, Copy, Check, TrendingUp } from "lucide-react";

interface OptimizationTabsProps {
  recommendations: Array<{
    title: string;
    description: string;
    impact: "high" | "medium" | "low";
    roi_score: number;
  }>;
  rewriteSuggestions: {
    original: string;
    optimized: string;
    changes: Array<{
      type: "added" | "removed" | "modified";
      text: string;
    }>;
  };
  upskillingSuggestions: Array<{
    category: string;
    items: string[];
  }>;
}

export function OptimizationTabs({
  recommendations,
  rewriteSuggestions,
  upskillingSuggestions,
}: OptimizationTabsProps) {
  const [activeTab, setActiveTab] = useState<"fixes" | "rewrite" | "upskill">("fixes");
  const [copiedOriginal, setCopiedOriginal] = useState(false);
  const [copiedOptimized, setCopiedOptimized] = useState(false);

  const tabs = [
    { id: "fixes", label: "High Impact Fixes", icon: Sparkles },
    { id: "rewrite", label: "Resume Rewrite", icon: FileText },
    { id: "upskill", label: "Upskilling Path", icon: GraduationCap },
  ];

  const handleCopy = (text: string, type: "original" | "optimized") => {
    navigator.clipboard.writeText(text);
    if (type === "original") {
      setCopiedOriginal(true);
      setTimeout(() => setCopiedOriginal(false), 2000);
    } else {
      setCopiedOptimized(true);
      setTimeout(() => setCopiedOptimized(false), 2000);
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-green-500 bg-green-500/10 border-green-500/20";
      case "medium":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      default:
        return "text-blue-500 bg-blue-500/10 border-blue-500/20";
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Optimization Recommendations</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors relative whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "fixes" && (
          <motion.div
            key="fixes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {recommendations
              .sort((a, b) => b.roi_score - a.roi_score)
              .map((rec, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{rec.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {rec.description}
                      </p>
                    </div>
                    <div className="ml-4 flex flex-col items-end gap-2">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full border ${getImpactColor(
                          rec.impact
                        )}`}
                      >
                        {rec.impact.toUpperCase()} IMPACT
                      </span>
                      <div className="flex items-center gap-1 text-sm">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="font-semibold">
                          {(rec.roi_score * 100).toFixed(0)}% ROI
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ROI Progress Bar */}
                  <div className="mt-4">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${rec.roi_score * 100}%` }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                </div>
              ))}
          </motion.div>
        )}

        {activeTab === "rewrite" && (
          <motion.div
            key="rewrite"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Original */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">Original</h3>
                    <button
                      onClick={() => handleCopy(rewriteSuggestions.original, "original")}
                      className="p-2 hover:bg-accent rounded-lg transition-colors"
                    >
                      {copiedOriginal ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="bg-muted/30 border border-border rounded-xl p-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {rewriteSuggestions.original}
                    </p>
                  </div>
                </div>

                {/* Optimized */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      Optimized
                      <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded-full">
                        +{rewriteSuggestions.changes.length} changes
                      </span>
                    </h3>
                    <button
                      onClick={() => handleCopy(rewriteSuggestions.optimized, "optimized")}
                      className="p-2 hover:bg-accent rounded-lg transition-colors"
                    >
                      {copiedOptimized ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
                    <p className="text-sm leading-relaxed">{rewriteSuggestions.optimized}</p>
                  </div>
                </div>
              </div>

              {/* Changes Highlight */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-sm font-semibold mb-3">Key Changes</h4>
                <div className="flex flex-wrap gap-2">
                  {rewriteSuggestions.changes.map((change, index) => (
                    <span
                      key={index}
                      className={`text-xs px-3 py-1 rounded-full ${
                        change.type === "added"
                          ? "bg-green-500/10 text-green-500 border border-green-500/20"
                          : change.type === "removed"
                          ? "bg-red-500/10 text-red-500 border border-red-500/20"
                          : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                      }`}
                    >
                      {change.type === "added" && "+ "}
                      {change.type === "removed" && "- "}
                      {change.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "upskill" && (
          <motion.div
            key="upskill"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {upskillingSuggestions.map((category, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors"
              >
                <h3 className="text-lg font-semibold mb-4">{category.category}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
