# ElevenLabs AI Voice Generator

A simple React application for generating AI voices using the ElevenLabs API.

## Features

- Generate high-quality AI voices using ElevenLabs models
- Select from available ElevenLabs voices
- Add and use custom voice models
- Custom voices are automatically included with ElevenLabs voices
- Choose between different quality models:
  - Multilingual v2 (higher quality, multiple languages)
  - Flash v2.5 (faster generation)
- Download generated audio files

## Custom Voices

You can add custom voice models to the application by editing the `src/customVoices.ts` file. This allows you to:

- Add your own voices with custom IDs
- Maintain a separate list from the default ElevenLabs voices
- Custom voices appear alongside ElevenLabs voices in the dropdown

For detailed instructions on adding custom voices, see [CUSTOM_VOICES.md](src/CUSTOM_VOICES.md).

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
