# Custom Voices Guide

This guide explains how to add your own custom voices to the ElevenLabs AI Voice Generator application.

## Adding Custom Voices

The application is now configured to use only custom voices defined in the `src/customVoices.ts` file, rather than fetching voices from the ElevenLabs API. This gives you complete control over which voices appear in the dropdown.

### How to Add a Voice

1. Open the `src/customVoices.ts` file in your code editor
2. Locate the `customVoices` array in the file
3. Add a new entry to the array with the following format:

```typescript
{
  voice_id: "your-custom-voice-id",
  name: "Your Custom Voice Name"
}
```

### ElevenLabs Voice IDs

The file contains several example voices with ElevenLabs voice IDs. You can:

1. Use these example voices as is
2. Replace them with your own preferred ElevenLabs voice IDs
3. Add your own custom voice IDs to the list

### Example

Here's an example of how the file might look after customizing:

```typescript
export const customVoices: CustomVoice[] = [
  {
    voice_id: "21m00Tcm4TlvDq8ikWAM",
    name: "Rachel"
  },
  {
    voice_id: "my-custom-voice-1",
    name: "My Custom Voice"
  }
];
```

## Important Notes

- Each `voice_id` must be unique
- The `voice_id` is what will be sent to the ElevenLabs API when generating speech
- The application will only display voices defined in the customVoices.ts file
- You must have a valid ElevenLabs API key to generate speech with these voice IDs
- Make sure the voice IDs you use are valid and accessible with your API key

## Voice IDs from ElevenLabs

You can find voice IDs from your ElevenLabs account or from the ElevenLabs API. The example IDs included are some of the standard voices from ElevenLabs, but you should replace them with voices you have access to with your API key.
