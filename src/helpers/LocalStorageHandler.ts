import type { Thread } from "../context/models";

export class localStorageHandler {
  public static PREV_THREADS_STORAGE_KEY = "prevThreads";

  public static savePrevThreads(prevPrompts: Thread[][]): void {
    localStorage.setItem(
      this.PREV_THREADS_STORAGE_KEY,
      JSON.stringify(prevPrompts)
    );
  }

  public static getPrevThreads(): Thread[][] {
    const promptsFromStorage = localStorage.getItem(
      this.PREV_THREADS_STORAGE_KEY
    );

    return promptsFromStorage ? JSON.parse(promptsFromStorage) : [];
  }
}