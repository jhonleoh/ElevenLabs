import { useState, useEffect } from 'react';

interface Voice {
  voice_id: string;
  name: string;
}

interface Model {
  id: string;
  name: string;
}

function App() {
  // Use environment variable for API key
  const [apiKey, setApiKey] = useState<string>(import.meta.env.VITE_ELEVENLABS_API_KEY || '');
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('eleven_multilingual_v2');

  const models: Model[] = [
    { id: 'eleven_multilingual_v2', name: 'Eleven Multilingual v2' },
    { id: 'eleven_turbo_v2', name: 'Eleven Flash v2.5' }
  ];

  // Fetch available voices when component mounts (API key is from env var)
  useEffect(() => {
    if (apiKey) {
      fetchVoices();
    } else {
      setError('No API key found. Please set the VITE_ELEVENLABS_API_KEY environment variable.');
    }
  }, []);

  // Clear generated audio when inputs change
  useEffect(() => {
    setGeneratedAudio(null);
  }, [inputText, selectedVoice, selectedModel]);

  const fetchVoices = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'xi-api-key': apiKey
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch voices');
      }

      const data = await response.json();
      setVoices(data.voices || []);
      setIsLoading(false);
    } catch (err) {
      setError('Error fetching voices. Please check your API key in environment variables.');
      setIsLoading(false);
      console.error(err);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleGenerateVoice = async () => {
    if (!apiKey || !selectedVoice || !inputText) {
      setError('Please select a voice and enter some text.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setGeneratedAudio(null); // Clear previous audio before generating new

      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}`, {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          model_id: selectedModel,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Voice generation failed');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setGeneratedAudio(audioUrl);
      setIsLoading(false);
    } catch (err) {
      setError('Voice generation failed. Please try again.');
      setIsLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8">ElevenLabs AI Voice Generator</h1>

        {/* API Key Status */}
        {!apiKey ? (
          <div className="mb-8 p-3 bg-yellow-100 text-yellow-800 rounded-md">
            <p className="font-semibold">API Key Not Found</p>
            <p className="text-sm mt-1">
              Please set the VITE_ELEVENLABS_API_KEY environment variable in your deployment platform.
            </p>
          </div>
        ) : (
          <div className="mb-8 p-3 bg-green-100 text-green-800 rounded-md">
            <p className="font-semibold">API Key Configured</p>
            <p className="text-sm mt-1">
              Using API key from environment variable.
            </p>
          </div>
        )}

        {/* Voice Selection Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Select Voice</h2>
          {isLoading && !voices.length ? (
            <p>Loading voices...</p>
          ) : voices.length > 0 ? (
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="select-voice"
            >
              <option value="">Select a voice</option>
              {voices.map((voice) => (
                <option key={voice.voice_id} value={voice.voice_id}>
                  {voice.name}
                </option>
              ))}
            </select>
          ) : (
            <p>No voices available. Please check your API key in environment variables.</p>
          )}
        </div>

        {/* Model Selection Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Select Model</h2>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="select-voice"
          >
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-2">
            Multilingual v2 is more accurate but slower. Flash v2.5 is faster but less accurate.
          </p>
        </div>

        {/* Text Input Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Enter Text</h2>
          <div className="w-full">
            <textarea
              value={inputText}
              onChange={handleTextChange}
              placeholder="Type or paste the text you want to convert to speech..."
              className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1 text-right">{inputText.length} characters</p>
          </div>
        </div>

        {/* Generation Button */}
        <button
          onClick={handleGenerateVoice}
          disabled={!apiKey || !selectedVoice || !inputText || isLoading}
          className={!apiKey || !selectedVoice || !inputText || isLoading
            ? "w-full py-3 rounded-md font-semibold bg-gray-300 cursor-not-allowed"
            : "button-success w-full py-3 rounded-md font-semibold"
          }
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <span className="loading-spinner"></span>
              Generating...
            </span>
          ) : (
            'Generate Voice'
          )}
        </button>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Generated Audio Result */}
        {generatedAudio && (
          <div className="mt-8 p-4 border border-gray-200 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Generated Audio</h2>
            <audio controls className="audio-player">
              <source src={generatedAudio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <div className="mt-4">
              <a
                href={generatedAudio}
                download="generated-audio.mp3"
                className="button-primary inline-block"
              >
                Download Audio
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
