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

  // Fetch voices - now only returns custom voices
  public async fetchVoices(): Promise<{voices: CustomVoice[], success: boolean}> {
    try {
      // Only return custom voices, skip API call entirely
      if (customVoices.length > 0) {
        return { voices: customVoices, success: true };
      } else {
        // If no custom voices are defined, return empty array
        return { voices: [], success: false };
      }
    } catch (error) {
      console.error('Error fetching voices:', error);
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

  // Check if a voice is a custom voice - now always returns true since we only use custom voices
  public isCustomVoice(voiceId: string): boolean {
    return true; // All voices are now custom
  }
}
