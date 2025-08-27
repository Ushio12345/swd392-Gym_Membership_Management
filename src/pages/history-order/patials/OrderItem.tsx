import { Clock, ShoppingBag, User, DollarSign } from "lucide-react";
import type { OrderOfUserType } from "../../../constant/types/package";

interface OrderItemProps {
  order: OrderOfUserType;
}

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <div className="bg-card border border-border rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <ShoppingBag className="text-accent-blue size-5" />
          <h4 className="text-lg font-semibold text-text-primary">
            Order #{order.id}
          </h4>
        </div>
        <span
          className={`text-sm font-medium ${
            order.status === "Completed"
              ? "text-accent-success"
              : order.status === "Pending"
              ? "text-accent-error"
              : "text-text-secondary"
          }`}
        >
          {order.status}
        </span>
      </div>
      <div className="space-y-2 text-text-secondary text-sm">
        <p className="flex items-center gap-2">
          <User className="size-4" />
          <span>
            {order.userFullName} ({order.userEmail})
          </span>
        </p>
        <p className="flex items-center gap-2">
          <DollarSign className="size-4" />
          <span>{order.totalAmount.toLocaleString()} VND</span>
        </p>
        <p className="flex items-center gap-2">
          <Clock className="size-4" />
          <span>{new Date(order.orderDate).toLocaleString()}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderItem;
