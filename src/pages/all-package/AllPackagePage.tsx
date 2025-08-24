import { useEffect, useState } from "react";
import type { Package } from "../../constant/types/package";
import { getPackagePlan } from "../../api/package-api";
import PackageSkeleton from "./patials/PackageSkeleton";
import PackageItem from "../home/patials/PackageItem";
import usePagination from "../../lib/hooks/usePagination";
import PaginationItem from "../../components/ui/pagination";
import ErrorPackageComponent from "../package-plan-detail/patials/ErrorPackage";

const AllPackagePage = () => {
  const [packagePlans, setPackagePlans] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const res = await getPackagePlan();
        setPackagePlans(res);
      } catch (err) {
        console.error("Failed to fetch package plans:", err);
        setError("Failed to load packages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const { currentItems, currentPage, handlePageClick } = usePagination({
    items: packagePlans,
    itemsPerPage: 6,
  });

  if (error) {
    return <ErrorPackageComponent />;
  }

  return (
    <section>
      <h3 className="text-center text-2xl mt-5 text-text-primary">
        OUR'S PACKAGES
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 layout pt-10">
        {currentItems.length > 0 ? (
          currentItems.map((p: Package) => <PackageItem key={p.id} {...p} />)
        ) : loading ? (
          <PackageSkeleton />
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-10 bg-foreground rounded-lg border border-border shadow-md">
            <svg
              className="w-16 h-16 text-accent-error mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h4 className="text-xl font-semibold text-text-primary">
              No Packages Available
            </h4>
            <p className="text-text-secondary text-center mt-2">
              It seems we don’t have any packages at the moment. Please check
              back later or contact support for assistance.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-shadow shadow-md"
              onClick={() => (window.location.href = "/contact")}
            >
              Contact Support
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end text-text pt-10 layout">
        <PaginationItem
          current={currentPage}
          total={packagePlans.length}
          pageSize={6}
          onChange={(page: any) => handlePageClick(null, page)}
          showSizeChanger={false}
        />
      </div>
    </section>
  );
};

export default AllPackagePage;
