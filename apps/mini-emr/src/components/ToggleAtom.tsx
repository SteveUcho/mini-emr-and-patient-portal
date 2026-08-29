"use client";

import { modalBuilderAtom } from "@/utils/atoms";
import {  useSetAtom } from "jotai";
import { Children, cloneElement, ReactElement } from "react";

interface ToggleModalProps {
  data?: any;
  config: any;
  children: ReactElement;
}

export function ToggleModal({ data, config, children }: Readonly<ToggleModalProps>) {
  const toggleAtom = useSetAtom(modalBuilderAtom);

  const child = Children.only(children);

  return cloneElement(child, {
    onClick: () => {
      toggleAtom((prev) => ({ ...prev, isOpen: !prev.isOpen, data, config }));
    }
  } as any);
}