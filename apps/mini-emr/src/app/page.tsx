import { ModalBuilder } from "@/components/ModalBuilder";
import { PatientTable } from "@/components/PatientTable";
import { getPatientsAppointments, getPatientsPrescriptions, getPatients } from "@/actions/patientActions";
import { ToggleModal } from "@/components/ToggleModal";
import { modals, ModalKey } from "@/utils/modalConfigs";
import { Button } from "@heroui/react";

const patients = await getPatients();
const patientIds = patients.map(patient => patient.id);
const [appointments, prescriptions] = await Promise.all([getPatientsAppointments(patientIds), getPatientsPrescriptions(patientIds)]);

const filledPatients = patients.map(patient => {
  return {
    ...patient,
    appointments: appointments.filter(appointment => appointment.patientId === patient.id),
    prescriptions: prescriptions.filter(prescription => prescription.patientId === patient.id),
  }
})

export default function Home() {
  return (
    <div className="md:w-8/10 mx-auto p-2 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold my-8">Mini-EMR</h1>
        <ToggleModal modalId="AddPatientModal">
          <Button type="button" className="bg-blue-500 text-white px-4 py-2 rounded">Add Patient</Button>
        </ToggleModal>
      </div>
      <PatientTable data={filledPatients} />
      {
        Object.entries(modals).map(([key, config]) => (
          <ModalBuilder key={key} id={key as ModalKey} config={config} />
        ))
      }
    </div>
  );
}
