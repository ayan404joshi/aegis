"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { TopBar } from "@/components/topbar";
import { BarChart3, TrendingUp, Target, Award, Calendar, Download, LineChart, PieChart as PieChartIcon } from "lucide-react";
import { BarChart, Bar, LineChart as RechartsLineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");

  // Mock data
  const scoreOverTime = [
    { date: "Week 1", score: 45 },
    { date: "Week 2", score: 52 },
    { date: "Week 3", score: 68 },
    { date: "Week 4", score: 73 },
    { date: "Week 5", score: 82 },
  ];

  const categoryBreakdown = [
    { category: "Technical Skills", score: 85 },
    { category: "Experience", score: 75 },
    { category: "Education", score: 90 },
    { category: "Keywords", score: 68 },
    { category: "Formatting", score: 92 },
  ];

  const applicationStatus = [
    { name: "Applied", value: 45, color: "#3b82f6" },
    { name: "Interviewed", value: 28, color: "#10b981" },
    { name: "Rejected", value: 15, color: "#ef4444" },
    { name: "Pending", value: 12, color: "#f59e0b" },
  ];

  const downloadReport = () => {
    alert("Downloading comprehensive PDF report...");
    // In production: Generate and download PDF
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-4xl font-bold mb-2">Reports & Analytics</h1>
                <p className="text-lg text-muted-foreground">Track your progress and insights</p>
              </div>
              <button
                onClick={downloadReport}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Export Report
              </button>
            </div>
          </div>

          {/* Time Range Filter */}
          <div className="flex gap-2 mb-8">
            {["week", "month", "year"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range as typeof timeRange)}
                className={`px-6 py-2 rounded-xl font-semibold capitalize transition-all ${
                  timeRange === range
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border hover:border-primary/30"
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-gradient p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <Target className="w-10 h-10 text-primary" />
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-3xl font-bold mb-1">82%</div>
              <p className="text-sm text-muted-foreground">Average ATS Score</p>
              <p className="text-xs text-green-500 mt-2">+15% from last month</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-gradient p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <Award className="w-10 h-10 text-yellow-500" />
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-3xl font-bold mb-1">12</div>
              <p className="text-sm text-muted-foreground">Total Analyses</p>
              <p className="text-xs text-green-500 mt-2">5 this month</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-gradient p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="w-10 h-10 text-blue-500" />
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-3xl font-bold mb-1">45</div>
              <p className="text-sm text-muted-foreground">Applications Sent</p>
              <p className="text-xs text-green-500 mt-2">8 this week</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card-gradient p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <Calendar className="w-10 h-10 text-purple-500" />
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-3xl font-bold mb-1">28</div>
              <p className="text-sm text-muted-foreground">Interviews Secured</p>
              <p className="text-xs text-green-500 mt-2">62% success rate</p>
            </motion.div>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Score Over Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card-gradient p-6 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <LineChart className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold">Score Progress</h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={scoreOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.75rem",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", r: 6 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Category Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="card-gradient p-6 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold">Category Performance</h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" angle={-45} textAnchor="end" height={100} />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.75rem",
                    }}
                  />
                  <Bar dataKey="score" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Application Status Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card-gradient p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <PieChartIcon className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold">Application Status Distribution</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={applicationStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {applicationStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="space-y-3">
                {applicationStatus.map((status) => (
                  <div key={status.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: status.color }} />
                      <span className="font-semibold">{status.name}</span>
                    </div>
                    <span className="text-2xl font-bold">{status.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
