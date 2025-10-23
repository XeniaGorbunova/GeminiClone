export interface AppContextType {
  prevPrompts: string[];
  setPrevPrompts: React.Dispatch<React.SetStateAction<string[]>>;
  onSent: (prompt: string) => Promise<void>;
  recentPrompt: string;
  setRecentPrompt: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  showResult: boolean;
  newChat: () => void;
}

export interface ResultContextType {
  resultData: string;
}

export interface ErrorContextType {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}