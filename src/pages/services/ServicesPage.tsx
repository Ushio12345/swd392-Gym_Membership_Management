import { useEffect, useState } from "react";
import Slider from "react-slick";
import ServiceCard from "./patials/ServiceCard";
import { getAllServices } from "../../api/services";
import { getPackageByServiceId } from "../../api/package-api";
import {
  type PackagePlanDetail,
  type ServiceType,
} from "../../constant/types/package";
import { Loader2 } from "lucide-react";
import RelatedPackageCard from "./patials/RelatePackageCard";
import Loading from "../../components/common/loading/Loading";

const ServicesPage = () => {
  const [services, setServices] = useState<ServiceType[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(1);
  const [relatedPackages, setRelatedPackages] = useState<
    PackagePlanDetail[] | []
  >([]);
  const [loadingPackages, setLoadingPackages] = useState(false);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await getAllServices();
        setServices(res);
      } catch (error) {
        console.error("Lỗi khi fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPackagesByServiceId = async () => {
      if (!selectedServiceId) return;
      try {
        setLoadingPackages(true);
        const res = await getPackageByServiceId(selectedServiceId);
        setRelatedPackages(Array.isArray(res) ? res : res ? [res] : []);
      } catch (error) {
        console.error("Lỗi khi fetch packages:", error);
        setRelatedPackages([]);
      } finally {
        setLoadingPackages(false);
      }
    };

    fetchServices();
    fetchPackagesByServiceId();
  }, [selectedServiceId]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-3 section md:w-1/2 w-3/4 m-auto">
            {services.length > 0 ? (
              services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  setSelectedServiceId={setSelectedServiceId}
                  selectedService={selectedServiceId}
                />
              ))
            ) : (
              <div className="col-span-full text-center bg-card border border-border rounded-lg p-6 shadow-md">
                <p className="text-text-primary text-lg">
                  No services available.
                </p>
              </div>
            )}
          </div>
          <div className="layout mt-6">
            <h3 className="text-2xl font-semibold text-text-primary">
              Related Packages
            </h3>
            {loadingPackages ? (
              <div className="flex justify-center mt-4">
                <Loader2 className="animate-spin text-text-muted size-6" />
              </div>
            ) : relatedPackages.length > 0 ? (
              <div className="mt-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <Slider {...settings}>
                  {relatedPackages.map((pkg) => (
                    <RelatedPackageCard
                      key={pkg.id}
                      id={pkg.id}
                      packagePlanId={pkg.packagePlanId}
                      packagePlanName={pkg.packagePlanName}
                      serviceName={pkg.serviceName}
                      serviceDescription={pkg.serviceDescription}
                      centerName={pkg.centerName}
                      sessionsIncluded={pkg.sessionsIncluded}
                      createdAt={pkg.createdAt}
                    />
                  ))}
                </Slider>
              </div>
            ) : (
              <p className="mt-4 text-text-secondary text-center">
                No related packages available.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ServicesPage;
