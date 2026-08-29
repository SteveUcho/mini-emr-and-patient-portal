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
        options: ["Daily", "Weekly", "Monthly", "Yearly"]
      }
    ]
  }
}