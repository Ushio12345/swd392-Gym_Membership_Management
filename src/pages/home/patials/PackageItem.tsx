import { CheckCheckIcon, Clock, Crown, MapPin } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../lib/utils";

type PackageItemProps = {
  id: number;
  name: string;
  description: string;
  price: number;
  durationMonths: number;
  centerName: string;
};

export default function PackageItem({
  id,
  name,
  description,
  price,
  durationMonths,
  centerName,
}: PackageItemProps) {
  const navigator = useNavigate();

  const [showMore, setShowMore] = useState(false);
  return (
    <Card className="flex flex-col justify-between group px-4 py-7 shadow-lg bg-card rounded-2xl border border-border  duration-500 transition-all hover:bg-white/10 hover:-translate-y-7">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Crown
            className="text-center bg-orange-100 p-4 rounded-full text-orange-700"
            width={60}
            height={60}
          />
        </div>

        <CardTitle className="text-xl font-bold text-text-primary">
          {name}
        </CardTitle>
        <p className="text-sm text-text-secondary flex justify-center items-center gap-2">
          <MapPin />
          {centerName}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <p className="text-4xl font-semibold text-accent-blue">
          {formatPrice(price)}
        </p>
        <p className="text-text-secondary text-base md:text-md flex items-center gap-2">
          <Clock /> {durationMonths} mounths
        </p>
        <div className="text-center text-text-muted flex gap-2 items-start">
          <CheckCheckIcon
            className="bg-accent-success p-2 rounded-full text-black shrink-0"
            width={30}
            height={30}
          />
          <div>
            {showMore ? description : description.slice(0, 30) + "..."}
            {description.length > 30 && (
              <span
                className="text-accent-blue ml-2 hover:underline cursor-pointer"
                onClick={() => setShowMore((pre) => !pre)}
              >
                {showMore ? "Hide" : "Show more"}
              </span>
            )}
          </div>
        </div>

        <Button
          variant={"light"}
          className=" w-full mt-4 bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/40 transition"
          onClick={() => navigator(`/package-plan-detail/${id}`)}
        >
          Detail Package
        </Button>
      </CardContent>
    </Card>
  );
}
