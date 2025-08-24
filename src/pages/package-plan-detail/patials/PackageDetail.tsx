import { usePackagePlanDetail } from "../../../lib/context/packageDetailContext";
import Loading from "../../../components/common/loading/Loading";
import PackageDetailItem from "./PackageDetailItem";
import ErrorPackageComponent from "./ErrorPackage";

const PackageDetail = () => {
  const { loading, packagePlanDetail, center, error, pk } =
    usePackagePlanDetail();

  if (error) {
    return <ErrorPackageComponent />;
  }
  if (!packagePlanDetail) {
    return (
      <div className="text-text-error text-center">huhudsdsdbsjkdskjbd</div>
    );
  }

  return (
    <div className="layout h-screen flex items-center justify-center">
      {loading ? (
        <Loading />
      ) : (
        <PackageDetailItem
          center={center}
          packagePlanDetail={packagePlanDetail}
          pk={pk}
        />
      )}
    </div>
  );
};

export default PackageDetail;
