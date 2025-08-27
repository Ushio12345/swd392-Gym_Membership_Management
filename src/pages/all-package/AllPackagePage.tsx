import { useState, useMemo } from "react";
import type { Package } from "../../constant/types/package";
import PackageSkeleton from "./patials/PackageSkeleton";
import PackageItem from "../home/patials/PackageItem";
import usePagination from "../../lib/hooks/usePagination";
import PaginationItem from "../../components/ui/pagination";
import ErrorPackageComponent from "../package-plan-detail/patials/ErrorPackage";
import { Input } from "../../components/ui/input";
import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownZA,
  ArrowUpAZ,
  Filter,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { usePackage } from "../../lib/context/packageContext";

const AllPackagePage = () => {
  const { packages, loading, error } = usePackage();
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState<string | null>(null);

  const filteredPackages = useMemo(() => {
    let result = [...packages];

    // search by name
    if (search.trim()) {
      result = result.filter((pkg) =>
        pkg.name.toLowerCase().includes(search.toLowerCase().trim())
      );
    }

    // sort
    if (sortOption === "az") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "za") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [packages, search, sortOption]);

  const { currentItems, currentPage, handlePageClick } = usePagination({
    items: filteredPackages,
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

      {/* -------- filter ------ */}
      <div className="flex items-center layout py-6 gap-3">
        <Input
          placeholder="Enter package name"
          className="w-96"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2" /> Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-card ">
            <DropdownMenuItem onClick={() => setSortOption("az")}>
              <ArrowUpAZ /> Sort A → Z
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("za")}>
              <ArrowDownZA /> Sort Z → A
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("price-low")}>
              <ArrowDown10 /> Low → High
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("price-high")}>
              <ArrowDown01 /> High → Low
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Package list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 layout pt-10">
        {loading ? (
          <PackageSkeleton />
        ) : currentItems.length > 0 ? (
          currentItems.map((p: Package) => <PackageItem key={p.id} {...p} />)
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
          </div>
        )}
      </div>

      {/* page */}
      <div className="flex items-center justify-end text-text pt-10 layout">
        <PaginationItem
          current={currentPage}
          total={filteredPackages.length}
          pageSize={6}
          onChange={(page: any) => handlePageClick(null, page)}
          showSizeChanger={false}
        />
      </div>
    </section>
  );
};

export default AllPackagePage;
