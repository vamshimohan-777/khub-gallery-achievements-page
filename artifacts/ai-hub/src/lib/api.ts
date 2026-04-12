import { Achievement, Photo } from "../data/paradigms";

export async function fetchParadigmScrape(id: string): Promise<{ achievements: Achievement[], photos: Photo[], siteUrl: string }> {
  // Use relative URL - same origin as frontend
  const response = await fetch(`/api/paradigms/${id}/scrape`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch paradigm data");
  }
  
  return response.json();
}
