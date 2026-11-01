import { create } from 'zustand';
import type { ConsultInput } from '@/utils/diagnose';

interface ConsultState {
  step: number;
  bodyPartId: string;
  description: string;
  companionIds: string[];
  duration: string;
  severity: string;
  setStep: (s: number) => void;
  setBodyPart: (id: string) => void;
  setDescription: (d: string) => void;
  toggleCompanion: (id: string) => void;
  clearCompanions: () => void;
  setDuration: (d: string) => void;
  setSeverity: (s: string) => void;
  reset: () => void;
  getInput: () => ConsultInput;
  canProceed: () => boolean;
}

const initialState = { step: 0, bodyPartId: '', description: '', companionIds: [] as string[], duration: '', severity: '' };

export const useConsultStore = create<ConsultState>((set, get) => ({
  ...initialState,
  setStep: (s) => set({ step: s }),
  setBodyPart: (id) => set({ bodyPartId: id }),
  setDescription: (d) => set({ description: d }),
  toggleCompanion: (id) =>
    set((state) => ({
      companionIds: state.companionIds.includes(id)
        ? state.companionIds.filter((x) => x !== id)
        : [...state.companionIds, id],
    })),
  clearCompanions: () => set({ companionIds: [] }),
  setDuration: (d) => set({ duration: d }),
  setSeverity: (s) => set({ severity: s }),
  reset: () => set({ ...initialState }),
  getInput: () => {
    const s = get();
    return { bodyPartId: s.bodyPartId, description: s.description, companionIds: s.companionIds, duration: s.duration, severity: s.severity };
  },
  canProceed: () => {
    const s = get();
    switch (s.step) {
      case 0: return !!s.bodyPartId;
      case 1: return s.description.trim().length >= 5;
      case 2: return true;
      case 3: return !!s.duration;
      case 4: return !!s.severity;
      default: return false;
    }
  },
}));
