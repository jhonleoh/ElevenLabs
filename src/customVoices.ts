// Custom voices configuration
export interface CustomVoice {
  voice_id: string;
  name: string;
  description?: string;
}

// Add your custom voices here
export const customVoices: CustomVoice[] = [
  // Example custom voice - you can add your own by following this format
  {
    voice_id: "pNInz6obpgDQGcFmaJgB",
    name: "Adam",
    description: "Adam (Legacy)"
  },
  // Add more custom voices below:
  // {
  //   voice_id: "custom-voice-id-here",
  //   name: "My Custom Voice",
  //   description: "Optional description of this voice"
  // }
];

// Function to get combined voices (API voices + custom voices)
export const getCombinedVoices = (apiVoices: CustomVoice[]) => {
  return [...apiVoices, ...customVoices];
};
