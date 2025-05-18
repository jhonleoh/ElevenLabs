# ElevenLabs AI Voice Generator

A web application that allows you to generate speech from text using the ElevenLabs text-to-speech API.

## Features

- Connect to the ElevenLabs API using environment variables
- Browse and select from available ElevenLabs voice models
- Choose between different AI voice models
- Enter text to convert to speech
- Generate high-quality AI voice audio
- Play generated audio directly in browser
- Download generated audio files

## Getting Started

### Prerequisites

- An ElevenLabs API key (sign up at [ElevenLabs](https://elevenlabs.io))
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone this repository
2. Install dependencies with:
```
bun install
```
3. Create a `.env` file in the root directory with your ElevenLabs API key:
```
VITE_ELEVENLABS_API_KEY=your_api_key_here
```
4. Start the development server:
```
bun run dev
```
5. Open your browser and navigate to http://localhost:5173

## Deployment

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. In Netlify dashboard, go to Site settings > Environment variables
3. Add a new variable:
   - Key: `VITE_ELEVENLABS_API_KEY`
   - Value: Your ElevenLabs API key

### Deploy to Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. In the Pages dashboard, go to Settings > Environment variables
3. Add a new variable:
   - Key: `VITE_ELEVENLABS_API_KEY`
   - Value: Your ElevenLabs API key
4. Save and deploy

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. In the Vercel dashboard, go to Settings > Environment Variables
3. Add a new variable:
   - Key: `VITE_ELEVENLABS_API_KEY`
   - Value: Your ElevenLabs API key
4. Save and deploy

## Usage

1. Select a voice model from the dropdown menu
2. Choose an AI model (Multilingual v2 for quality, Flash v2.5 for speed)
3. Enter the text you want to convert to speech
4. Click "Generate Voice" to process your text
5. Once generation is complete, you can play the audio or download it

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS

## API Reference

This application uses the [ElevenLabs API](https://api.elevenlabs.io/docs) for text-to-speech conversion.

### Key Endpoints:

- `/v1/voices` - Get available voices
- `/v1/text-to-speech/{voice_id}` - Generate speech from text using a specific voice

## Privacy

Your API key is stored as an environment variable and never exposed to the client. All API requests are made directly from your browser to ElevenLabs' servers.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [ElevenLabs](https://elevenlabs.io) for their amazing voice AI technology
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
