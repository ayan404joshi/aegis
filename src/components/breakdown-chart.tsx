"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface BreakdownChartProps {
  semantic: number;
  skillGap: number;
  experience: number;
  formatting: number;
}

export function BreakdownChart({
  semantic,
  skillGap,
  experience,
  formatting,
}: BreakdownChartProps) {
  const data = [
    { name: "Semantic\nAlignment", value: semantic },
    { name: "Skill\nGap", value: skillGap },
    { name: "Experience\nAlignment", value: experience },
    { name: "Formatting\nRisk", value: formatting },
  ];

  const getColor = (value: number) => {
    if (value >= 70) return "#22c55e";
    if (value >= 40) return "#eab308";
    return "#ef4444";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold mb-6">Score Breakdown</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis
            dataKey="name"
            tick={{ fill: "currentColor", fontSize: 12 }}
            className="text-muted-foreground"
            angle={0}
            textAnchor="middle"
            height={60}
          />
          <YAxis
            tick={{ fill: "currentColor" }}
            className="text-muted-foreground"
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.value)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getColor(item.value) }}
            />
            <div className="flex-1">
              <div className="text-xs text-muted-foreground">{item.name.replace("\n", " ")}</div>
              <div className="text-lg font-semibold">{item.value}%</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
