import { atom } from "jotai";
import { ModalConfig } from "@/components/ModalBuilder";

interface ModalBuilderState {
  isOpen: boolean;
  data?: Record<string, any>;
  config: ModalConfig | null;
}

export const modalBuilderAtom = atom<ModalBuilderState>({ isOpen: false, config: null });
