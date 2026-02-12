"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topbar";
import { 
  Video, 
  Mic, 
  Play, 
  Pause, 
  RotateCcw, 
  TrendingUp,
  Brain,
  MessageSquare,
  Clock,
  Target,
  Award,
  AlertCircle,
  CheckCircle2,
  Sparkles
} from "lucide-react";

type InterviewAnalysis = {
  overall_score: number;
  communication_score: number;
  technical_accuracy: number;
  confidence_level: number;
  clarity_score: number;
  talking_points: Array<{
    timestamp: string;
    category: string;
    text: string;
    sentiment: "positive" | "neutral" | "negative";
  }>;
  strengths: string[];
  improvements: string[];
  keyword_analysis: Array<{
    keyword: string;
    count: number;
    relevance: number;
  }>;
};

export function InterviewsPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [analysis, setAnalysis] = useState<InterviewAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
    setRecordingTime(0);
    setAnalysis(null);
    // In production: Start actual recording
  };

  // Timer effect for recording
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleStopAndAnalyze = async () => {
    setIsRecording(false);
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock analysis result
    const mockAnalysis: InterviewAnalysis = {
      overall_score: 82,
      communication_score: 85,
      technical_accuracy: 78,
      confidence_level: 88,
      clarity_score: 80,
      talking_points: [
        {
          timestamp: "0:45",
          category: "Introduction",
          text: "Started with clear self-introduction and relevant experience",
          sentiment: "positive"
        },
        {
          timestamp: "2:15",
          category: "Technical",
          text: "Explained React hooks with good examples",
          sentiment: "positive"
        },
        {
          timestamp: "4:30",
          category: "Behavioral",
          text: "Used STAR method effectively for conflict resolution question",
          sentiment: "positive"
        },
        {
          timestamp: "6:20",
          category: "Technical",
          text: "Hesitated on system design scalability question",
          sentiment: "neutral"
        },
        {
          timestamp: "8:45",
          category: "Communication",
          text: "Strong closing statement with relevant questions",
          sentiment: "positive"
        }
      ],
      strengths: [
        "Clear and structured responses using frameworks (STAR method)",
        "Good technical depth in areas of expertise",
        "Confident body language and tone",
        "Excellent use of specific examples and metrics",
        "Strong opening and closing statements"
      ],
      improvements: [
        "Reduce filler words ('um', 'like') - appeared 12 times",
        "Take brief pauses before complex technical answers",
        "Provide more concrete numbers when discussing achievements",
        "Ask more strategic questions about company direction",
        "Practice system design patterns for scalability discussions"
      ],
      keyword_analysis: [
        { keyword: "React", count: 8, relevance: 0.95 },
        { keyword: "TypeScript", count: 5, relevance: 0.88 },
        { keyword: "Team collaboration", count: 6, relevance: 0.82 },
        { keyword: "Problem solving", count: 4, relevance: 0.78 },
        { keyword: "Leadership", count: 3, relevance: 0.72 }
      ]
    };

    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
    setAnalysis(null);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold">
                Mock <span className="text-primary">Interviews</span>
              </h1>
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </div>
            <p className="text-lg text-muted-foreground">
              Practice interviews with AI-powered detailed analysis
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recording Panel */}
            <div className="space-y-6">
              <div className="card-gradient p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Video className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Interview Recording</h2>
                </div>

                {/* Recording Interface */}
                <div className="aspect-video bg-muted/20 rounded-xl border-2 border-dashed border-border mb-6 flex items-center justify-center relative overflow-hidden">
                  {isRecording ? (
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-red-500/20 border-4 border-red-500 flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Mic className="w-10 h-10 text-red-500" />
                      </div>
                      <p className="text-xl font-bold mb-2">
                        {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {isPaused ? "Paused" : "Recording in progress..."}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Mic className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-muted-foreground">Click Start to begin recording</p>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex gap-3">
                  {!isRecording && !analysis && (
                    <button
                      onClick={handleStartRecording}
                      className="flex-1 px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                    >
                      <Play className="w-5 h-5" />
                      Start Recording
                    </button>
                  )}
                  
                  {isRecording && (
                    <>
                      <button
                        onClick={handlePauseResume}
                        className="flex-1 px-6 py-4 bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 rounded-xl font-semibold hover:bg-yellow-500/30 transition-all flex items-center justify-center gap-2"
                      >
                        {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                        {isPaused ? "Resume" : "Pause"}
                      </button>
                      <button
                        onClick={handleStopAndAnalyze}
                        className="flex-1 px-6 py-4 bg-red-500/20 text-red-500 border border-red-500/30 rounded-xl font-semibold hover:bg-red-500/30 transition-all flex items-center justify-center gap-2"
                      >
                        <Brain className="w-5 h-5" />
                        Stop & Analyze
                      </button>
                    </>
                  )}

                  {analysis && (
                    <button
                      onClick={handleReset}
                      className="flex-1 px-6 py-4 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-5 h-5" />
                      New Interview
                    </button>
                  )}
                </div>
              </div>

              {/* Interview Tips */}
              <div className="card-gradient p-6 rounded-2xl">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Interview Tips
                </h3>
                <ul className="space-y-3 text-sm">
                  {[
                    "Use the STAR method (Situation, Task, Action, Result)",
                    "Provide specific examples with quantifiable results",
                    "Maintain good eye contact and confident posture",
                    "Ask thoughtful questions about the role and company",
                    "Keep responses concise (1-2 minutes per answer)"
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Analysis Results */}
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="card-gradient p-12 rounded-2xl text-center"
                  >
                    <Brain className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
                    <h3 className="text-xl font-bold mb-2">Analyzing Interview...</h3>
                    <p className="text-muted-foreground">Processing speech patterns, tone, and content</p>
                  </motion.div>
                )}

                {!analysis && !isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="card-gradient p-12 rounded-2xl text-center"
                  >
                    <MessageSquare className="w-20 h-20 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Ready for Analysis</h3>
                    <p className="text-muted-foreground">
                      Record your interview to receive detailed AI-powered feedback
                    </p>
                  </motion.div>
                )}

                {analysis && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Overall Score */}
                    <div className="card-gradient p-8 rounded-2xl text-center">
                      <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                      <div className="text-6xl font-bold text-primary mb-2">
                        {analysis.overall_score}
                      </div>
                      <p className="text-lg text-muted-foreground">Overall Score</p>
                    </div>

                    {/* Score Breakdown */}
                    <div className="card-gradient p-6 rounded-2xl">
                      <h3 className="font-bold text-lg mb-4">Performance Breakdown</h3>
                      <div className="space-y-4">
                        {[
                          { label: "Communication", score: analysis.communication_score, icon: MessageSquare },
                          { label: "Technical Accuracy", score: analysis.technical_accuracy, icon: Brain },
                          { label: "Confidence Level", score: analysis.confidence_level, icon: TrendingUp },
                          { label: "Clarity", score: analysis.clarity_score, icon: Target }
                        ].map((item) => (
                          <div key={item.label}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <item.icon className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">{item.label}</span>
                              </div>
                              <span className="text-sm font-bold text-primary">{item.score}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.score}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="h-full bg-gradient-to-r from-primary to-primary/60"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Detailed Analysis Section */}
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 space-y-8"
            >
              {/* Talking Points Timeline */}
              <div className="card-gradient p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Interview Timeline</h2>
                </div>
                <div className="space-y-4">
                  {analysis.talking_points.map((point, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-muted/30 rounded-xl">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">{point.timestamp}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
                            {point.category}
                          </span>
                          {point.sentiment === "positive" && (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          )}
                          {point.sentiment === "negative" && (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{point.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths and Improvements */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="card-gradient p-8 rounded-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                    <h2 className="text-2xl font-bold">Strengths</h2>
                  </div>
                  <ul className="space-y-3">
                    {analysis.strengths.map((strength, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-gradient p-8 rounded-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="w-6 h-6 text-yellow-500" />
                    <h2 className="text-2xl font-bold">Areas to Improve</h2>
                  </div>
                  <ul className="space-y-3">
                    {analysis.improvements.map((improvement, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Keyword Analysis */}
              <div className="card-gradient p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Keyword Analysis</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysis.keyword_analysis.map((item, i) => (
                    <div key={i} className="p-4 bg-muted/30 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{item.keyword}</span>
                        <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                          {item.count}x
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{ width: `${item.relevance * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {Math.round(item.relevance * 100)}% relevance
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
