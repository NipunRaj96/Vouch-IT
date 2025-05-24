import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key
// Note: In production, use environment variables
let apiKey = '';
let genAI: GoogleGenerativeAI | null = null;

export const initializeGeminiAPI = (key: string) => {
  apiKey = key;
  genAI = new GoogleGenerativeAI(apiKey);
};

export const analyzeSentiment = async (reviewText: string): Promise<'positive' | 'negative' | 'neutral'> => {
  if (!genAI) {
    console.error('Gemini API not initialized');
    return 'neutral';
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Analyze the sentiment of the following product review and respond with ONLY "positive", "negative", or "neutral".
                         Review: "${reviewText}"`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text.toLowerCase().trim();
    
    if (text.includes('positive')) {
      return 'positive';
    } else if (text.includes('negative')) {
      return 'negative';
    } else {
      return 'neutral';
    }
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    return 'neutral';
  }
};

export const isGeminiInitialized = () => {
  return !!genAI;
};