import { CheckCheckIcon, Clock, Crown, MapPin } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

type PackageItemProps = {
  name: string;
  description: string;
  price: number;
  durationMonths: number;
  centerName: string;
};

export default function PackageItem({
  name,
  description,
  price,
  durationMonths,
  centerName,
}: PackageItemProps) {
  const formatPrice = (value: number) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  return (
    <Card className=" group px-4 py-7 shadow-lg bg-card rounded-2xl border border-border  duration-500 transition-all hover:bg-white/10 hover:-translate-y-7 mt-20">
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
        <p className="text-center text-text-muted flex gap-2 items-center">
          <CheckCheckIcon
            className="bg-accent-success p-2 rounded-full text-black "
            width={30}
            height={30}
          />
          {description}
        </p>
        <Button
          variant={"light"}
          className="hidden w-full mt-4 bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/40 transition"
        >
          Detail Package
        </Button>
      </CardContent>
    </Card>
  );
}
