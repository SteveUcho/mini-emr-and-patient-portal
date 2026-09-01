import { motion } from "motion/react";
import { ToggleModal } from "./ToggleModal";
import { Button, Separator } from "@heroui/react";
import { Pencil, Plus, TrashBin } from "@gravity-ui/icons";
import { formatDateString } from "@/utils/stringManipulation";
import { Appointment, Prescription } from "@/types/tableTypes";

const appointmentKeys = ["datetime", "repeat"]
const prescriptionKeys = ["quantity", "dosage", "refill_on", "refill_schedule"]

interface PatientDetailsProps {
  open: boolean;
  patientId: number;
  appointments: Appointment[];
  prescriptions: Prescription[];
}

export const PatientDetails = (props: PatientDetailsProps) => {
  const { open, patientId, appointments, prescriptions } = props;

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={open ? { height: "auto" } : { height: 0 }}
      transition={{ duration: 0.3 }}
      className="sm:flex overflow-hidden"
    >
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3>Appointments</h3>
          <ToggleModal modalId="AddAppointmentModal" data={{ patientId }}>
            <Button isIconOnly size="sm" aria-label="Add appointment">
              <Plus />
            </Button>
          </ToggleModal>
        </div>
        <div className="flex flex-col gap-2">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="border-2 rounded-lg p-2">
              <div className="flex items-center justify-between">
                <h4>{appointment.provider}</h4>
                <div>
                  <ToggleModal modalId="EditAppointmentModal" data={appointment} >
                    <Button isIconOnly aria-label="Edit appointment" variant="secondary" className="mr-1">
                      <Pencil />
                    </Button>
                  </ToggleModal>
                  <ToggleModal modalId="DeleteAppointmentModal" data={appointment}>
                    <Button isIconOnly aria-label="Delete appointment" variant="danger-soft">
                      <TrashBin />
                    </Button>
                  </ToggleModal>
                </div>
              </div>
              <Separator className="my-2" variant="secondary" />
              {
                appointmentKeys.map((key) => (
                  <div key={key} className="capitalize">
                    <span className="font-semibold">{key.replaceAll('_', ' ')}:</span> {typeof appointment[key as keyof typeof appointment] === 'string' ? formatDateString(appointment[key as keyof typeof appointment] as string) : appointment[key as keyof typeof appointment]}
                  </div>
                ))
              }
            </div>
          ))}
        </div>
      </div>
      <Separator orientation="vertical" variant="secondary" />
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3>Prescriptions</h3>
          <ToggleModal modalId="AddPrescriptionModal" data={{ patientId }}>
            <Button isIconOnly size="sm" aria-label="Add prescription">
              <Plus />
            </Button>
          </ToggleModal>
        </div>
        <div className="flex flex-col gap-2">
          {prescriptions.map((prescription) => {
            return (
              <div key={prescription.id} className="border-2 rounded-lg p-2">
                <div className="flex items-center justify-between">
                  <h4>{prescription.medication}</h4>
                  <div>
                    <ToggleModal modalId="EditPrescriptionModal" data={prescription}>
                      <Button isIconOnly aria-label="Edit prescription" variant="secondary" className="mr-1">
                        <Pencil />
                      </Button>
                    </ToggleModal>
                    <ToggleModal modalId="DeletePrescriptionModal" data={prescription}>
                      <Button isIconOnly aria-label="Delete prescription" variant="danger-soft">
                        <TrashBin />
                      </Button>
                    </ToggleModal>
                  </div>
                </div>
                <Separator className="my-2" variant="secondary" />
                {
                  prescriptionKeys.map((key) => (
                    <div key={key} className="capitalize">
                      <span className="font-semibold">{key.replaceAll('_', ' ')}:</span> {typeof prescription[key as keyof typeof prescription] === 'string' ? formatDateString(prescription[key as keyof typeof prescription] as string) : prescription[key as keyof typeof prescription]}
                    </div>
                  ))
                }
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  );
};