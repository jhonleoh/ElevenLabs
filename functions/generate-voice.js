// Cloudflare Pages Function for ElevenLabs API proxy

export async function onRequest(context) {
  // Get the current request
  const { request, env } = context;

  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    // Parse the JSON body
    const body = await request.json();
    const { voiceId, text, modelId } = body;

    // Get the API key from environment variables
    const apiKey = env.VITE_ELEVENLABS_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Server configuration error: Missing API key' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    if (!voiceId || !text || !modelId) {
      return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    console.log(`Making request to ElevenLabs for voice ${voiceId} with model ${modelId}`);

    // Make the request to ElevenLabs API
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
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
      console.error(`ElevenLabs API error: ${response.status} ${response.statusText}`);
      let errorDetail;
      try {
        const errorData = await response.json();
        errorDetail = errorData.detail || 'Unknown error';
      } catch (e) {
        errorDetail = 'Could not parse error response';
      }

      return new Response(JSON.stringify({
        error: `Voice generation failed: ${response.status} ${response.statusText}`,
        detail: errorDetail
      }), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Get the audio data
    const audioData = await response.arrayBuffer();

    if (!audioData || audioData.byteLength === 0) {
      console.error('Received empty audio buffer from ElevenLabs');
      return new Response(JSON.stringify({ error: 'Received empty audio from ElevenLabs API' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    console.log(`Successfully generated audio: ${audioData.byteLength} bytes`);

    // Return the audio data with proper content type
    return new Response(audioData, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioData.byteLength.toString(),
        // Add CORS headers if needed
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (error) {
    console.error('Server Error:', error);

    return new Response(JSON.stringify({
      error: 'Server error: ' + (error.message || 'Unknown error')
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
