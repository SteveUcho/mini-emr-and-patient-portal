"use client";

import { Person } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useState } from "react";
import { modalBuilderAtom } from "@/utils/atoms";
import { useAtom } from "jotai";
import { User } from "@/types/tableTypes";

export interface ModalConfig {
  title: string;
  description: string;
  form: {
    name: string;
    type: string;
    label: string;
    options?: string[];
  }[];
}

export function ModalBuilder() {
  const [formState, setFormState] = useState<Partial<User>>({});
  const [modalState, setModalState] = useAtom(modalBuilderAtom);

  const formData = { ...modalState.data.user, ...formState };

  const handleFieldChange = (field: keyof User) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "" || e.target.value === modalState.data.user?.[field]) {
      const tempUser = { ...formState };
      delete tempUser[field];
      setFormState(tempUser);
      return;
    }
    setFormState({ ...formState, [field]: e.target.value });
  };

  const handleToggleModal = () => {
    setModalState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };

  return (
    <Modal isOpen={modalState.isOpen} onOpenChange={handleToggleModal}>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Person className="size-5" />
              </Modal.Icon>
              <Modal.Heading>{modalState.config?.title}</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                {modalState.config?.description}
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="flex flex-col gap-4">
                  {modalState.config?.form.map((field) => (
                    <TextField key={field.name} className="w-full" name={field.name} type={field.type} variant="secondary">
                      <Label>{field.label}</Label>
                      <Input placeholder={`Enter your ${field.label.toLowerCase()}`} value={formData[field.name as keyof User]} onChange={handleFieldChange(field.name as keyof User)} />
                    </TextField>
                  ))}
                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Reset
              </Button>
              <Button isDisabled={Object.keys(formState).length === 0} slot="close">Save Changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}