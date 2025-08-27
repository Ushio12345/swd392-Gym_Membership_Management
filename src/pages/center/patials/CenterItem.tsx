import { MapPin, Phone, Mail, Info } from "lucide-react";
import type { Center } from "../../../constant/types/package";
import { useNavigate } from "react-router-dom";

type CenterItemProps = {
  center: Center | null;
};
const CenterItem = ({ center }: CenterItemProps) => {
  const navigate = useNavigate();
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="max-w-md mx-auto bg-card rounded-xl shadow-lg border border-border overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:bg-accent-blue cursor-pointer"
      onClick={() => navigate(`package-center/${center?.name}`)}
    >
      <div className="p-6">
        {/* Header */}

        <div className="flex items-center gap-3 mb-4">
          <Info className="text-accent-blue size-6" />
          <h2 className="text-2xl font-bold text-text-primary">
            {center?.name}
          </h2>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-text-secondary">
            <MapPin className="size-5" />
            <p className="text-sm">{center?.address}</p>
          </div>
          <div className="flex items-center gap-2 text-text-secondary">
            <Phone className="size-5" />
            <p className="text-sm">{center?.phone}</p>
          </div>
          <div className="flex items-center gap-2 text-text-secondary">
            <Mail className="size-5" />
            <p className="text-sm">{center?.email}</p>
          </div>
          <div className="text-text-secondary">
            <p className="text-sm italic">{center?.description}</p>
          </div>
          {/* <div className="flex items-center gap-2 text-text-muted">
            <span>Status:</span>
            <span
              className={
                center.isActive ? "text-accent-success" : "text-accent-error"
              }
            >
              {center.isActive ? "Active" : "Inactive"}
            </span>
          </div> */}
          <div className="text-text-muted text-sm">
            Created: {formatDate(center?.createdAt || "No data")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterItem;
