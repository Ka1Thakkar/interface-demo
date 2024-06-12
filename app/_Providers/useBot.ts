import { StaticImageData } from 'next/image';
import { create } from 'zustand'
import Olivia from '@/public/Agent_Olivia.png'
import Rio from '@/public/Agent_Rio.png'
import Astrid from '@/public/Agent_Astrid.png'

interface ModalState {
  botName : string;
  botRole : string;
  setBotName : (botName : string) => void;
  setBotRole : (botRole : string) => void;
  botImage : StaticImageData;
  setBotImage : (botImage : StaticImageData) => void;
  images : StaticImageData[];
  setImages : (images : StaticImageData[]) => void;
}


export const useBot = create<ModalState>((set) => ({
    botName : "Olivia",
    botRole : "Data Entry Agent",
    setBotName : (botName : string) => set(() => ({ botName })),
    setBotRole : (botRole : string) => set(() => ({ botRole })),
    botImage : Olivia,
    setBotImage : (botImage : StaticImageData) => set(() => ({ botImage })),
    images : [Olivia, Astrid, Rio],
    setImages : (images : StaticImageData[]) => set(() => ({ images })),
}))