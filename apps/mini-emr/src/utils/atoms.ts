import { atom } from "jotai";
import { ModalUser } from "../components/EditUserModal";

interface EditUserModalState {
  isOpen: boolean;
  data: {
    user?: ModalUser | null;
  };
}

export const editUserModalAtom = atom<EditUserModalState>({ isOpen: false, data: {} });
