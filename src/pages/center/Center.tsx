import { useEffect, useState } from "react";
import type { Center } from "../../constant/types/package";
import { getAllCenters } from "../../api/center-api";
import CenterItem from "./patials/CenterItem";
import { Button } from "../../components/ui/button";

const Center = () => {
  const [center, setCenter] = useState<Center[] | []>([]);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    const fetchAllCenter = async () => {
      try {
        const res = await getAllCenters();
        setCenter(res);
      } catch {
        console.log("Error when feching data center");
      }
    };
    fetchAllCenter();
  }, []);
  const displayedCenters = showAll ? center : center.slice(0, 3);
  return (
    <div className="layout section gap-7 ">
      <h4 className="md:text-4xl text-2xl">Our's Center</h4>

      <div className="grid md:grid-cols-3 gap-5 justify-between items-center my-10 ">
        {displayedCenters.length > 0 ? (
          displayedCenters.map((c) => <CenterItem center={c} key={c.id} />)
        ) : (
          <div className="text-center text-text-error">No data...</div>
        )}
      </div>

      <Button onClick={() => setShowAll((pre) => !pre)} className="min-w-16">
        {showAll ? "Hide" : "Show All Center"}
      </Button>
    </div>
  );
};

export default Center;
