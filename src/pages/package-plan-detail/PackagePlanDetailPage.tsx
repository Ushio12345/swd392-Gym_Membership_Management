import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Package } from "../../constant/types/package";
import { PackagePlanDetailProvider } from "../../lib/context/packageDetailContext";
import PackageDetailItem from "./patials/PackageDetail";
import NotFound from "../not-found/Not-Found";
import { getPackagePlanById } from "../../api/package-api";
import { toast } from "react-toastify";

const PackagePlanDetail = () => {
  const [packagePlan, setPackagePlan] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  if (!id || isNaN(Number(id))) {
    return <NotFound />;
  }

  useEffect(() => {
    const fetchPackageById = async () => {
      try {
        setLoading(true);
        const res = await getPackagePlanById(Number(id));
        if (res) {
          setPackagePlan(res);
        } else {
          setPackagePlan(null);
        }
      } catch (error) {
        toast.error("Không thể tải gói dịch vụ!");
        setPackagePlan(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPackageById();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!packagePlan) return <NotFound />;

  return (
    <PackagePlanDetailProvider pk={packagePlan}>
      <PackageDetailItem />
    </PackagePlanDetailProvider>
  );
};

export default PackagePlanDetail;
