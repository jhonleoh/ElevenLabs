import fetch from 'node-fetch';

export const handler = async function (event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the JSON body
    const body = JSON.parse(event.body);
    const { voiceId, text, modelId } = body;

    // Get the API key from environment variables
    const apiKey = process.env.VITE_ELEVENLABS_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error: Missing API key' })
      };
    }

    if (!voiceId || !text || !modelId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required parameters' })
      };
    }

    // Make the request to ElevenLabs API
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        model_id: modelId,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      }),
    });

    // If the request failed, return the error
    if (!response.ok) {
      const errorData = await response.json();
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: errorData.detail || 'Voice generation failed',
          detail: errorData.detail
        })
      };
    }

    // Get the audio data
    const audioBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(audioBuffer);

    // Return the audio data
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length.toString(),
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true
    };
  } catch (error) {
    console.error('Server Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error: ' + (error.message || 'Unknown error') })
    };
  }
};
