import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");


export interface GithubRepo {
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
}


export interface AiAnalysis {
  title: string;
  summary: string;
  strengths: string[];
  improvement: string;
}


export const fetchGitHubData = async (username: string): Promise<GithubRepo[]> => {
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=5`);
  if (!response.ok) throw new Error("User not found or API limit hit");
  return response.json();
};


export const generateAiRemark = async (repos: GithubRepo[]): Promise<AiAnalysis> => {
  try {
    
    console.log("DEBUG - API Key Status:", process.env.NEXT_PUBLIC_GEMINI_API_KEY ? "KEY IS FOUND" : "KEY IS MISSING!!!");

    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash", 
      generationConfig: { responseMimeType: "application/json" } 
    });

    const repoSummary = repos.map(r => `${r.name} (${r.language || "Unknown"}): ${r.description}`).join(" | ");
    
    const prompt = `You are a Principal Software Engineer conducting an architectural review of a candidate's GitHub portfolio.
    Here are their top 5 repositories: ${repoSummary}.
    
    Analyze their technical stack, coding focus, and system design patterns.
    Return a strictly valid JSON object following this exact schema. Do not include markdown formatting, do not include the word json. Just the raw braces:
    {
      "title": "A highly professional, 3-to-4 word technical title for this developer",
      "summary": "A 3-sentence deep-dive evaluation of their profile.",
      "strengths": ["A specific technical strength identified", "Another specific technical strength"],
      "improvement": "One highly advanced, professional recommendation to level up."
    }`;

    
    console.log("DEBUG - Sending request to Gemini...");
    const result = await model.generateContent(prompt);
    
    let text = result.response.text();
    
    
    console.log("DEBUG - Raw Gemini Response:", text);
    
    text = text.replace(/```json/gi, "").replace(/```/gi, "").trim();
    return JSON.parse(text);
    
  } catch (error) {
    
    console.error("DEBUG - THE EXACT ERROR IS:", error);
    throw new Error("Failed to generate AI summary.");
  }
};