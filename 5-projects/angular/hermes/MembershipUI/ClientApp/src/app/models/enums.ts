export enum VCTRequestStatus {
  'Waiting for Submission' = 1,
  'Submitted',
  'Waiting for Delivery',
  'Delivered',
  'Retry or Contact Support'
};

export enum DeliveryMethod {
  'FRONT' = 1,
  'SIDE',
  'BACK',
  'RAMP'
};

export enum SpecialHandlingCode {
  'BIG' = 1,
  'DGR'
};

export enum VehicleType {
  'TRUCK' = 1,
  'CAR'
};

export enum WeightCode {
  'KG' = 1
};

export enum RejectReason {
  'Pieces Mismatch' = 1,
  'Not in Location'
}

export enum InviteStatus {
  INVITED = 1,
  ACCEPTED,
  REJECTED,
  FAILED
}

export enum OrganizationType {
  AGENT = 1,
  GROUNDHANDLER,
  HAULIER,
  DRIVER,
  HERMESUPERUSER
}
