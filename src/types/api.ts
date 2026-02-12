// API Response Types
export interface AnalysisRequest {
  resume_text: string;
  job_description: string;
}

export interface RejectionReason {
  category: string;
  explanation: string;
  confidence_score: number;
  severity: "high" | "medium" | "low";
}

export interface OptimizationRecommendation {
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  roi_score: number;
}

export interface RewriteSuggestion {
  original: string;
  optimized: string;
  changes: Array<{
    type: "added" | "removed" | "modified";
    text: string;
  }>;
}

export interface UpskillingSuggestion {
  category: string;
  items: string[];
}

export interface AnalysisResponse {
  ats_score: number;
  semantic_alignment_score: number;
  skill_gap_score: number;
  experience_alignment_score: number;
  formatting_risk_score: number;
  rejection_reasons: RejectionReason[];
  optimization_recommendations: OptimizationRecommendation[];
  resume_rewrite_suggestions: RewriteSuggestion;
  upskilling_suggestions: UpskillingSuggestion[];
}

export interface ApiError {
  error: string;
  message: string;
  code: string;
}
