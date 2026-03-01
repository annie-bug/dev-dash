"use client";

import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, 
  RadialBarChart, RadialBar, Legend 
} from "recharts";
import { GithubRepo } from "@/lib/api";


const COLORS = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#f43f5e'];

export default function RepoChart({ repos }: { repos: GithubRepo[] }) {
  
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const starData = repos.map((repo, index) => ({
    name: repo.name.length > 15 ? `${repo.name.substring(0, 15)}...` : repo.name,
    value: repo.stargazers_count > 0 ? repo.stargazers_count : 1, // Visual minimum
    trueValue: repo.stargazers_count,
    fill: COLORS[index % COLORS.length],
    type: 'star' 
  }));


  const langMap: Record<string, number> = {};
  repos.forEach((repo) => {
    const lang = repo.language || "Unknown";
    langMap[lang] = (langMap[lang] || 0) + 1;
  });
  
  const langData = Object.keys(langMap).map((key, index) => ({
    name: key,
    value: langMap[key],
    trueValue: langMap[key],
    fill: COLORS[index % COLORS.length],
    type: 'lang' 
  }));

  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      const label = data.type === 'star' 
        ? (data.trueValue === 1 ? 'Star' : 'Stars') 
        : (data.trueValue === 1 ? 'Repo' : 'Repos');

      return (
        <div className="bg-white border border-zinc-200 p-4 rounded-2xl shadow-xl z-50">
          <p className="font-bold text-zinc-900 mb-1">{data.name}</p>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: data.fill }}></span>
            <p className="text-sm text-zinc-600 font-medium">
              {data.trueValue} {label}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    // Responsive Grid: 1 column on mobile, 2 columns on large screens
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 w-full">
      
      {/* ---------------- LEFT CHART: STAR DISTRIBUTION ---------------- */}
      <div className="h-90 bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm relative flex flex-col items-center group hover:border-indigo-200 transition-colors duration-300">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest w-full text-left mb-2">
          Star Distribution
        </h3>
        
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={starData}
              cx="50%"
              cy="45%"
              innerRadius={75}
              outerRadius={105}
              paddingAngle={6}
              dataKey="value"
              stroke="none"
              cornerRadius={10}
            >
              {starData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} className="hover:opacity-80 transition-opacity duration-300 outline-none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Dynamic Center Label */}
        <div className="absolute top-[43%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
           <span className="text-4xl font-black text-zinc-900 tracking-tighter">{totalStars}</span>
           <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Total Stars</span>
        </div>
      </div>


      {/* ---------------- RIGHT CHART: TECH STACK RINGS ---------------- */}
      <div className="h-90 bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm relative flex flex-col items-center group hover:border-violet-200 transition-colors duration-300">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest w-full text-left mb-2">
          Tech Stack Ecosystem
        </h3>
        
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            cx="40%" // Shifted slightly left to leave room for the legend
            cy="50%" 
            innerRadius="30%" 
            outerRadius="100%" 
            barSize={14} 
            data={langData}
            startAngle={180} // Starts the rings at the bottom
            endAngle={-180}
          >
            <RadialBar
              background={{ fill: '#f4f4f5' }} // Creates the empty ring track
              dataKey="value"
              cornerRadius={10}
            />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
            
            {/* Legend for the languages */}
            <Legend 
              iconSize={12} 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              formatter={(value, entry: any) => (
                <span className="text-zinc-700 font-semibold text-sm ml-2">{entry.payload.name}</span>
              )}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}