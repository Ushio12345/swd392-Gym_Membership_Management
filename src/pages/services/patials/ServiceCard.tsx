import { CheckCircle, XCircle } from "lucide-react";

import type { ServiceType } from "../../../constant/types/package";
import Gym from "../../../assets/images/gym-image.jpg";
import Bowling from "../../../assets/images/bowling-image.jpg";

export interface ServiceCardProps {
  service: ServiceType;
  setSelectedServiceId: (sv: number) => void;
  selectedService: number | null;
}

const ServiceCard = ({
  service,
  setSelectedServiceId,
  selectedService,
}: ServiceCardProps) => {
  const getServiceImage = () => {
    if (service.name.toLowerCase() === "gym") return Gym;
    if (service.name.toLowerCase() === "bowling") return Bowling;
    return null;
  };

  const serviceImage = getServiceImage();

  return (
    <div
      onClick={() => setSelectedServiceId(service.id)}
      className={`${
        selectedService === service.id ? "bg-accent-blue" : "bg-card"
      } border-2 border-border rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
    >
      <div
        className="w-full h-36 bg-cover bg-center"
        style={{
          backgroundImage: serviceImage ? `url(${serviceImage})` : "none",
          backgroundColor: serviceImage ? "rgba(0, 0, 0, 0.3)" : "transparent",
        }}
      >
        {!serviceImage && (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-text-muted">No Image Available</span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col gap-4">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-text-primary line-clamp-1">
            {service.name}
          </h2>
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              service.isActive
                ? "bg-accent-success/10 text-accent-success"
                : "bg-accent-error/10 text-accent-error"
            }`}
          >
            {service.isActive ? (
              <CheckCircle className="size-3" />
            ) : (
              <XCircle className="size-3" />
            )}
            {service.isActive ? "Active" : "Inactive"}
          </div>
        </div>

        {/* Description Section */}
        <p className="text-text-secondary text-base leading-snug line-clamp-3">
          {service.description}
        </p>

        <div className="flex items-center justify-between text-text-muted text-xs">
          {/* <span>
            Created: {new Date(service.createdAt).toLocaleDateString("vi-VN")}
          </span> */}
        </div>

        {/* <Button
          asChild
          variant="primary"
          onClick={() => setSelectedServices(service.id)}
        >
          <span>View Related Packages</span>
        </Button> */}
      </div>
    </div>
  );
};

export default ServiceCard;
