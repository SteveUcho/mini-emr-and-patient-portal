import { ModalConfig } from "@/components/ModalBuilder";

export const modals: Record<string, ModalConfig> = {
  EditUserModal: {
    title: "Edit User",
    description: "Fill out the form below to edit the user.",
    form: [
      {
        name: "name",
        type: "text",
        label: "Name",
      },
      {
        name: "email",
        type: "email",
        label: "Email",
      },
      {
        name: "password",
        type: "password",
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
        type: "text",
        label: "Provider",
      },
      {
        name: "datetime",
        type: "datetime-local",
        label: "Date and Time",
      },
      {
        name: "repeat",
        type: "select",
        label: "Repeat",
        options: ["daily", "weekly", "monthly", "yearly"]
      }
    ]
  }
}