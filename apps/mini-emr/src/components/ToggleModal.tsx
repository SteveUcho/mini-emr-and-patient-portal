"use client";

import { Modal } from "@heroui/react";
import { useAtom, PrimitiveAtom } from "jotai";

interface ToggleModalProps {
  toggleAtom: PrimitiveAtom<boolean>;
  children: React.ReactNode;
}

export function ToggleModal({ toggleAtom, children }: Readonly<ToggleModalProps>) {
  const [isOpen, setIsOpen] = useAtom(toggleAtom);

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      {children}
    </Modal>
  );
}