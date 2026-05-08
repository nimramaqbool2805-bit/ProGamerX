import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserSettings {
  device: string;
  skillLevel: string;
  playStyle: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface AppState {
  settings: UserSettings;
  setSettings: (settings: Partial<UserSettings>) => void;
  chatHistory: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  clearChat: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      settings: {
        device: 'PC',
        skillLevel: 'Beginner',
        playStyle: 'Tactical',
      },
      setSettings: (newSettings) =>
        set((state) => ({ settings: { ...state.settings, ...newSettings } })),
      chatHistory: [],
      addChatMessage: (message) =>
        set((state) => ({ chatHistory: [...state.chatHistory, message] })),
      clearChat: () => set({ chatHistory: [] }),
    }),
    {
      name: 'progamerx-storage',
    }
  )
);
