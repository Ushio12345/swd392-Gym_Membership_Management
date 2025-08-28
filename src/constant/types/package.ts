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

export type OrderOfUserType = {
  id: number;
  userId: number;
  userEmail: string;
  userFullName: string;
  totalAmount: number;
  status: string;
  orderDate: string;
  payment: string;
  orderPackages: any;
};
export interface PaymentType {
  id: number;
  orderId: number;
  amount: number;
  paymentMethod: string; // "VNPAY" | "MOMO" | ...
  status: string; // "PENDING" | "SUCCESS" | "FAILED"
  transactionId: string;
  paymentDate: string; // ISO date string
  vnpayResponse?: string; // optional vì có thể null/undefined
}

export interface OrderType {
  id: number;
  userId: number;
  userEmail: string;
  userFullName: string;
  totalAmount: number;
  status: string; // "PENDING" | "CONFIRM" | "REJECT" | ...
  orderDate: string; // ISO date string
  payment?: PaymentType; // có thể null => để optional
}
