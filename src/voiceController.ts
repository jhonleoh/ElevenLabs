import { CustomVoice, customVoices } from './customVoices';

// Voice controller to handle operations related to voices
export class VoiceController {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Get API key
  public getApiKey(): string {
    return this.apiKey;
  }

  // Set API key
  public setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  // Fetch voices from API, always including custom voices
  public async fetchVoices(): Promise<{voices: CustomVoice[], success: boolean}> {
    try {
      // If no API key but we have custom voices, return only custom voices
      if (!this.apiKey && customVoices.length > 0) {
        return { voices: customVoices, success: true };
      }

      // If no API key and no custom voices, return empty array
      if (!this.apiKey) {
        return { voices: [], success: false };
      }

      // Fetch voices from API
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'xi-api-key': this.apiKey
        }
      });

      if (!response.ok) {
        // If API request failed but we have custom voices
        if (customVoices.length > 0) {
          return { voices: customVoices, success: true };
        }
        throw new Error('Failed to fetch voices');
      }

      const data = await response.json();
      // Always combine API voices with custom voices
      const combinedVoices = this.combineVoices(data.voices || []);

      return { voices: combinedVoices, success: true };
    } catch (error) {
      console.error('Error fetching voices:', error);

      // If there's an error but we have custom voices
      if (customVoices.length > 0) {
        return { voices: customVoices, success: true };
      }

      return { voices: [], success: false };
    }
  }

  // Generate voice from text
  public async generateVoice(
    voiceId: string,
    text: string,
    modelId: string
  ): Promise<{ audioUrl: string | null, success: boolean, error: string | null }> {
    try {
      if (!this.apiKey || !voiceId || !text) {
        return {
          audioUrl: null,
          success: false,
          error: 'Missing required parameters'
        };
      }

      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'xi-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          model_id: modelId,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Voice generation failed');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      return {
        audioUrl,
        success: true,
        error: null
      };
    } catch (error) {
      console.error('Error generating voice:', error);

      return {
        audioUrl: null,
        success: false,
        error: error instanceof Error ? error.message : 'Voice generation failed'
      };
    }
  }

  // Check if a voice is a custom voice
  public isCustomVoice(voiceId: string): boolean {
    return customVoices.some(voice => voice.voice_id === voiceId);
  }

  // Private method to combine API voices with custom voices
  private combineVoices(apiVoices: CustomVoice[]): CustomVoice[] {
    // Create a map of existing voice IDs to avoid duplicates
    const voiceMap = new Map<string, CustomVoice>();

    // Add API voices to the map
    apiVoices.forEach(voice => {
      voiceMap.set(voice.voice_id, voice);
    });

    // Add custom voices to the map (will override any duplicates from API)
    customVoices.forEach(voice => {
      voiceMap.set(voice.voice_id, voice);
    });

    // Convert map values back to array
    return Array.from(voiceMap.values());
  }
}
