"use client";

import { useState, useRef } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface UploadPanelProps {
  onAnalyze: (resumeText: string, jobDescription: string) => void;
  isAnalyzing: boolean;
}

export function UploadPanel({ onAnalyze, isAnalyzing }: UploadPanelProps) {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      // In production, extract text from PDF/DOC using pdf-parse or similar
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setResumeText(text || `Uploaded file: ${file.name}`);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async () => {
    if (resumeText && jobDescription && !isAnalyzing) {
      onAnalyze(resumeText, jobDescription);
    }
  };

  const isValid = resumeText && jobDescription && !isAnalyzing;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
      {/* Resume Upload */}
      <div>
        <label className="block text-sm font-semibold mb-3">Resume</label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-xl p-8 cursor-pointer hover:border-primary/50 transition-colors text-center"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />
          {resumeFile ? (
            <div className="flex items-center justify-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              <span className="font-medium">{resumeFile.name}</span>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Click to upload resume (PDF, DOC, TXT)
              </p>
            </div>
          )}
        </div>
        {resumeFile && (
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Edit extracted text if needed..."
            className="mt-3 w-full h-32 p-3 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        )}
      </div>

      {/* Job Description */}
      <div>
        <label className="block text-sm font-semibold mb-3">Job Description</label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          className="w-full h-48 p-4 bg-background border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Analyze Button */}
      <button
        onClick={handleSubmit}
        disabled={!isValid}
        className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <FileText className="w-5 h-5" />
            Analyze Resume
          </>
        )}
      </button>
    </div>
  );
}
