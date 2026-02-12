"use client";

import { AlertTriangle } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <div className="bg-muted/30 border border-border rounded-2xl p-8">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
        <h3 className="text-xl font-bold mb-3">Legal Disclaimer</h3>
        <p className="text-muted-foreground leading-relaxed">
          This analysis is generated using <strong>probabilistic LLM-based inference</strong> and
          does not represent actual ATS system output. AEGIS does not have access to proprietary
          ATS algorithms or hiring decisions. All insights are AI-generated interpretations based
          on semantic analysis, keyword matching, and industry patterns. Use recommendations as
          guidance to improve your resume, not as definitive rejection causes.
        </p>
        <div className="mt-4 text-sm text-muted-foreground">
          Confidence scores indicate the AI&apos;s certainty level in its analysis.
        </div>
      </div>
    </div>
  );
}
