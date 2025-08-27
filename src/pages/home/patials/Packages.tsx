import PackageItem from "./PackageItem";
import { Button } from "../../../components/ui/button";
import { usePackage } from "../../../lib/context/packageContext";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  const { error, loading, packages } = usePackage();
  const navigate = useNavigate();
  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <h4 className="title">Choose Your Perfect Package</h4>
      <p className="text-text-primary mb-6">
        Select from our flexible membership options designed to fit your fitness
        goals and lifestyle.
      </p>

      <div className="grid gap-10 lg:grid-cols-3 md:grid-col-2 layout pt-10">
        {packages ? (
          packages
            .slice(0, 3)
            .map((pkg) => <PackageItem key={pkg.id} {...pkg} />)
        ) : (
          <div className="text-center text-gray-400 col-span-3">
            No packages available.
          </div>
        )}
      </div>
      <div className="mt-10">
        <Button onClick={() => navigate("/packages")}>
          Show more{" "}
          <span className="text-accent-success text-lg">{packages.length}</span>
          packages{" "}
        </Button>
      </div>
    </div>
  );
};

export default Packages;
