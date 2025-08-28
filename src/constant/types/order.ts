export interface Payment {
  id: number;
  orderId: number;
  amount: number;
  paymentMethod: string;
  status: string;
  transactionId: string | null;
  paymentDate: string;
  vnpayResponse: string | null;
}

export interface OrderOfUserType {
  id: number;
  userId: number;
  userEmail: string;
  userFullName: string;
  totalAmount: number;
  status: string;
  orderDate: string;
  payment: Payment | null;
}
