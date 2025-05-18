import { useState, useEffect } from 'react';
import { CustomVoice } from './customVoices';
import { VoiceController } from './voiceController';

interface Model {
  id: string;
  name: string;
  description: string;
}

function App() {
  // Use environment variable for API key
  const [apiKey, setApiKey] = useState<string>(import.meta.env.VITE_ELEVENLABS_API_KEY || '');
  const [voices, setVoices] = useState<CustomVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('eleven_multilingual_v2');
  const [serverStatus, setServerStatus] = useState<'up' | 'down'>('up');
  const [showCustomVoiceMessage, setShowCustomVoiceMessage] = useState(false);
  const [showWarningMessage, setShowWarningMessage] = useState(true);

  // Create voice controller
  const [voiceController] = useState<VoiceController>(new VoiceController(apiKey));

  const models: Model[] = [
    {
      id: 'eleven_multilingual_v2',
      name: 'Multilingual v2',
      description: 'Higher quality, supports multiple languages'
    },
    {
      id: 'eleven_turbo_v2',
      name: 'Flash v2.5',
      description: 'Faster generation speed'
    }
  ];

  // Fetch available voices when component mounts
  useEffect(() => {
    fetchVoices();
  }, []);

  // Update API key in controller when it changes
  useEffect(() => {
    voiceController.setApiKey(apiKey);
  }, [apiKey, voiceController]);

  // Clear generated audio when inputs change
  useEffect(() => {
    setGeneratedAudio(null);
  }, [inputText, selectedVoice, selectedModel]);

  const fetchVoices = async () => {
    try {
      setIsLoading(true);

      const result = await voiceController.fetchVoices();

      if (result.success) {
        setVoices(result.voices);
        setServerStatus('up');
      } else {
        setServerStatus('down');
      }

      setIsLoading(false);
    } catch (err) {
      setServerStatus('down');
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

      const result = await voiceController.generateVoice(
        selectedVoice,
        inputText,
        selectedModel
      );

      if (result.success) {
        setGeneratedAudio(result.audioUrl);
      } else {
        setError(result.error || 'Voice generation failed. Please try again.');
      }

      setIsLoading(false);
    } catch (err) {
      setError('Voice generation failed. Please try again.');
      setIsLoading(false);
      console.error(err);
    }
  };

  const renderWaveform = () => {
    const bars = [];
    for (let i = 0; i < 30; i++) {
      const height = Math.floor(Math.random() * 100);
      bars.push(
        <div
          key={i}
          className="waveform-bar"
          style={{ height: `${Math.max(10, height)}%` }}
        ></div>
      );
    }
    return bars;
  };

  const handleCustomVoiceClick = () => {
    setShowCustomVoiceMessage(!showCustomVoiceMessage);
  };

  const closeWarningMessage = () => {
    setShowWarningMessage(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6">
      <div className="container-md">
        <h1 className="app-header">ElevenLabs AI Voice Generator</h1>

        {/* Responsible Usage Warning */}
        {showWarningMessage && (
          <div className="mb-6 relative p-5 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-xl shadow-md">
            <button
              onClick={closeWarningMessage}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <p className="text-yellow-800 dark:text-yellow-300 font-medium">⚠️ Responsible Usage Warning</p>
            <p className="text-yellow-700 dark:text-yellow-400 text-sm mt-1">
              Please use this service responsibly. Excessive or abusive usage may affect server availability
              for everyone. The server is maintained for legitimate use only.
            </p>
          </div>
        )}

        <div className="app-card">
          {/* Server Status - Only show when down */}
          {serverStatus === 'down' && (
            <div className="server-status-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="font-semibold">Server is Down</p>
                <p className="text-sm mt-1">
                  The ElevenLabs API server is currently unavailable. Please try again later.
                </p>
              </div>
            </div>
          )}

          {/* Voice & Model Selection Section */}
          <div className="mb-8">
            <h2 className="section-title">Voice Selection</h2>

            <div className="grid-responsive">
              <div className="space-y-2">
                <label htmlFor="voice-select" className="input-label">Select Voice</label>

                {isLoading && !voices.length ? (
                  <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-12 rounded-xl"></div>
                ) : voices.length > 0 ? (
                  <select
                    id="voice-select"
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
                  <div className="text-red-500 dark:text-red-400 text-sm py-3">
                    No voices available. Please check server status.
                  </div>
                )}

                {/* Custom Voice Button */}
                <button
                  onClick={handleCustomVoiceClick}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm mt-2 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Custom Voice
                </button>

                {/* Custom Voice Message */}
                {showCustomVoiceMessage && (
                  <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-sm">
                    <p className="font-medium text-blue-700 dark:text-blue-300">Custom Voice Options</p>
                    <p className="mt-1 text-blue-600 dark:text-blue-400">
                      You can add your own custom voices by editing the <code className="bg-blue-100 dark:bg-blue-800 px-1 py-0.5 rounded">customVoices.ts</code> file.
                    </p>
                    <p className="mt-1 text-blue-600 dark:text-blue-400">
                      If you want to request or add a custom voice, contact me in PHCORNER.
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <span className="input-label">Model Quality</span>
                <div className="grid grid-cols-2 gap-3">
                  {models.map((model) => (
                    <div
                      key={model.id}
                      className={`model-card ${selectedModel === model.id ? 'selected' : ''}`}
                      onClick={() => setSelectedModel(model.id)}
                    >
                      <h3 className="font-medium">{model.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {model.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Text Input Section */}
          <div className="mb-8">
            <h2 className="section-title">Enter Text</h2>
            <div className="w-full">
              <textarea
                value={inputText}
                onChange={handleTextChange}
                placeholder="Type or paste the text you want to convert to speech..."
                className="text-area"
              />
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span>{inputText.length} characters</span>
                {inputText.length > 500 && (
                  <span className="text-yellow-500 dark:text-yellow-400">
                    Long texts may take longer to process
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Generation Button */}
          <button
            onClick={handleGenerateVoice}
            disabled={!apiKey || !selectedVoice || !inputText || isLoading || serverStatus === 'down'}
            className="button-success w-full"
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
            <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl">
              {error}
            </div>
          )}

          {/* Generated Audio Result */}
          {generatedAudio && (
            <div className="mt-8 p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <h2 className="section-title">Generated Audio</h2>

              <div className="audio-waveform mb-4">
                {renderWaveform()}
              </div>

              <audio controls className="audio-player mb-4 w-full">
                <source src={generatedAudio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>

              <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
                <a
                  href={generatedAudio}
                  download="generated-audio.mp3"
                  className="button-primary text-center"
                >
                  Download Audio
                </a>
              </div>
            </div>
          )}
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Made with ❤️ by Ruyi</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
