declare module "react-speech-recognition" {
  export interface SpeechRecognitionOptions {
    continuous?: boolean;
    language?: string;
  }

  export interface UseSpeechRecognitionOptions {
    commands?: any[];
  }

  export interface UseSpeechRecognitionResult {
    transcript: string;
    listening: boolean;
    resetTranscript: () => void;
    browserSupportsSpeechRecognition: boolean;
  }

  const SpeechRecognition: {
    startListening: (options?: SpeechRecognitionOptions) => void;
    stopListening: () => void;
  };

  export function useSpeechRecognition(
    options?: UseSpeechRecognitionOptions
  ): UseSpeechRecognitionResult;

  export default SpeechRecognition;
}
