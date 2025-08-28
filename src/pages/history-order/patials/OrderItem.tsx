import { Clock, ShoppingBag, User, DollarSign } from "lucide-react";
import { useState } from "react";
import type { OrderType } from "../../../constant/types/package";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../components/ui/dialog";

interface OrderItemProps {
  order: OrderType;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-card border border-border rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 h-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="flex items-center justify-between mb-2 cursor-pointer">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-accent-blue size-5" />
              <h4 className="text-lg font-semibold text-text-primary hover:underline hover:text-accent-blue">
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
              {order.payment?.status}
            </span>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <h3 className="text-xl font-semibold text-text-primary mb-4 ">
            Order Details #{order.id}
          </h3>
          <div className="space-y-4 text-text-secondary text-sm">
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
            {order.payment && (
              <div className="border-t border-border pt-4 mt-4">
                <h4 className="text-md font-medium text-text-primary mb-2">
                  Payment Details
                </h4>
                <p className="flex items-center gap-2">
                  <span>Payment ID:</span>
                  <span>{order.payment.id}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>Amount:</span>
                  <span>{order.payment.amount.toLocaleString()} VND</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>Method:</span>
                  <span>{order.payment.paymentMethod}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>Payment Status:</span>
                  <span>{order.payment.status}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>Payment Date:</span>
                  <span>
                    {new Date(order.payment.paymentDate).toLocaleString()}
                  </span>
                </p>
                {order.payment.vnpayResponse && (
                  <p className="text-sm text-text-muted italic mt-2">
                    Note: {order.payment.vnpayResponse}
                  </p>
                )}
              </div>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="mt-6 w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-shadow"
          >
            Close
          </button>
        </DialogContent>
      </Dialog>
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
