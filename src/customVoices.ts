// Custom voices configuration
export interface CustomVoice {
  voice_id: string;
  name: string;
  description?: string; // Kept as optional but not used
}

// Add your custom voices here
export const customVoices: CustomVoice[] = [
  // Example custom voices - replace with your own ElevenLabs voice IDs
  {
    voice_id: "21m00Tcm4TlvDq8ikWAM",
    name: "Rachel"
  },
  {
    voice_id: "AZnzlk1XvdvUeBnXmlld",
    name: "Domi"
  },
  {
    voice_id: "EXAVITQu4vr4xnSDxMaL",
    name: "Bella"
  },
  {
    voice_id: "ErXwobaYiN019PkySvjV",
    name: "Antoni"
  },
  {
    voice_id: "MF3mGyEYCl7XYWbV9V6O",
    name: "Elli"
  },
  {
    voice_id: "TxGEqnHWrfWFTfGW9XjX",
    name: "Josh"
  },
  {
    voice_id: "VR6AewLTigWG4xSOukaG",
    name: "Arnold"
  },
  {
    voice_id: "pNInz6obpgDQGcFmaJgB",
    name: "Adam"
  },
  {
    voice_id: "yoZ06aMxZJJ28mfd3POQ",
    name: "Sam"
  },
  {
    voice_id: "nPczCjzI2devNBz1zQrb",
    name: "Brian"
  },
  {
    voice_id: "1wg2wOjdEWKA7yQD8Kca",
    name: "Father Christmas"
  },
  {
    voice_id: "bIHbv24MWmeRgasZH58o",
    name: "Will"
  },
  {
    voice_id: "qNkzaJoHLLdpvgh5tISm",
    name: "Carter"
  },
  // Add your own custom voices below:
  // {
  //   voice_id: "your-custom-voice-id-here",
  //   name: "Your Custom Voice"
  // }
];

// Function to get combined voices (no longer used but kept for reference)
export const getCombinedVoices = (apiVoices: CustomVoice[]) => {
  return customVoices; // Now just returns custom voices
};
