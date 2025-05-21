// Cloudflare Pages Function to proxy ElevenLabs text-to-speech API
// This keeps the API key secure by storing it only on the server side

export async function onRequest(context) {
  // Get the request
  const request = context.request;

  // Only allow POST requests for security
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    // Get the request body
    const requestData = await request.json();
    const { text, voiceId, modelId } = requestData;

    // Validate required parameters
    if (!text || !voiceId || !modelId) {
      return new Response(JSON.stringify({ error: "Missing required parameters" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Get the API key from environment variable (securely stored in Cloudflare)
    const apiKey = context.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Prepare the request to ElevenLabs API
    const elevenlabsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

    const elevenlabsRequest = {
      method: "POST",
      headers: {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": apiKey
      },
      body: JSON.stringify({
        text: text,
        model_id: modelId,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      })
    };

    // Forward the request to ElevenLabs
    const elevenlabsResponse = await fetch(elevenlabsUrl, elevenlabsRequest);

    if (!elevenlabsResponse.ok) {
      const errorData = await elevenlabsResponse.json();
      return new Response(JSON.stringify({
        error: errorData.detail || "Voice generation failed"
      }), {
        status: elevenlabsResponse.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Return the audio data directly to the client
    return new Response(await elevenlabsResponse.arrayBuffer(), {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    console.error("Error in TTS proxy:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
