'use client'
import { create } from 'zustand'
import { User } from '@supabase/supabase-js';


interface ModalState {
  User: User;
  setUser: (user: User) => void;
  userCredits: number;
  setUserCredits: (credits: number) => void;
  userFullName: string;
  setUserFullName: (name: string) => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
}
export const useUser = create<ModalState>((set) => ({
    User: undefined as unknown as User,
    setUser: (user: User) => set((state) => ({...state, user})),
    userCredits: 0,
    setUserCredits: (credits: number) => set((state) => ({...state, userCredits: credits})),
    userFullName: '',
    setUserFullName: (name: string) => set((state) => ({...state, userFullName: name})),
    userEmail: '',
    setUserEmail: (email: string) => set((state) => ({...state, userEmail: email})),
}))

