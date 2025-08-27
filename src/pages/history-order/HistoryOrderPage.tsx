import { useEffect, useState } from "react";
import { useAuth } from "../../lib/context/authContext";
import type { OrderOfUserType } from "../../constant/types/package";
import { fetchOrderOfUser } from "../../api/order-api";

import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import OrderItem from "./patials/OrderItem";

const HistoryOrderPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderOfUserType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrderByUserId = async () => {
      if (!user?.id) return;
      try {
        setLoading(true);
        const data = await fetchOrderOfUser(user.id);
        setOrders(data || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderByUserId();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="layout section flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-accent-blue size-10" />
          <p className="text-text-primary">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="layout section flex flex-col">
      <h4 className="text-4xl mb-6 text-text-primary font-bold">Your Orders</h4>

      {orders.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-6 text-center shadow-md">
          <svg
            className="mx-auto h-12 w-12 text-accent-error"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h5 className="mt-4 text-xl font-semibold text-text-primary">
            No Orders Found
          </h5>
          <p className="mt-2 text-text-secondary">
            It looks like you haven’t placed any orders yet. Check out our
            packages to get started!
          </p>
          <Link
            to="/packages"
            className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-shadow"
          >
            Explore Packages
          </Link>
        </div>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryOrderPage;
