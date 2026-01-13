# AI Resume Analyzer

An intelligent resume analysis tool built with **React Router 7**, **Puter.js**, and **Tailwind CSS**. This application helps users optimize their resumes by analyzing them against specific job descriptions using advanced AI models.

## 🚀 Features

- **AI-Powered Analysis**: Leverages Puter.js AI capabilities to provide deep insights, executive summaries, and detailed feedback.
- **ATS Scoring**: Calculates an Applicant Tracking System (ATS) score to gauge resume effectiveness.
- **Smart Feedback**: Offers actionable tips, strengths, and weaknesses to improve resume quality.
- **Resume Management**: A dashboard to store, view, and manage multiple uploaded resumes.
- **PDF & Image Support**: Automatically converts and processes PDF resumes for analysis.
- **Secure Authentication**: Integrated user authentication system powered by Puter.js.
- **Responsive Design**: Beautiful, modern UI built with Tailwind CSS.

## 🛠️ Tech Stack

- **Framework**: [React Router 7](https://reactrouter.com/) (formerly Remix)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend / AI / Storage**: [Puter.js](https://docs.puter.com/)
    - **Auth**: User authentication
    - **AI**: GPT-based text analysis
    - **Keys-Value Store**: Data persistence
    - **File System**: Cloud storage for resumes and assets

## 📂 Project Structure

```
app/
├── components/    # Reusable UI components (ATS, Summary, Details)
├── lib/           # Utilities and Puter.js integration
├── routes/        # Application routes (home, login, upload, resume)
├── types/         # TypeScript type definitions
└── root.tsx       # Root layout
```
## Live Preview

Visit :- https://ai-resume-analyzer-snowy-five.vercel.app/


https://github.com/user-attachments/assets/cfc105cd-c46d-4321-b176-ecbd8bd98913


## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/neev-ahuja/ai-resume-analyzer.git
   cd ai-resume
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the app**
   Visit [http://localhost:5173](http://localhost:5173) in your browser.

## 📖 Usage

1. **Sign Up/Login**: Create an account or log in to access the dashboard.
2. **Upload Resume**: Navigate to the upload page, fill in the company name, job title, and description, and upload your PDF resume.
3. **Analyze**: Click "Analyze Resume" to let the AI process your document.
4. **View Results**: Explore the detailed breakdown of your resume's performance, including ATS score and specific improvement tips.
5. **Dashboard**: View and manage your history of analyzed resumes from the main dashboard.
