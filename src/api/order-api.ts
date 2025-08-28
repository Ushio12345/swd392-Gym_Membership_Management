import axiosInstance from "../aixos/axiosInstance";
import {
  type CreateOrderPayload,
  type OrderType,
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
    const res = await axiosInstance.get<OrderType[]>(`/orders/user/${uid}`);
    return res;
  } catch {
    console.log("Error when get order of user");
  }
};

export const fetchAllOrder = async () => {
  try {
    const res = await axiosInstance.get<OrderType[] | []>(`/orders`);
    return res;
  } catch {
    console.log("Error when get order of user");
  }
};
export const updateOrderStatus = async (
  orderId: number,
  status: string
): Promise<void> => {
  try {
    let endpoint = "";

    switch (status) {
      case "reject":
        endpoint = `/payment/reject/${orderId}`;
        break;
      case "refund":
        endpoint = `/payment/refund/${orderId}`;
        break;
      case "confirm":
        endpoint = `/payment/confirm/${orderId}`;
        break;
      default:
        throw new Error("Invalid status");
    }

    await axiosInstance.post(endpoint);
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status. Please try again.");
  }
};
