import { GoogleGenAI, Modality } from "@google/genai";

// Cache for audio buffers to avoid re-fetching same words in a session
const audioCache = new Map<string, AudioBuffer>();

// Audio Context Singleton
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
      sampleRate: 24000 // Match Gemini TTS output rate usually
    });
  }
  return audioContext;
};

// Base64 decoding helper
const decode = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

// PCM Decoding helper
const decodeAudioData = async (
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1
): Promise<AudioBuffer> => {
  // If data is just raw PCM (no header), we need to handle it manually.
  // Gemini TTS output is often raw PCM 24kHz mono.
  
  // We'll treat it as Int16 Linear PCM
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i++) {
    // Convert Int16 (-32768 to 32767) to Float32 (-1.0 to 1.0)
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
};

export const playTextToSpeech = async (text: string): Promise<void> => {
  const ctx = getAudioContext();
  
  // Resume context if suspended (browser autoplay policy)
  if (ctx.state === 'suspended') {
    await ctx.resume();
  }

  // Check Cache
  if (audioCache.has(text)) {
    playBuffer(ctx, audioCache.get(text)!);
    return;
  }

  try {
    // Attempt Gemini TTS
    if (!process.env.API_KEY) {
      throw new Error("No API Key");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // We use a specific TTS model
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // Natural sounding voice
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (!base64Audio) throw new Error("No audio data received");

    const audioBytes = decode(base64Audio);
    const audioBuffer = await decodeAudioData(audioBytes, ctx, 24000, 1);
    
    // Cache it
    audioCache.set(text, audioBuffer);
    
    playBuffer(ctx, audioBuffer);

  } catch (error) {
    console.warn("Gemini TTS failed, falling back to browser Native TTS", error);
    playNativeTTS(text);
  }
};

const playBuffer = (ctx: AudioContext, buffer: AudioBuffer) => {
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start();
};

const playNativeTTS = (text: string) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Stop current
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9; // Slightly slower for learning
    window.speechSynthesis.speak(utterance);
  } else {
    console.error("No TTS available");
  }
};