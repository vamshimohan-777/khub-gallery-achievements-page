import { Achievement, Photo } from "../data/paradigms";

export async function fetchParadigmScrape(id: string): Promise<{ achievements: Achievement[], photos: Photo[], siteUrl: string }> {
  // Use absolute URL to the backend
  const response = await fetch(`http://localhost:5000/api/paradigms/${id}/scrape`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch paradigm data");
  }
  
  return response.json();
}
