import { Suspense } from "react";
import DashboardContent from "@/components/DashboardContent";
import { Terminal, Github, Sparkles } from "lucide-react";

export default function Home() {
  return (
    
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 selection:bg-indigo-100 relative overflow-hidden">

      
      <div className="absolute top-0 -left-4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-40"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-40"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-40"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

      <nav className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/60 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-lg shadow-zinc-900/20">
              <Terminal size={18} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-zinc-900">
              Dev<span className="text-indigo-600">Dash</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <a href="#" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors">
              <Github size={18} /> Source Code
            </a>
            <button className="flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-bold text-indigo-700 transition-all hover:bg-indigo-100 hover:shadow-md hover:shadow-indigo-100">
              <Sparkles size={16} className="text-indigo-600" /> Pro Engine
            </button>
          </div>

        </div>
      </nav>

      {/* THE HERO SECTION */}
      <main className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 pt-20 pb-24">
        <div className="mb-12 text-center max-w-3xl flex flex-col items-center">
          
          {/* Status Pill */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-1.5 text-xs font-bold text-zinc-600 shadow-sm backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Gemini 2.5 AI Online
          </div>
          
          {/* Massive Typography with Gradient Text */}
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-7xl">
            Decode the <br /> Developer <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-violet-600">Persona.</span>
          </h1>
          
          {/* Subtitle */}
          <p className="mx-auto max-w-xl text-lg text-zinc-500 font-medium leading-relaxed">
            Enter a GitHub username to generate a comprehensive architectural review, analyze repository ecosystems, and visualize tech stack distributions.
          </p>
        </div>

        {/* THE DASHBOARD ENGINE */}
        <div className="w-full">
          <Suspense fallback={
            <div className="text-center text-zinc-400 mt-20 font-medium animate-pulse">
              Initializing Dashboard Engine...
            </div>
          }>
            <DashboardContent />
          </Suspense>
        </div>
      </main>

    </div>
  );
}