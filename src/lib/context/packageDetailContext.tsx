import { createContext, useContext, useEffect, useState } from "react";
import type {
  Center,
  Package,
  PackagePlanDetail,
} from "../../constant/types/package";
import { getPackagePlanDetail } from "../../api/package-api";
import { getCenterById } from "../../api/center-api";
import ErrorPackageComponent from "../../pages/package-plan-detail/patials/ErrorPackage";

type PackagePlanDetailContextType = {
  packagePlanDetail: PackagePlanDetail | null;
  center: Center | null;
  loading: boolean;
  error: string | null;
  pk: Package | null;
};

const PackagePlanDetailContext = createContext<PackagePlanDetailContextType>({
  packagePlanDetail: null,
  center: null,
  loading: false,
  error: null,
  pk: null,
});

export const usePackagePlanDetail = () => useContext(PackagePlanDetailContext);

export const PackagePlanDetailProvider = ({
  pk,
  children,
}: {
  pk: Package;
  children: React.ReactNode;
}) => {
  const [packagePlanDetail, setPackagePlanDetail] =
    useState<PackagePlanDetail | null>(null);
  const [center, setCenter] = useState<Center | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pk.id) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const detail = await getPackagePlanDetail(pk.id);
        if (!detail) {
          setError("Không tìm thấy gói!");
          return;
        }
        setPackagePlanDetail(detail);

        if (detail?.centerId) {
          const centerData = await getCenterById(detail.centerId);
          setCenter(centerData);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [pk.id]);
  if (!loading && (!packagePlanDetail || error)) {
    return <ErrorPackageComponent />;
  }
  return (
    <PackagePlanDetailContext.Provider
      value={{ packagePlanDetail, center, loading, error, pk }}
    >
      {children}
    </PackagePlanDetailContext.Provider>
  );
};
