import { NextResponse } from "next/server";
import type { AnalysisRequest, AnalysisResponse } from "@/types/api";

export async function POST(request: Request) {
  try {
    const body: AnalysisRequest = await request.json();

    // Validate request
    if (!body.resume_text || !body.job_description) {
      return NextResponse.json(
        {
          error: "Validation Error",
          message: "Both resume_text and job_description are required",
          code: "MISSING_FIELDS",
        },
        { status: 400 }
      );
    }

    // TODO: Implement actual LLM analysis
    // This is a placeholder for the real implementation
    // In production, this would:
    // 1. Extract structured data from resume
    // 2. Compute embeddings
    // 3. Run semantic analysis
    // 4. Generate confidence-scored insights
    // 5. Produce optimization recommendations

    const mockResponse: AnalysisResponse = {
      ats_score: 68,
      semantic_alignment_score: 72,
      skill_gap_score: 58,
      experience_alignment_score: 75,
      formatting_risk_score: 85,
      rejection_reasons: [
        {
          category: "Skill Gap",
          explanation:
            "The resume lacks specific mention of required technologies like React, Node.js, and PostgreSQL that are critical for this role.",
          confidence_score: 0.87,
          severity: "high",
        },
        {
          category: "Experience Depth",
          explanation:
            "While you have relevant experience, the JD requires 5+ years in senior roles. Your resume emphasizes mid-level accomplishments.",
          confidence_score: 0.72,
          severity: "medium",
        },
        {
          category: "Keyword Density",
          explanation:
            "Key terms from the JD appear infrequently. Terms like 'microservices', 'CI/CD', and 'cloud architecture' are underrepresented.",
          confidence_score: 0.81,
          severity: "high",
        },
        {
          category: "Seniority Misalignment",
          explanation:
            "The job requires leadership experience managing teams. Your resume focuses more on individual contributions.",
          confidence_score: 0.65,
          severity: "medium",
        },
      ],
      optimization_recommendations: [
        {
          title: "Add Technology Stack Section",
          description:
            "Create a dedicated 'Technical Skills' section highlighting React, Node.js, PostgreSQL, AWS, and other required technologies.",
          impact: "high",
          roi_score: 0.92,
        },
        {
          title: "Quantify Leadership Impact",
          description:
            "Add metrics showing team size managed, project outcomes, and strategic decisions made in previous roles.",
          impact: "high",
          roi_score: 0.88,
        },
        {
          title: "Incorporate JD Keywords",
          description:
            "Naturally integrate missing keywords like 'microservices architecture', 'CI/CD pipelines', and 'cloud-native design'.",
          impact: "high",
          roi_score: 0.85,
        },
        {
          title: "Reformat Summary Statement",
          description:
            "Lead with a senior-level summary emphasizing strategic contributions and team leadership.",
          impact: "medium",
          roi_score: 0.73,
        },
      ],
      resume_rewrite_suggestions: {
        original:
          "Software Engineer with 4 years of experience building web applications. Proficient in JavaScript and databases.",
        optimized:
          "Senior Software Engineer with 5+ years of experience architecting scalable microservices and leading cross-functional teams. Expert in React, Node.js, PostgreSQL, and AWS cloud infrastructure with proven track record of delivering mission-critical systems.",
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

    return NextResponse.json(mockResponse, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-API-Version": "v1",
      },
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "An error occurred while processing your request",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}
