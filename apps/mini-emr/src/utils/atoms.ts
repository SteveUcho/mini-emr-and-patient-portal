import { atom } from "jotai";

interface ModalState {
  id?: string;
  data?: Record<string, any>;
}

export const modalAtom = atom<ModalState>({});
export const expandedRowsAtom = atom<Set<string>>(new Set<string>());