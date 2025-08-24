export interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
  durationMonths: number;
  isActive: boolean;
  createdAt: string;
  centerId: number;
  centerName: string;
}
export interface PackagePlanDetail {
  id: number;
  packagePlanId: number;
  packagePlanName: string;
  serviceId: string;
  serviceName: string;
  serviceDescription: string;
  centerId: number;
  centerName: string;
  sessionsIncluded: number;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceType {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  isActive: boolean;
}

export interface Center {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}
export interface TimeFrame {
  id: number;
  centerId: number;
  centerName: string;
  startTime: string;
  endTime: string;
  dayOfWeek: string;
  isAvailable: true;
  createdAt: string;
}

//order

export type CreateOrderPayload = {
  packagePlanId: number;
  quantity: number;
};
