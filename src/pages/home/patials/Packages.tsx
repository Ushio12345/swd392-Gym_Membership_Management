import { useEffect, useState } from "react";

import PackageItem from "./PackageItem";
import { getPackagePlan } from "../../../api/package-api";
import type { Package } from "../../../constant/types/package";

const Packages = () => {
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

  console.log(packagePlans);

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <h4 className="title">Choose Your Perfect Package</h4>
      <p className="text-text-primary mb-6">
        Select from our flexible membership options designed to fit your fitness
        goals and lifestyle.
      </p>

      <div className="grid gap-10 md:grid-cols-3 layout">
        {packagePlans ? (
          packagePlans
            .slice(0, 3)
            .map((pkg) => <PackageItem key={pkg.id} {...pkg} />)
        ) : (
          <p className="text-center text-gray-400 col-span-3">
            No packages available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Packages;
