import { toast } from "react-toastify";
import { Button } from "../../../components/ui/button";
import type {
  Center,
  CreateOrderPayload,
  Package,
  PackagePlanDetail,
} from "../../../constant/types/package";
import { formatPrice } from "../../../lib/utils";
import { MoveRight } from "lucide-react";
import { createOrder } from "../../../api/order-api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../lib/context/authContext";

type PackageDetailItemProps = {
  center: Center | null;
  packagePlanDetail: PackagePlanDetail | null;
  pk: Package | null;
};

const PackageDetailItem = ({
  center,
  packagePlanDetail,
  pk,
}: PackageDetailItemProps) => {
  if (!center || !packagePlanDetail) return null;
  const { token } = useAuth();
  const nabagate = useNavigate();
  const handleByPackage = async () => {
    if (!pk?.id) {
      toast.error("Not found that packages");
      return;
    }
    if (!token) {
      toast.error("Vui lòng đăng nhập để tiếp tục");
      setTimeout(() => {
        nabagate("/auth");
      }, 1500);
      return;
    }
    try {
      const payload: CreateOrderPayload = {
        packagePlanId: pk?.id,
        quantity: 1,
      };

      const order = await createOrder(payload);
      if (order) {
        nabagate(order.paymentUrl);
      }
      console.log("Order:", order);
    } catch (error) {
      toast.error("Không thể tạo order, vui lòng thử lại");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden transform transition-all duration-300 hover:shadow-xl">
        <div
          className="bg-gradient-to-r from-primary to-secondary text-white p-6 flex items-center justify-between relative overflow-hidden"
          style={{
            // backgroundImage: "url('/path-to-gym-image.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="text-2xl md:text-3xl font-bold relative z-10">
            {packagePlanDetail.packagePlanName}
          </h2>
          <span className="text-sm md:text-base bg-green-500 px-4 py-2 rounded-full font-medium relative z-10">
            {pk?.durationMonths} months
          </span>
          <div className="absolute inset-0 bg-black/40" />{" "}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-foreground rounded-lg border border-border">
            <div className="space-y-4">
              <p className="text-text-muted text-sm uppercase tracking-wider">
                Description
              </p>
              <p className="text-text-primary font-semibold text-base md:text-lg">
                {pk?.description || "No description available"}
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-text-muted text-sm uppercase tracking-wider">
                Price
              </p>
              <p className="text-2xl font-bold text-accent-error">
                {formatPrice(pk?.price || NaN)}
              </p>
            </div>
          </div>

          {/* Center Info Grid */}
          <div className="grid grid-cols-1 gap-6 p-5 bg-foreground rounded-lg border border-border">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Center
              </h3>
              <p className="text-text-primary font-medium">{center.name}</p>
              <p className="text-sm text-text-secondary">{center.address}</p>
              <p className="text-sm text-text-secondary flex items-center">
                📞 {center.phone}
              </p>
              <div className="flex items-center gap-2 text-accent-success animate-pulse">
                <MoveRight size={16} />
                <span>Available Now</span>
              </div>
            </div>
          </div>

          {/* Service Info Grid */}
          <div className="grid grid-cols-1 gap-6 p-5 bg-foreground rounded-lg border border-border">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Service
              </h3>
              <p className="text-text-primary font-medium">
                {packagePlanDetail.serviceName}
              </p>
              <p className="text-sm text-text-secondary">
                {packagePlanDetail.serviceDescription ||
                  "No description available"}
              </p>
              <p className="text-sm text-text-secondary flex items-center">
                {packagePlanDetail.sessionsIncluded || "Not specified"}
              </p>
              <div className="w-full h-px bg-border my-2" />{" "}
              <p className="text-sm text-text-muted italic">
                * Includes free consultation
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border px-6 py-4 flex justify-end">
          <Button variant={"primary"} onClick={() => handleByPackage()}>
            Register Now
            <MoveRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailItem;
