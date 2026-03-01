"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import RepoChart from "@/components/RepoChart"; 
import { fetchGitHubData, generateAiRemark } from "@/lib/api";
import { Terminal, Star, GitBranch, BrainCircuit, Target, Lightbulb, Loader2, AlertCircle } from "lucide-react";

export default function DashboardContent() {
  const searchParams = useSearchParams();
  const username = searchParams.get("user");

  const { data: repos, isLoading: isRepoLoading, error: repoError } = useQuery({
    queryKey: ["github", username],
    queryFn: () => fetchGitHubData(username as string),
    enabled: !!username,
  });

  const { data: aiAnalysis, isFetching: isAiLoading, error: aiError } = useQuery({
    queryKey: ["gemini", username],
    queryFn: () => generateAiRemark(repos!),
    enabled: !!repos && repos.length > 0,
    retry: false,
  });

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto px-4 pb-20">
      <SearchBar />

      {!username && (
        <div className="flex flex-col items-center justify-center mt-16 text-zinc-400">
          <div className="h-24 w-24 bg-zinc-100 rounded-full flex items-center justify-center mb-6 shadow-inner border border-zinc-200">
            <Terminal size={40} className="text-zinc-300" />
          </div>
          <p className="text-lg font-medium tracking-tight text-zinc-500">Awaiting target repository data...</p>
        </div>
      )}

      {isRepoLoading && (
        <div className="flex flex-col items-center justify-center mt-16 text-zinc-900">
          <Loader2 size={32} className="animate-spin mb-4" />
          <p className="font-medium text-sm uppercase tracking-widest text-zinc-500">Indexing GitHub...</p>
        </div>
      )}
      
      {repoError && (
        <div className="flex items-center gap-3 justify-center text-red-600 bg-red-50/50 p-4 rounded-xl border border-red-100 shadow-sm mt-8">
          <AlertCircle size={20} />
          <span className="font-medium text-sm">Failed to resolve handle. Please verify the username.</span>
        </div>
      )}

      {isAiLoading && !aiAnalysis && (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-zinc-200 mt-4 flex flex-col items-center justify-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-zinc-900 to-transparent animate-pulse"></div>
           <BrainCircuit size={40} className="animate-pulse mb-6 text-zinc-900" />
           <p className="text-xl font-bold tracking-tight text-zinc-900">Synthesizing Architecture...</p>
           <p className="text-zinc-500 mt-2 text-sm font-medium">Running neural evaluation on code structures.</p>
        </div>
      )}

      {aiAnalysis && !isAiLoading && (
        <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-200 mt-4 relative overflow-hidden">
          {/* Subtle background glow effect */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-zinc-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8 border-b border-zinc-100 pb-6">
              <div className="p-3 bg-zinc-900 text-white rounded-xl shadow-md">
                <BrainCircuit size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">{aiAnalysis.title}</h2>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">AI Executive Summary</p>
              </div>
            </div>
            
            <p className="text-zinc-700 text-lg leading-relaxed mb-10 font-medium">
              {aiAnalysis.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200 transition-colors hover:border-zinc-300">
                <h3 className="flex items-center gap-2 font-bold text-zinc-900 mb-5 text-sm uppercase tracking-wider">
                  <Target size={18} className="text-zinc-500" /> Core Strengths
                </h3>
                <ul className="space-y-4">
                  {aiAnalysis.strengths.map((strength, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-700 font-medium text-sm leading-relaxed">
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-zinc-900 mt-2"></span> 
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-zinc-900 text-zinc-100 rounded-2xl p-6 shadow-lg">
                <h3 className="flex items-center gap-2 font-bold text-white mb-5 text-sm uppercase tracking-wider">
                  <Lightbulb size={18} className="text-zinc-400" /> Strategic Growth
                </h3>
                <p className="text-zinc-300 font-medium text-sm leading-relaxed">
                  {aiAnalysis.improvement}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {repos && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-3 mb-6 px-2 border-b border-zinc-200 pb-4">
            <GitBranch size={20} className="text-zinc-900" />
            <h2 className="text-xl font-bold text-zinc-900 tracking-tight">Repository Analytics</h2>
          </div>
          
          <RepoChart repos={repos} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {repos.map((repo) => (
              <a 
                key={repo.name} 
                href={repo.html_url} 
                target="_blank" 
                rel="noreferrer"
                
                className="group relative flex flex-col justify-between p-7 bg-white/80 backdrop-blur-sm border border-zinc-200 rounded-4xl shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-indigo-50 rounded-full blur-3xl group-hover:bg-indigo-100 transition-colors duration-700 z-0"></div>
                <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-violet-50 rounded-full blur-3xl group-hover:bg-violet-100 transition-colors duration-700 z-0"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors line-clamp-1 tracking-tight">
                    {repo.name}
                  </h3>
                  <p className="text-sm text-zinc-500 mt-3 line-clamp-2 leading-relaxed font-medium">
                    {repo.description || "No description provided in this repository."}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between relative z-10">
                  <span className="flex items-center gap-1.5 text-zinc-800 font-bold px-3 py-1.5 rounded-xl text-sm bg-white border border-zinc-200 shadow-sm group-hover:border-amber-200 group-hover:bg-amber-50 transition-colors">
                    <Star size={16} className="text-amber-500 fill-amber-500" /> 
                    {repo.stargazers_count}
                  </span>
                  
                  {repo.language && (
                    <span className="text-zinc-500 font-bold text-xs tracking-widest uppercase bg-zinc-50 px-3 py-1.5 rounded-xl border border-zinc-100">
                      {repo.language}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}