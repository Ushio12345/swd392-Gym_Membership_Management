import {  Clock, MapPin } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";

type RelatedPackageCardProps = {
  id: number;
  packagePlanId: number;
  packagePlanName: string;
  serviceName: string;
  serviceDescription: string;
  centerName: string;
  sessionsIncluded: number;
  createdAt: string;
};

const RelatedPackageCard = ({
  //   id,
  packagePlanId,
  packagePlanName,
  serviceName,
  serviceDescription,
  centerName,
  sessionsIncluded,
  createdAt,
}: RelatedPackageCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card border border-border rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-64 mr-4 inline-block last:mr-0 p-4">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary">
            {packagePlanName}
          </h3>
          <p className="text-sm text-text-secondary mt-1 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {centerName}
          </p>
          <p className="text-sm text-text-muted mt-2">Service: {serviceName}</p>
          <p className="text-sm text-text-secondary mt-1 line-clamp-2">
            {serviceDescription}
          </p>
          <div className="flex items-center gap-2 mt-2 text-text-muted text-xs">
            <Clock className="w-4 h-4" />
            <span>{sessionsIncluded} sessions</span>
          </div>
          <div className="text-text-muted text-xs mt-1">
            Created: {new Date(createdAt).toLocaleDateString("vi-VN")}
          </div>
        </div>
        <Button
          className="mt-4 w-full text-primary border-primary hover:bg-primary/10 transition-colors"
          onClick={() => navigate(`/package-plan-detail/${packagePlanId}`)}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default RelatedPackageCard;
