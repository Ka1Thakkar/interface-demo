import { StaticImageData } from 'next/image';
import { create } from 'zustand'
import Olivia from '@/public/Agent_Olivia.png'
import Rio from '@/public/Agent_Rio.png'
import Astrid from '@/public/Agent_Astrid.png'
import { Message } from 'ai/react';
// import { Message } from 'ai';

interface ModalState {
  globalMessages : Message[];
  setGlobalMessages : (messages : Message[]) => void;
}
export const useMessages = create<ModalState>((set) => ({
    globalMessages: [{ id: (Math.random() + 1).toString(), role: "assistant", content: "Hey, I'm Olivia, you Data Entry Agent. I can add procurement bill invoices to procurement module of EagleOwl for you. Please share the invoice with me. Thanks!" }],
    setGlobalMessages: (messages: Message[]) => set((state) => ({...state, globalMessages: messages})),
}))

