import axiosInstance from "../aixos/axiosInstance";
import {
  type CreateOrderPayload,
  type OrderOfUserType,
} from "../constant/types/package";

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

export const fetchOrderOfUser = async (uid: number) => {
  try {
    const res = await axiosInstance.get<OrderOfUserType[]>(
      `/orders/user/${uid}`
    );
    return res;
  } catch {
    console.log("Error when get order of user");
  }
};
