# ElevenLabs AI Voice Generator

A simple React application for generating AI voices using the ElevenLabs API with secure API key handling.

## Security Improvements

This version includes important security enhancements:

- **⚠️ API Key Protection**: The ElevenLabs API key is no longer exposed in client-side code
- **Server-side Proxy**: All requests to ElevenLabs API go through secure Cloudflare Functions
- **Environment Variables**: API key is stored securely in Cloudflare Pages environment variables

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

## Local Development

1. Clone this repository
2. Install dependencies: `bun install`
3. Start the development server: `bun run dev`

Note: For local development, you'll need to run the app with Wrangler to test Cloudflare Functions:
```
npm install -g wrangler
wrangler pages dev --binding ELEVENLABS_API_KEY=your_api_key_here -- npm run dev
```

## Deployment on Cloudflare Pages

1. Push your code to a GitHub repository
2. Create a new Cloudflare Pages project and connect it to your repository
3. During setup, add an environment variable:
   - Name: `ELEVENLABS_API_KEY`
   - Value: Your ElevenLabs API key
4. Deploy the application

This ensures your API key is securely stored in Cloudflare's environment and never exposed in client-side code.

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
- Cloudflare Pages Functions

## Credits

Made with ❤️ by Ruyi
Security enhancements added to keep API keys safe
