import { ModalConfig } from "@/components/ModalBuilder";

export const modals: Record<string, ModalConfig> = {
  EditUserModal: {
    title: "Edit User",
    description: "Fill out the form below to edit the user.",
    form: [
      {
        name: "name",
        fieldType: "textfield",
        textType: "text",
        label: "Name",
      },
      {
        name: "email",
        fieldType: "textfield",
        textType: "email",
        label: "Email",
      },
      {
        name: "password",
        fieldType: "textfield",
        textType: "password",
        label: "Password",
      }
    ]
  },
  AddAppointmentModal: {
    title: "Add Appointment",
    description: "Add a new appointment",
    form: [
      {
        name: "provider",
        fieldType: "textfield",
        textType: "text",
        label: "Provider",
      },
      {
        name: "datetime",
        fieldType: "textfield",
        textType: "text",
        label: "Date and Time",
      },
      {
        name: "repeat",
        fieldType: "select",
        label: "Repeat",
        options: ["daily", "weekly", "monthly", "yearly"]
      }
    ]
  },
  EditAppointmentModal: {
    title: "Edit Appointment",
    description: "Edit an existing appointment",
    form: [
      {
        name: "id",
        hidden: true,
        fieldType: "textfield",
        textType: "text",
        label: "ID",
      },
      {
        name: "provider",
        fieldType: "textfield",
        textType: "text",
        label: "Provider",
      },
      {
        name: "datetime",
        fieldType: "textfield",
        textType: "text",
        label: "Date and Time",
      },
      {
        name: "repeat",
        fieldType: "select",
        label: "Repeat",
        options: ["daily", "weekly", "monthly", "yearly"]
      }
    ]
  },
  DeleteAppointmentModal: {
    title: "Delete Appointment",
    description: "Delete an existing appointment",
    form: [
      {
        name: "id",
        hidden: true,
        fieldType: "textfield",
        textType: "text",
        label: "ID",
      }
    ],
    footerButtons: {
      left: {
        label: "Cancel",
        variant: "secondary"
      },
      right: {
        isDisabled: false,
        label: "Delete",
        variant: "danger"
      }
    }
  }
}