import { create } from 'zustand';
import { MessageType } from '@/types';

interface State {
  chatMessages: MessageType[];
  setChatMessages: (chatMessages: MessageType[]) => void;
  resetChatMessages: () => void;
}

const useChatStore = create<State>((set) => ({
  chatMessages: [],
  setChatMessages: (chatMessages: MessageType[]) =>
    set(() => ({
      chatMessages,
    })),
  resetChatMessages: () =>
    set(() => ({
      chatMessages: [],
    })),
}));

export default useChatStore;
