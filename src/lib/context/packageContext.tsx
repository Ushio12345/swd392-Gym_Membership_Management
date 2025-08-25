import { createContext, useContext, useState, useEffect } from "react";
import type { Package } from "../../constant/types/package";

type PackageContextType = {
  packages: Package[];
  filteredPackages: Package[];
  loading: boolean;
  error: string | null;
  //   filterBy: (serviceId?: string, centerId?: string) => void;
  //   resetFilter: () => void;
};

const PackageContext = createContext<PackageContextType | undefined>(undefined);

export const PackageProvider = ({
  children,
  pka,
  loading,
  error,
}: {
  children: React.ReactNode;
  pka: Package[];
  loading: boolean;
  error?: string | null;
}) => {
  const [packages, setPackages] = useState<Package[]>(pka || []);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>(
    pka || []
  );

  useEffect(() => {
    setPackages(pka);
    setFilteredPackages(pka);
  }, [pka]);

  //   const filterBy = (serviceId?: string, centerId?: string) => {
  //     let filtered = pka;

  //     if (serviceId) {
  //       filtered = filtered.filter((pkg) => pkg.serviceId === serviceId);
  //     }
  //     if (centerId) {
  //       filtered = filtered.filter((pkg) => pkg.centerId === centerId);
  //     }

  //     setFilteredPackages(filtered);
  //   };

  //   const resetFilter = () => setFilteredPackages(packages);

  return (
    <PackageContext.Provider
      value={{
        packages,
        filteredPackages,
        loading,
        error: error || null,
        // filterBy,
        // resetFilter,
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export const usePackage = () => {
  const ctx = useContext(PackageContext);
  if (!ctx) throw new Error("usePackage must be used within PackageProvider");
  return ctx;
};
