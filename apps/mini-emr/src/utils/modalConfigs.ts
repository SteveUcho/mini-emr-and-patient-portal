import { addPatient } from "@/actions/patientActions";
import { ModalConfig } from "@/components/ModalBuilder";

export const medications = ["Diovan", "Lexapro", "Metformin", "Ozempic", "Prozac", "Seroquel", "Tegretol"];
export const dosages = ["1mg", "2mg", "3mg", "5mg", "10mg", "25mg", "50mg", "100mg", "250mg", "500mg", "1000mg"];

export type ModalKey = "EditUserModal" | "AddAppointmentModal" | "EditAppointmentModal" | "DeleteAppointmentModal" | "AddPrescriptionModal" | "EditPrescriptionModal" | "DeletePrescriptionModal" | "AddPatientModal";

export const modalActionMap: Record<ModalKey, (data: any) => Promise<void>> = {
  EditUserModal: async () => {},
  AddAppointmentModal: async () => {},
  EditAppointmentModal: async () => {},
  DeleteAppointmentModal: async () => {},
  AddPrescriptionModal: async () => {},
  EditPrescriptionModal: async () => {},
  DeletePrescriptionModal: async () => {},
  AddPatientModal: addPatient,
}

export const modals: Record<ModalKey, ModalConfig> = {
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
  },
  AddPrescriptionModal: {
    title: "Add Prescription",
    description: "Add a new prescription",
    form: [
      {
        name: "medication",
        fieldType: "select",
        label: "Medication",
        options: medications
      },
      {
        name: "dosage",
        fieldType: "select",
        label: "Dosage",
        options: dosages
      },
      {
        name: "refill_on",
        fieldType: "textfield",
        textType: "text",
        label: "Refill On",
      },
      {
        name: "refill_schedule",
        fieldType: "select",
        label: "Refill Schedule",
        options: ["daily", "weekly", "monthly", "yearly"]
      },
    ]
  },
  EditPrescriptionModal: {
    title: "Edit Prescription",
    description: "Edit an existing prescription",
    form: [
      {
        name: "id",
        hidden: true,
        fieldType: "textfield",
        textType: "text",
        label: "ID",
      },
      {
        name: "medication",
        fieldType: "select",
        label: "Medication",
        options: medications
      },
      {
        name: "dosage",
        fieldType: "select",
        label: "Dosage",
        options: dosages
      },
      {
        name: "refill_on",
        fieldType: "textfield",
        textType: "text",
        label: "Refill On",
      },
      {
        name: "refill_schedule",
        fieldType: "select",
        label: "Refill Schedule",
        options: ["daily", "weekly", "monthly", "yearly"]
      },
    ]
  },
  DeletePrescriptionModal: {
    title: "Delete Prescription",
    description: "Delete an existing prescription",
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
  },
  AddPatientModal: {
    title: "Add Patient",
    description: "Add a new patient",
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
  }
}