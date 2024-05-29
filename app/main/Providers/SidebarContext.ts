import { create } from 'zustand'

interface SidebarState {
  selected: number;
  setSelected: (index: number) => void;
}

export const useSidebar = create<SidebarState>((set) => ({
  selected: 0,
  setSelected: (index: number) => set(() => ({ selected: index }))
}))