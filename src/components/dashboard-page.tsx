"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topbar";
import { AegisLogo } from "./aegis-logo";
import { UploadPanel } from "./upload-panel";
import { ProcessingTimeline } from "./processing-timeline";
import { ScoreGauge } from "./score-gauge";
import { BreakdownChart } from "./breakdown-chart";
import { RejectionReasonCards } from "./rejection-reason-cards";
import { OptimizationTabs } from "./optimization-tabs";
import { DisclaimerBanner } from "./disclaimer-banner";

export type AnalysisResult = {
  ats_score: number;
  semantic_alignment_score: number;
  skill_gap_score: number;
  experience_alignment_score: number;
  formatting_risk_score: number;
  rejection_reasons: Array<{
    category: string;
    explanation: string;
    confidence_score: number;
    severity: "high" | "medium" | "low";
  }>;
  optimization_recommendations: Array<{
    title: string;
    description: string;
    impact: "high" | "medium" | "low";
    roi_score: number;
  }>;
  resume_rewrite_suggestions: {
    original: string;
    optimized: string;
    changes: Array<{
      type: "added" | "removed" | "modified";
      text: string;
    }>;
  };
  upskilling_suggestions: Array<{
    category: string;
    items: string[];
  }>;
};

export function DashboardPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async (resumeText: string, jobDescription: string) => {
    setIsAnalyzing(true);
    setCurrentStep(0);
    setAnalysisResult(null);

    // Simulate API call with step progression
    const steps = [
      "Structured Extraction",
      "Embedding Computation",
      "Reasoning Engine",
      "Optimization Agent",
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    // Mock response - in production, this would be an API call
    const mockResult: AnalysisResult = {
      ats_score: 68,
      semantic_alignment_score: 72,
      skill_gap_score: 58,
      experience_alignment_score: 75,
      formatting_risk_score: 85,
      rejection_reasons: [
        {
          category: "Skill Gap",
          explanation: "The resume lacks specific mention of required technologies like React, Node.js, and PostgreSQL that are critical for this role.",
          confidence_score: 0.87,
          severity: "high",
        },
        {
          category: "Experience Depth",
          explanation: "While you have relevant experience, the JD requires 5+ years in senior roles. Your resume emphasizes mid-level accomplishments.",
          confidence_score: 0.72,
          severity: "medium",
        },
        {
          category: "Keyword Density",
          explanation: "Key terms from the JD appear infrequently. Terms like 'microservices', 'CI/CD', and 'cloud architecture' are underrepresented.",
          confidence_score: 0.81,
          severity: "high",
        },
        {
          category: "Seniority Misalignment",
          explanation: "The job requires leadership experience managing teams. Your resume focuses more on individual contributions.",
          confidence_score: 0.65,
          severity: "medium",
        },
      ],
      optimization_recommendations: [
        {
          title: "Add Technology Stack Section",
          description: "Create a dedicated 'Technical Skills' section highlighting React, Node.js, PostgreSQL, AWS, and other required technologies.",
          impact: "high",
          roi_score: 0.92,
        },
        {
          title: "Quantify Leadership Impact",
          description: "Add metrics showing team size managed, project outcomes, and strategic decisions made in previous roles.",
          impact: "high",
          roi_score: 0.88,
        },
        {
          title: "Incorporate JD Keywords",
          description: "Naturally integrate missing keywords like 'microservices architecture', 'CI/CD pipelines', and 'cloud-native design'.",
          impact: "high",
          roi_score: 0.85,
        },
        {
          title: "Reformat Summary Statement",
          description: "Lead with a senior-level summary emphasizing strategic contributions and team leadership.",
          impact: "medium",
          roi_score: 0.73,
        },
      ],
      resume_rewrite_suggestions: {
        original: "Software Engineer with 4 years of experience building web applications. Proficient in JavaScript and databases.",
        optimized: "Senior Software Engineer with 5+ years of experience architecting scalable microservices and leading cross-functional teams. Expert in React, Node.js, PostgreSQL, and AWS cloud infrastructure with proven track record of delivering mission-critical systems.",
        changes: [
          { type: "added", text: "Senior" },
          { type: "added", text: "5+ years" },
          { type: "added", text: "architecting scalable microservices" },
          { type: "added", text: "leading cross-functional teams" },
          { type: "modified", text: "React, Node.js, PostgreSQL, and AWS" },
        ],
      },
      upskilling_suggestions: [
        {
          category: "Certifications",
          items: [
            "AWS Certified Solutions Architect",
            "Kubernetes Administrator (CKA)",
            "Certified Scrum Master (CSM)",
          ],
        },
        {
          category: "Missing Technologies",
          items: [
            "Docker & Container Orchestration",
            "GraphQL API Design",
            "Redis Caching Strategies",
          ],
        },
        {
          category: "Leadership Skills",
          items: [
            "Technical Team Management",
            "Stakeholder Communication",
            "System Design & Architecture",
          ],
        },
      ],
    };

    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar />

        {/* Content Area */}
        <main className="flex-1 p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold">
                    Welcome back, <span className="text-primary">Admin</span>
                  </h1>
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                </div>
                <p className="text-lg text-muted-foreground font-medium">AEGIS Business Operations Dashboard</p>
              </div>
              <div className="status-badge operational">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>All Systems Operational</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Panel - Upload */}
            <div className="space-y-6">
              <div className="card-gradient p-6 rounded-2xl">
                <h2 className="text-2xl font-bold mb-2">Resume Analysis</h2>
                <p className="text-muted-foreground mb-6">
                  Upload your resume and job description to get AI-powered insights
                </p>

                <UploadPanel onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
              </div>

              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card-gradient p-6 rounded-2xl"
                >
                  <ProcessingTimeline currentStep={currentStep} />
                </motion.div>
              )}
            </div>

            {/* Right Panel - Results */}
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {!analysisResult && !isAnalyzing && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex items-center justify-center card-gradient p-12 rounded-2xl"
                  >
                    <div className="text-center text-muted-foreground">
                      <AegisLogo size={80} className="mx-auto mb-6 opacity-20" />
                      <p className="text-xl font-medium">Upload a resume to begin analysis</p>
                      <p className="text-sm mt-2">Get instant insights on ATS compatibility</p>
                    </div>
                  </motion.div>
                )}

                {analysisResult && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    <div className="card-gradient p-6 rounded-2xl">
                      <ScoreGauge score={analysisResult.ats_score} />
                    </div>
                    <div className="card-gradient p-6 rounded-2xl">
                      <BreakdownChart
                        semantic={analysisResult.semantic_alignment_score}
                        skillGap={analysisResult.skill_gap_score}
                        experience={analysisResult.experience_alignment_score}
                        formatting={analysisResult.formatting_risk_score}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Full Width Results Section */}
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 space-y-8"
            >
              <div className="card-gradient p-8 rounded-2xl">
                <RejectionReasonCards reasons={analysisResult.rejection_reasons} />
              </div>
              <div className="card-gradient p-8 rounded-2xl">
                <OptimizationTabs
                  recommendations={analysisResult.optimization_recommendations}
                  rewriteSuggestions={analysisResult.resume_rewrite_suggestions}
                  upskillingSuggestions={analysisResult.upskilling_suggestions}
                />
              </div>
              <DisclaimerBanner />
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
