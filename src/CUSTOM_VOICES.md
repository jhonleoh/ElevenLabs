# Custom Voices Guide

This guide explains how to add your own custom voices to the ElevenLabs AI Voice Generator application.

## Adding Custom Voices

Custom voices can be added by editing the `src/customVoices.ts` file. This file contains an array where you can add your own voice models that will be available alongside the regular ElevenLabs voices.

### How to Add a Voice

1. Open the `src/customVoices.ts` file in your code editor
2. Locate the `customVoices` array in the file
3. Add a new entry to the array with the following format:

```typescript
{
  voice_id: "your-custom-voice-id",
  name: "Your Custom Voice Name",
  description: "Optional description of this voice"
}
```

### Example

Here's an example of how the file might look after adding some custom voices:

```typescript
export const customVoices: CustomVoice[] = [
  {
    voice_id: "custom-voice-1",
    name: "Deep Male Voice",
    description: "Deep male voice with British accent"
  },
  {
    voice_id: "custom-voice-2",
    name: "Young Female Voice",
    description: "Young female voice with American accent"
  }
];
```

## Important Notes

- Each `voice_id` must be unique
- The `voice_id` is what will be sent to the ElevenLabs API when generating speech
- Custom voices are automatically included alongside the API voices
- Custom voices will appear alongside API voices in the dropdown menu
- If the ElevenLabs API is unavailable but you have custom voices configured, the app will still function with just your custom voices

## Voice IDs from ElevenLabs

If you have access to additional ElevenLabs voice models not available in the public API, you can add their IDs here. You'll need:

1. The voice ID from ElevenLabs
2. A display name for the voice

You can obtain voice IDs from your ElevenLabs account or from the ElevenLabs API response.
