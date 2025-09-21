# InvestIQ

InvestIQ is an AI-powered investment intelligence platform designed to streamline the analysis of startup pitches. Built with Next.js 14 and TypeScript, it allows users to upload investment documents and receive instant, data-driven insights, including deal memos, risk assessments, and competitive analysis.

The application features a landing page, a main dashboard for an overview of analyzed companies, and detailed analysis pages for each company.

## Key Features

-   **Interactive Dashboard**: A central hub to manage, view, and compare analyzed companies with key metrics at a glance.
-   **AI-Powered Analysis Modules**:
    -   **Deal Memos**: Automatically generate comprehensive deal notes and risk heatmaps.
    -   **TAM Reality Check**: Validates Total Addressable Market (TAM) claims against verified industry data sources.
    -   **Cross-Document Consistency Checker**: Detects discrepancies in metrics (e.g., ARR, user count) across pitch decks, financials, and transcripts.
    -   **Vanity Metrics Filter**: Distinguishes between meaningful business metrics and superficial ones.
    -   **Missing Metrics Detector**: Identifies critical KPIs absent from founder materials and generates request templates.
    -   **Founder Credibility System**: Assesses founder backgrounds, verifying experience and flagging potential risks.
    -   **Competitive Intelligence**: Maps the competitive landscape with funding data and strategic insights.
-   **Document Upload**: A modal for uploading multiple documents (pitch decks, financials, etc.) and categorizing them for analysis.
-   **PDF Export**: Generate and download detailed deal notes as a PDF.
-   **Modern UI/UX**: Built with a futuristic, clean design system using shadcn/ui, Tailwind CSS, and Framer Motion for smooth animations.

## Technology Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Lucide React](https://lucide.dev/)
-   **Charting**: [Recharts](https://recharts.org/)
-   **Animation**: [Framer Motion](https://www.framer.com/motion/)
-   **Forms**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
-   **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF), [html2canvas](https://html2canvas.hertzen.com/)
-   **Package Manager**: [pnpm](https://pnpm.io/)

## Project Structure

The repository is organized as follows:

```
├── app/                  # Next.js App Router pages and layouts
│   ├── dashboard/        # Main dashboard and company detail pages
├── components/           # Reusable React components for features
│   ├── ui/               # Core UI components from shadcn/ui
├── hooks/                # Custom React hooks (e.g., useToast)
├── lib/                  # Utility functions and libraries (e.g., pdf-generator)
├── public/               # Static assets
└── styles/               # Global CSS files
```

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v18 or later)
-   [pnpm](https://pnpm.io/installation)

### Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/kkrishna007/InvestIQ.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd InvestIQ
    ```

3.  **Install dependencies:**
    ```bash
    pnpm install
    ```

4.  **Run the development server:**
    ```bash
    pnpm dev
    ```

The application will be available at `http://localhost:3000`.

### Available Scripts

-   `pnpm dev`: Starts the development server.
-   `pnpm build`: Creates a production-ready build.
-   `pnpm start`: Starts the production server.
-   `pnpm lint`: Runs the linter to check for code quality issues.