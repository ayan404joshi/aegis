# AEGIS - ATS Rejection Intelligence Engine

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-38bdf8" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
</div>

## 🚀 Overview

**AEGIS** is a production-grade AI SaaS platform that provides probabilistic analysis of why a resume may have been rejected by an ATS (Applicant Tracking System). Using LLM-powered semantic analysis, AEGIS delivers confidence-scored insights, optimization recommendations, and resume rewrites.

### Key Features

- 🎯 **ATS Match Scoring** - Comprehensive 0-100 score with visual gauge
- 📊 **Score Breakdown** - Semantic alignment, skill gap, experience, and formatting analysis
- 🔍 **Rejection Reasoning** - Confidence-scored potential rejection causes
- ✨ **Optimization Engine** - ROI-ranked improvement recommendations
- 📝 **Resume Rewrite** - Side-by-side comparison with highlighted changes
- 🎓 **Upskilling Path** - Personalized learning and certification recommendations
- 🌓 **Dark/Light Mode** - Full theme support
- 📱 **Responsive Design** - Mobile-first enterprise UI

## 🏗 Tech Stack

### Frontend
- **Next.js 14** - App Router with React Server Components
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Recharts** - Data visualization
- **Lucide Icons** - Modern icon system
- **next-themes** - Theme management

### State Management
- **TanStack Query (React Query)** - Server state management
- **Zustand** - Client state (optional)

### API
- **Next.js API Routes** - RESTful endpoints
- **Zod** - Schema validation

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/aegis.git
cd aegis

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/v1

# JWT Secret (Generate a secure random string in production)
JWT_SECRET=your-secret-key-here-replace-in-production

# Redis Configuration (for rate limiting)
REDIS_URL=redis://localhost:6379

# Monitoring (Optional)
# SENTRY_DSN=
# DATADOG_API_KEY=

# Environment
NODE_ENV=development
```

## 🎨 Project Structure

```
aegis/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── v1/
│   │   │   │   └── analyze/
│   │   │   │       └── route.ts
│   │   │   └── health/
│   │   │       └── route.ts
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── landing-page.tsx
│   │   ├── dashboard-page.tsx
│   │   ├── upload-panel.tsx
│   │   ├── processing-timeline.tsx
│   │   ├── score-gauge.tsx
│   │   ├── breakdown-chart.tsx
│   │   ├── rejection-reason-cards.tsx
│   │   ├── optimization-tabs.tsx
│   │   ├── disclaimer-banner.tsx
│   │   ├── theme-toggle.tsx
│   │   ├── theme-provider.tsx
│   │   └── query-provider.tsx
│   ├── lib/
│   │   └── utils.ts
│   └── types/
│       └── api.ts
├── public/
├── .env.local
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## 🌐 API Endpoints

### POST `/api/v1/analyze`

Analyzes resume against job description.

**Request Body:**
```json
{
  "resume_text": "string",
  "job_description": "string"
}
```

**Response:**
```json
{
  "ats_score": 68,
  "semantic_alignment_score": 72,
  "skill_gap_score": 58,
  "experience_alignment_score": 75,
  "formatting_risk_score": 85,
  "rejection_reasons": [...],
  "optimization_recommendations": [...],
  "resume_rewrite_suggestions": {...},
  "upskilling_suggestions": [...]
}
```

### GET `/api/health`

Health check endpoint.

## 🧪 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- AWS Amplify
- Netlify
- Railway
- DigitalOcean App Platform

## 🔐 Enterprise Features

### Implemented
- ✅ JWT Authentication middleware scaffolding
- ✅ API versioning (`/v1`)
- ✅ Error boundary UI
- ✅ Environment configuration
- ✅ Strict TypeScript typing
- ✅ Schema validation (Zod)

### To Implement
- ⏳ Rate limiting (Redis)
- ⏳ Logging hooks (Winston/Pino)
- ⏳ Monitoring integration (Datadog/Sentry)
- ⏳ LLM integration (OpenAI/Anthropic)
- ⏳ PDF parsing (pdf-parse/pdfjs)
- ⏳ Database integration (PostgreSQL/Prisma)

## 📊 Features Roadmap

### Phase 1 (MVP) ✅
- [x] Landing page
- [x] Dashboard with file upload
- [x] Score visualization
- [x] Rejection reason cards
- [x] Optimization recommendations
- [x] Theme support

### Phase 2 (Enhancement)
- [ ] Real LLM integration
- [ ] PDF parsing
- [ ] User authentication
- [ ] Save/export reports
- [ ] Email notifications

### Phase 3 (Advanced)
- [ ] Batch resume comparison
- [ ] A/B resume testing
- [ ] Industry benchmark scoring
- [ ] Recruiter mode
- [ ] Analytics dashboard

## ⚖️ Legal & Compliance

### Important Notice

This system provides **probabilistic inference** and does not access proprietary ATS systems. All analyses are AI-generated interpretations based on:
- Semantic analysis
- Keyword matching
- Industry patterns
- Machine learning models

**Results should be used as guidance, not as definitive rejection causes.**

All outputs include confidence scores (0-1) to indicate certainty levels.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - Initial work

## 🙏 Acknowledgments

- Built with Next.js and React
- UI components inspired by shadcn/ui
- Icons by Lucide
- Charts by Recharts

## 📧 Contact

For questions or support, please open an issue or contact [your-email@example.com](mailto:your-email@example.com).

---

<div align="center">
  <strong>Built with ❤️ for job seekers everywhere</strong>
</div>
