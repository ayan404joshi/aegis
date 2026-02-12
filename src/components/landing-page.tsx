"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Lock, TrendingUp } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { AegisLogo } from "./aegis-logo";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl fixed top-0 w-full z-50 bg-background/80">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center border border-border/30 glow-effect">
              <AegisLogo size={30} className="text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold">AEGIS</span>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">AI Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all font-semibold shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              Launch Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Enterprise ATS Analysis
            </span>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Understand Why Your
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Resume Was Rejected
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            LLM-powered probabilistic ATS analysis. Get confidence-scored insights,
            optimization recommendations, and resume rewrites.
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              href="/dashboard"
              className="group px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg flex items-center gap-2 hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
            >
              Analyze Resume
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 border-2 border-border rounded-2xl font-semibold text-lg hover:bg-accent transition-colors">
              View Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Four simple steps to understand your resume&apos;s ATS performance
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Upload Resume",
                description: "Submit your resume in PDF or text format",
                icon: "📄",
              },
              {
                step: "02",
                title: "Add Job Description",
                description: "Paste the job description you applied for",
                icon: "📝",
              },
              {
                step: "03",
                title: "AI Reasoning",
                description: "Our LLM analyzes alignment and identifies gaps",
                icon: "🧠",
              },
              {
                step: "04",
                title: "Optimization Insights",
                description: "Get scored recommendations and rewrites",
                icon: "✨",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative"
              >
                <div className="bg-card border border-border rounded-2xl p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <div className="text-sm font-bold text-primary mb-2">{item.step}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-primary/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: "Confidence Scoring",
              description: "Every insight includes a confidence score (0-1) for transparency",
            },
            {
              icon: <AegisLogo size={32} />,
              title: "Enterprise Compliance",
              description: "Probabilistic inference with clear methodology disclosure",
            },
            {
              icon: <Lock className="w-8 h-8" />,
              title: "Data Privacy",
              description: "Your resume data is processed securely and never stored permanently",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-colors"
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Compliance Notice */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-muted/30 border border-border rounded-2xl p-10 text-center max-w-4xl mx-auto"
        >
          <Lock className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="text-2xl font-bold mb-4">Enterprise Compliance Notice</h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            This system provides <strong>probabilistic inference</strong> and does not access
            proprietary ATS systems. All analyses are AI-generated interpretations based on
            semantic analysis and industry patterns. Results should be used as guidance, not
            as definitive rejection causes.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <AegisLogo size={24} className="text-white" />
              <span className="text-xl font-bold">AEGIS</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <span>Version 1.0</span>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-muted-foreground">
            © {new Date().getFullYear()} AEGIS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
