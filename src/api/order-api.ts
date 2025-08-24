import axiosInstance from "../aixos/axiosInstance";
import type { CreateOrderPayload } from "../constant/types/package";

export type CreateOrderResponse = {
  orderId: number;
  paymentUrl: string;
};

export const createOrder = async (payload: CreateOrderPayload) => {
  try {
    const res = await axiosInstance.post<CreateOrderResponse>(
      "/payment/create-order",
      payload
    );
    return res;
  } catch (error) {
    throw error;
  }
};
