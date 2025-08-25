import { useParams } from "react-router-dom";
import { usePackage } from "../../lib/context/packageContext";
import PackageItem from "../home/patials/PackageItem";
import usePagination from "../../lib/hooks/usePagination";
import { useMemo, useState } from "react";
import PaginationItem from "../../components/ui/pagination";
import { Input } from "../../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownZA,
  ArrowUpAZ,
  Filter,
} from "lucide-react";

const PackageOfCenter = () => {
  const { centerName } = useParams();
  const { packages } = usePackage();
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState<string | null>(null);

  // lọc theo center
  const packageByCenter = packages.filter((p) => p.centerName === centerName);

  // filter + sort
  const filteredPackages = useMemo(() => {
    let result = [...packageByCenter];

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
  }, [packageByCenter, search, sortOption]);

  // pagination
  const { currentItems, currentPage, handlePageClick } = usePagination({
    items: filteredPackages,
    itemsPerPage: 6,
  });

  return (
    <div className="section layout">
      <h4>Packages Of Center {}</h4>
      <div className="flex items-center  py-6 gap-3">
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

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-10">
        {currentItems.length > 0 ? (
          currentItems.map((p) => <PackageItem {...p} key={p.id} />)
        ) : (
          <p className="col-span-full text-center text-text-secondary">
            No packages found for this center.
          </p>
        )}
      </div>

      {filteredPackages.length > 6 && (
        <div className="flex items-center justify-end text-text pt-10 layout">
          <PaginationItem
            current={currentPage}
            total={filteredPackages.length}
            pageSize={6}
            onChange={(page: any) => handlePageClick(null, page)}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default PackageOfCenter;
