"use client";

import { Person } from "@gravity-ui/icons";
import { Button, Input, Key, Label, ListBox, Modal, Select, Surface, TextField } from "@heroui/react";
import { useState } from "react";
import { modalAtom } from "@/utils/atoms";
import { useAtom } from "jotai";
import { modalActionMap, ModalKey } from "@/utils/modalConfigs";

interface ModalButtonConfig {
  label: string;
  isDisabled?: boolean;
  variant: "primary" | "secondary" | "danger";
}

export interface ModalConfig {
  title: string;
  description: string;
  form?: {
    name: string;
    hidden?: boolean;
    fieldType: "textfield" | "select";
    textType?: "text" | "email" | "password";
    label: string;
    options?: string[];
  }[];
  footerButtons?: {
    left: ModalButtonConfig;
    right: ModalButtonConfig;
  };
}

interface ModalBuilderProps {
  id: ModalKey;
  config: ModalConfig;
}

export function ModalBuilder(props: Readonly<ModalBuilderProps>) {
  const { id, config } = props;
  const [formState, setFormState] = useState<Record<string, any>>({});
  const [modalState, setModalState] = useAtom(modalAtom);

  const action = modalActionMap[id as keyof typeof modalActionMap];
  const formData = { ...modalState.data, ...formState };

  const handleFieldChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement> | Key | null) => {
    const value = typeof e === 'string' || typeof e === 'number' || e === null ? e : e.target.value;
    if (value === modalState.data?.[field]) {
      const tempState = { ...formState };
      delete tempState[field];
      setFormState(tempState);
      return;
    }
    setFormState({ ...formState, [field]: value });
    console.log(formState, formData);
  };

  const handleToggleModal = () => {
    setModalState(prev => ({ ...prev, id: prev.id === id ? undefined : id }));
  };

  const handleReset = () => {
    setFormState({});
  };

  const handleSubmit = async () => {
    await action(formData);
    setFormState({});
  };

  return (
    <Modal isOpen={modalState.id === id} onOpenChange={handleToggleModal}>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Person className="size-5" />
              </Modal.Icon>
              <Modal.Heading>{config?.title}</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                {config?.description}
              </p>
            </Modal.Header>
            {
              config?.form?.length && config.form.some((field) => field.hidden !== true) && (
                <Modal.Body className="p-6">
                  <Surface variant="default">
                    <form className="flex flex-col gap-4">
                      {config?.form?.map((field) => {
                        if (field.fieldType === "select") {
                          return (
                            <Select
                              key={field.name}
                              placeholder="Select one"
                              variant="secondary"
                              value={formData[field.name] || null}
                              onChange={handleFieldChange(field.name)}
                            >
                              <Label>{field.label}</Label>
                              <Select.Trigger className="capitalize">
                                <Select.Value />
                                <Select.Indicator />
                              </Select.Trigger>
                              <Select.Popover>
                                <ListBox>
                                  {field.options?.map((option) => (
                                    <ListBox.Item key={option} id={option} textValue={option} className="capitalize">
                                      {option}
                                      <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                  ))}
                                </ListBox>
                              </Select.Popover>
                            </Select>
                          )
                        } else if (field.fieldType === "textfield") {
                          return (
                            <TextField key={field.name} hidden={field.hidden} name={field.name} type={field.textType} variant="secondary">
                              <Label>{field.label}</Label>
                              <Input placeholder={`Enter your ${field.label.toLowerCase()}`} value={formData[field.name]} onChange={handleFieldChange(field.name)} />
                            </TextField>
                          )
                        }
                        return null
                      })}
                    </form>
                  </Surface>
                </Modal.Body>
              )
            }
            <Modal.Footer>
              <Button
                variant={config?.footerButtons?.left?.variant || "secondary"}
                onClick={handleReset}
              >
                {config?.footerButtons?.left?.label || "Reset"}
              </Button>
              <Button
                isDisabled={!config?.form?.every(field => field.hidden) && Object.keys(formState).length === 0}
                slot="close"
                variant={config?.footerButtons?.right?.variant || "primary"}
                onClick={handleSubmit}
              >
                {config?.footerButtons?.right?.label || "Save Changes"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}