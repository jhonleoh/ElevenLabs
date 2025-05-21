// Handle CORS preflight requests for all API endpoints

export async function onRequest(context) {
  const request = context.request;

  // Handle CORS preflight request
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, xi-api-key",
        "Access-Control-Max-Age": "86400"
      }
    });
  }

  // Pass through to actual handler
  return context.next();
}
