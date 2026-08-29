"use client";

import { Person } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useState } from "react";
import { editUserModalAtom } from "@/utils/atoms";
import { useAtom } from "jotai";

export interface ModalUser {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
}

export function EditUserModal() {
  const [userState, setUserState] = useState<ModalUser>({});
  const [modalState, setModalState] = useAtom(editUserModalAtom);

  const userData = {...modalState.data.user, ...userState};

  const handleFieldChange = (field: keyof ModalUser) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "" || e.target.value === modalState.data.user?.[field]) {
      const tempUser = { ...userState };
      delete tempUser[field];
      setUserState(tempUser);
      return;
    }
    setUserState({...userState, [field]: e.target.value});
  };

  const handleToggleModal = () => {
    setModalState(prev => ({...prev, isOpen: !prev.isOpen}));
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
              <Modal.Heading>Edit User</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Fill out the form below to edit the user.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="flex flex-col gap-4">
                  <TextField className="w-full" name="name" type="text" variant="secondary">
                    <Label>Name</Label>
                    <Input placeholder="Enter your name" value={userData.name} onChange={handleFieldChange('name')} />
                  </TextField>
                  <TextField className="w-full" name="email" type="email" variant="secondary">
                    <Label>Email</Label>
                    <Input placeholder="Enter your email" value={userData.email} onChange={handleFieldChange('email')} />
                  </TextField>
                  <TextField className="w-full" name="password" type="password" variant="secondary">
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" value={userData.password} onChange={handleFieldChange('password')} />
                  </TextField>
                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Reset
              </Button>
              <Button isDisabled={Object.keys(userState).length === 0} slot="close">Save Changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}