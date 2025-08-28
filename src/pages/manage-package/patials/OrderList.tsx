import { useEffect, useState } from "react";
import { fetchAllOrder, updateOrderStatus } from "../../../api/order-api";
import { Loader2 } from "lucide-react";
import type { OrderType } from "../../../constant/types/package";
import { toast } from "react-toastify";

const OrderList = () => {
  const [orders, setOrders] = useState<OrderType[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAllOrder();
        if (data) {
          setOrders(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      //   setOrders((prevOrders) =>
      //     prevOrders.map((order) =>
      //       order.id === orderId ? { ...order, status: newStatus } : order
      //     )
      //   );
      toast.success("Status updated successfully!");
    } catch (err) {
      toast.error("Failed to update status. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-text-muted size-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-text-error p-4">
        <p>{error}</p>
        <button
          className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-text-primary mb-4">
        Order History
      </h2>
      {orders.length === 0 ? (
        <p className="text-text-secondary text-center">No orders found.</p>
      ) : (
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr className="bg-card text-text-primary">
              <th className="border border-border p-2">ID</th>
              <th className="border border-border p-2">User ID</th>
              <th className="border border-border p-2">User Email</th>
              <th className="border border-border p-2">User Full Name</th>
              <th className="border border-border p-2">Total Amount</th>
              <th className="border border-border p-2">Status</th>
              <th className="border border-border p-2">Order Date</th>
              <th className="border border-border p-2">Payment ID</th>
              <th className="border border-border p-2">Payment Amount</th>
              <th className="border border-border p-2">Payment Method</th>
              <th className="border border-border p-2">Payment Status</th>
              <th className="border border-border p-2">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-foreground/50">
                <td className="border border-border p-2">{order.id}</td>
                <td className="border border-border p-2">{order.userId}</td>
                <td className="border border-border p-2">{order.userEmail}</td>
                <td className="border border-border p-2">
                  {order.userFullName}
                </td>
                <td className="border border-border p-2">
                  ${order.totalAmount.toLocaleString()}
                </td>
                <td className="border border-border p-2">
                  <select
                    value={order.payment?.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="w-full p-1 border border-border rounded text-text-primary bg-card"
                  >
                    <option value="reject">Reject</option>
                    <option value="refund">Refund</option>
                    <option value="confirm">Confirm</option>
                  </select>
                </td>
                <td className="border border-border p-2">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="border border-border p-2">
                  {order.payment?.id || "-"}
                </td>
                <td className="border border-border p-2">
                  ${order.payment?.amount?.toLocaleString() || "-"}
                </td>
                <td className="border border-border p-2">
                  {order.payment?.paymentMethod || "-"}
                </td>
                <td className="border border-border p-2">
                  {order.payment?.status || "-"}
                </td>
                <td className="border border-border p-2">
                  {order.payment?.paymentDate
                    ? new Date(order.payment.paymentDate).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;
