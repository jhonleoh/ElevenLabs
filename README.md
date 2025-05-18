# ElevenLabs AI Voice Generator

A simple React application for generating AI voices using the ElevenLabs API.

## Features

- Generate high-quality AI voices using ElevenLabs models
- Use custom voice models defined in a separate file
- No API calls to fetch voices - complete control over available voices
- Choose between different quality models:
  - Multilingual v2 (higher quality, multiple languages)
  - Flash v2.5 (faster generation)
- Download generated audio files

## Custom Voices

This application uses only custom-defined voices rather than fetching them from the ElevenLabs API. This gives you complete control over which voices appear in the dropdown menu.

You can:
- Define which ElevenLabs voice IDs are available in the app
- Set custom names for each voice

All voices are defined in the `src/customVoices.ts` file, which includes several example voices that you can use or replace with your own.

For detailed instructions on managing custom voices, see [CUSTOM_VOICES.md](src/CUSTOM_VOICES.md).

## Setup

1. Clone this repository
2. Create a `.env` file in the root directory with your ElevenLabs API key:
   ```
   VITE_ELEVENLABS_API_KEY=your_api_key_here
   ```
3. Install dependencies: `bun install`
4. Start the development server: `bun run dev`

## Usage

1. Select a voice from the dropdown menu
2. Enter the text you want to convert to speech
3. Choose a model quality (Multilingual v2 or Flash v2.5)
4. Click "Generate Voice" to create the audio
5. Play the generated audio directly in the app
6. Download the audio file if desired

## Technologies

- React
- TypeScript
- Vite
- Tailwind CSS

## Credits

Made with ❤️ by Ruyi
