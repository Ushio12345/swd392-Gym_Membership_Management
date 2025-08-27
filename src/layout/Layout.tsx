import { Outlet } from "react-router-dom";
import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/Footer";
import { useEffect, useState } from "react";
import { getPackagePlan } from "../api/package-api";
import type { Package } from "../constant/types/package";
import ErrorPackageComponent from "../pages/package-plan-detail/patials/ErrorPackage";
import { PackageProvider } from "../lib/context/packageContext";

const MainLayout = () => {
  const [packagePlans, setPackagePlans] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
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
    fetchPackages();
  }, []);

  if (error) {
    return <ErrorPackageComponent />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 p-5 bg-white shadow">
        <Header />
      </header>

      <PackageProvider pka={packagePlans} loading={loading} error={error}>
        <main className="flex-1 w-full py-20 justify-center items-center">
          <Outlet />
        </main>
      </PackageProvider>

      <footer
        id="contact"
        className="bg-gray-900 border-t-2 border-borderlight text-text-primary py-16"
      >
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
