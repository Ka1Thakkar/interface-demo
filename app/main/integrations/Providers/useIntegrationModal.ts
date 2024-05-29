import { StaticImageData } from 'next/image';
import { create } from 'zustand'

interface ModalState {
  isOpen: boolean;
  integrationName : string;
  image : StaticImageData|string;
  toggleOpen: (isOpen: boolean) => void;
  setIntegrationName : (integrationName : string) => void;
  setImage : (image : StaticImageData) => void;
}

export const useIntegrationModal = create<ModalState>((set) => ({
  isOpen: false,
  integrationName : '',
  image : "undefined",
  toggleOpen: (isOpen: boolean) => set(() => ({ isOpen })),
  setIntegrationName : (integrationName : string) => set(() => ({ integrationName })),
  setImage : (image : StaticImageData) => set(() => ({ image }))
}))