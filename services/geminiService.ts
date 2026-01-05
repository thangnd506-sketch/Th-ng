
import { GoogleGenAI, Type } from "@google/genai";
import { TripPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateTripPlan = async (params: {
  days: number;
  budget: 'budget' | 'medium' | 'luxury';
  interests: string[];
  transport: string;
  accommodation: string;
  people: string;
}): Promise<TripPlan | null> => {
  try {
    const prompt = `Create a detailed Vietnam travel itinerary for ${params.days} days. 
    Budget Level: ${params.budget}. 
    Interests: ${params.interests.join(', ')}. 
    Transport: ${params.transport}. 
    Accommodation: ${params.accommodation}. 
    Traveling with: ${params.people}.
    Please provide a day-by-day plan with specific locations, timing, and estimated costs in VND.
    Also include 3 important travel tips for this specific trip.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            itinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER },
                  activities: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        time: { type: Type.STRING },
                        description: { type: Type.STRING },
                        location: { type: Type.STRING },
                        cost: { type: Type.NUMBER }
                      },
                      required: ["time", "description", "location", "cost"]
                    }
                  }
                },
                required: ["day", "activities"]
              }
            },
            totalBudget: { type: Type.NUMBER },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["itinerary", "totalBudget", "tips"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result as TripPlan;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};

export interface MapDiscoveryResult {
  text: string;
  places: { title: string; uri: string }[];
}

export const searchVietnamPlaces = async (query: string, location?: { lat: number, lng: number }): Promise<MapDiscoveryResult | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Search for this in Vietnam: ${query}`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: location ? { latitude: location.lat, longitude: location.lng } : undefined
          }
        }
      },
    });

    const places = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter((chunk: any) => chunk.maps)
      ?.map((chunk: any) => ({
        title: chunk.maps.title,
        uri: chunk.maps.uri
      })) || [];

    return {
      text: response.text || "Here's what I found on Google Maps.",
      places: places
    };
  } catch (error) {
    console.error("Maps Grounding Error:", error);
    return null;
  }
};
