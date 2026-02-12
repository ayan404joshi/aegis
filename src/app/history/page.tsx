"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { TopBar } from "@/components/topbar";
import { FileText, Clock, Download, Eye, Trash2, Calendar, TrendingUp, TrendingDown, Filter, Search } from "lucide-react";
import { motion } from "framer-motion";

type Analysis = {
  id: number;
  jobTitle: string;
  company: string;
  score: number;
  date: string;
  status: "completed" | "processing" | "failed";
  trend: "up" | "down" | "neutral";
};

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "processing" | "failed">("all");
  
  const [analyses, setAnalyses] = useState<Analysis[]>([
    {
      id: 1,
      jobTitle: "Senior Software Engineer",
      company: "Tech Corp",
      score: 68,
      date: "2 days ago",
      status: "completed",
      trend: "up"
    },
    {
      id: 2,
      jobTitle: "Full Stack Developer",
      company: "StartupXYZ",
      score: 82,
      date: "5 days ago",
      status: "completed",
      trend: "up"
    },
    {
      id: 3,
      jobTitle: "Frontend Engineer",
      company: "Design Studio",
      score: 45,
      date: "1 week ago",
      status: "completed",
      trend: "down"
    },
    {
      id: 4,
      jobTitle: "DevOps Engineer",
      company: "Cloud Services Inc",
      score: 73,
      date: "2 weeks ago",
      status: "completed",
      trend: "neutral"
    },
    {
      id: 5,
      jobTitle: "Backend Developer",
      company: "Enterprise Solutions",
      score: 91,
      date: "3 weeks ago",
      status: "completed",
      trend: "up"
    },
  ]);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this analysis?")) {
      setAnalyses(analyses.filter(a => a.id !== id));
    }
  };

  const handleView = (id: number) => {
    // In production: Navigate to detailed view
    alert(`Viewing analysis #${id}`);
  };

  const handleDownload = (id: number) => {
    // In production: Generate and download PDF
    alert(`Downloading analysis #${id} as PDF`);
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-500 bg-green-500/10 border-green-500/20";
    if (score >= 40) return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
    return "text-red-500 bg-red-500/10 border-red-500/20";
  };

  const filteredAnalyses = analyses.filter(analysis => {
    const matchesSearch = analysis.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         analysis.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || analysis.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Analysis History</h1>
            <p className="text-lg text-muted-foreground">View and manage your past resume analyses</p>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by job title or company..."
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            
            <div className="flex gap-2">
              {["all", "completed", "processing", "failed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status as typeof filterStatus)}
                  className={`px-4 py-3 rounded-xl font-semibold capitalize transition-all ${
                    filterStatus === status
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border hover:border-primary/30"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="card-gradient p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <FileText className="w-8 h-8 text-primary" />
                <span className="text-3xl font-bold">{analyses.length}</span>
              </div>
              <p className="text-sm text-muted-foreground">Total Analyses</p>
            </div>

            <div className="card-gradient p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-green-500" />
                <span className="text-3xl font-bold">
                  {Math.round(analyses.reduce((acc, a) => acc + a.score, 0) / analyses.length)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </div>

            <div className="card-gradient p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-8 h-8 text-blue-500" />
                <span className="text-3xl font-bold">
                  {analyses.filter(a => a.date.includes("days")).length}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">This Week</p>
            </div>

            <div className="card-gradient p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-yellow-500" />
                <span className="text-3xl font-bold">
                  {analyses.filter(a => a.trend === "up").length}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Improving</p>
            </div>
          </div>

          {/* Analysis List */}
          <div className="grid gap-4">
            {filteredAnalyses.length === 0 ? (
              <div className="card-gradient p-12 rounded-2xl text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                <h3 className="text-xl font-bold mb-2">No analyses found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? "Try adjusting your search" : "Start by analyzing your first resume"}
                </p>
              </div>
            ) : (
              filteredAnalyses.map((analysis, index) => (
                <motion.div
                  key={analysis.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-gradient p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{analysis.jobTitle}</h3>
                      {analysis.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                      {analysis.trend === "down" && <TrendingDown className="w-4 h-4 text-red-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{analysis.company}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{analysis.date}</span>
                    </div>

                    <div className={`px-4 py-2 rounded-full border font-bold text-lg ${getScoreColor(analysis.score)}`}>
                      {analysis.score}%
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(analysis.id)}
                        className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5 text-primary" />
                      </button>
                      <button
                        onClick={() => handleDownload(analysis.id)}
                        className="p-2 hover:bg-green-500/10 rounded-lg transition-colors"
                        title="Download Report"
                      >
                        <Download className="w-5 h-5 text-green-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(analysis.id)}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
