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
