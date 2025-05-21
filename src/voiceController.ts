import { CustomVoice, customVoices } from './customVoices';

// Voice controller to handle operations related to voices
export class VoiceController {
  constructor() {
    // No need to store API key in frontend code
  }

  // These methods are kept for backward compatibility but no longer store the key
  public getApiKey(): string {
    return '';
  }

  public setApiKey(_apiKey: string): void {
    // No-op, API key is now managed by server only
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

  // Generate voice from text using our secure proxy
  public async generateVoice(
    voiceId: string,
    text: string,
    modelId: string
  ): Promise<{ audioUrl: string | null, success: boolean, error: string | null }> {
    try {
      if (!voiceId || !text) {
        return {
          audioUrl: null,
          success: false,
          error: 'Missing required parameters'
        };
      }

      // Instead of direct API call with key, use our secure proxy endpoint
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          voiceId: voiceId,
          modelId: modelId
        }),
      });

      if (!response.ok) {
        let errorMessage = 'Voice generation failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          // If response parsing fails, use generic error
        }
        throw new Error(errorMessage);
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
