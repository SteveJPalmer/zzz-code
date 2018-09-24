
// interface for order entity
export interface IOrder {
  orderNo: number;
  patientId: number;
  clinician: string;
  source: string;
  requestedDate: string;          // replace with Date type
  receivedDate: string;           // replace with Date type
}

/* TODO: create enum(s) for prj Date/Time types */

