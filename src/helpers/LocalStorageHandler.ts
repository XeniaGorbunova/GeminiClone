export class localStorageHandler {
  public static PREV_PROMPTS_STORAGE_KEY = "prevPrompts";

  public static savePrevPrompts(prevPrompts: string[]): void {
    localStorage.setItem(
      this.PREV_PROMPTS_STORAGE_KEY,
      JSON.stringify(prevPrompts)
    );
  }

  public static getPrevPrompts(): string[] {
    const promptsFromStorage = localStorage.getItem(this.PREV_PROMPTS_STORAGE_KEY);

    return promptsFromStorage ? JSON.parse(promptsFromStorage) : [];
  }
}