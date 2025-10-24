export interface Thread {
  prompt: string;
  result: string;
}

export interface AppContextType {
  prevThreads: Thread[][];
  setPrevThreads: React.Dispatch<React.SetStateAction<Thread[][]>>;
  onSent: (prompt: string) => Promise<void>;
  recentThread: Thread[];
  setRecentThread: React.Dispatch<React.SetStateAction<Thread[]>>;
  isLoading: boolean;
  showResult: boolean;
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
  newChat: () => void;
}

export interface ResultContextType {
  resultData: string;
}

export interface ErrorContextType {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}