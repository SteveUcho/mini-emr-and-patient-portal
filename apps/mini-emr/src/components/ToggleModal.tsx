"use client";

import { modalAtom } from "@/utils/atoms";
import {  useSetAtom } from "jotai";
import { Children, cloneElement, ReactElement } from "react";
import { ModalKey } from "@/utils/modalConfigs";

interface ToggleModalProps {
  modalId: ModalKey;
  data?: any;
  children: ReactElement;
}

export function ToggleModal({ modalId, data, children }: Readonly<ToggleModalProps>) {
  const toggleAtom = useSetAtom(modalAtom);

  const childrenArray = Children.toArray(children);
  const child = childrenArray[0] as ReactElement; 

  return cloneElement(child, {
    onClick: () => {
      toggleAtom((prev) => ({ ...prev, data, id: modalId }));
    }
  } as any);
}