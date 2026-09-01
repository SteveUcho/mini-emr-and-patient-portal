export interface Appointment {
  id: number;
  patientId: number;
  provider: string;
  datetime: string;
  repeat: string;
}

export interface Prescription {
  id: number;
  patientId: number;
  medication: string;
  dosage: string;
  quantity: number;
  refill_on: string;
  refill_schedule: string;
}

export interface Patient {
  id: number;
  name: string;
  email: string;
  password: string;
  appointments: Appointment[];
  prescriptions: Prescription[];
};