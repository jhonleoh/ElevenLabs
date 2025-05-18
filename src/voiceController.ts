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
  public async fetchVoices(): Promise<{ voices: CustomVoice[], success: boolean }> {
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

  // Generate voice from text using server-side API proxy
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

      // Instead of sending the API key directly in the client-side request,
      // call a server-side API endpoint that will make the request to ElevenLabs
      const response = await fetch('/api/generate-voice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voiceId: voiceId,
          text: text,
          modelId: modelId,
        }),
      });

      if (!response.ok) {
        // Try to parse error as JSON if possible
        let errorMessage = 'Voice generation failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.detail || errorMessage;
        } catch (e) {
          errorMessage = `Voice generation failed: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      // Since we're expecting binary audio data, not JSON, use blob() directly
      const audioBlob = await response.blob();

      // Check if we got a valid audio blob
      if (!audioBlob || audioBlob.size === 0) {
        throw new Error('Received empty audio data from server');
      }

      // Create a URL for the audio blob
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
