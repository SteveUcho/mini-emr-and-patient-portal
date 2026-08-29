"use client";

import { PrimitiveAtom, useSetAtom } from "jotai";
import { Children, cloneElement, ReactElement } from "react";

interface ToggleAtomProps {
  atomToggle: PrimitiveAtom<{ isOpen: boolean; data: any }>;
  data: any;
  children: ReactElement;
}

export function ToggleAtom({ atomToggle, data, children }: Readonly<ToggleAtomProps>) {
  const toggleAtom = useSetAtom(atomToggle);

  const child = Children.only(children);

  return cloneElement(child, {
    onClick: () => {
      toggleAtom((prev) => ({ ...prev, isOpen: !prev.isOpen, data }));
    }
  } as any);
}