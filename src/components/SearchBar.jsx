"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, Command } from "lucide-react"; 

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("user") || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        router.push(`?user=${query}`);
      } else {
        router.push("/");
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, router]);

  return (
    <div className="w-full max-w-2xl mx-auto my-8 relative z-20 group">
      
      
      <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 via-violet-500 to-emerald-500 rounded-4xl blur-lg opacity-20 group-focus-within:opacity-60 transition duration-500"></div>
      
      
      <div className="relative flex items-center w-full bg-white/90 backdrop-blur-md border border-zinc-200/80 rounded-3xl p-2 shadow-sm transition-all duration-300 group-focus-within:bg-white group-focus-within:shadow-xl group-focus-within:border-indigo-300">
        
        
        <div className="pl-4 pr-2 flex items-center justify-center text-zinc-400 group-focus-within:text-indigo-500 transition-colors">
          <Search size={22} strokeWidth={2.5} />
        </div>

        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GitHub handle (e.g., torvalds)"
          className="w-full py-3 px-2 bg-transparent text-zinc-900 placeholder:text-zinc-400 focus:outline-none text-lg font-medium tracking-tight"
          spellCheck="false"
        />

        
        <div className="hidden sm:flex items-center gap-1 pr-4">
          <kbd className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-zinc-500 bg-zinc-100 rounded-xl border border-zinc-200 shadow-sm">
            <Command size={12} /> Auto-Sync
          </kbd>
        </div>
      </div>
    </div>
  );
}