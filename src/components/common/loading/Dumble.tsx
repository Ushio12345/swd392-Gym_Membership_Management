import { Dumbbell } from "lucide-react";
import { cn } from "../../../lib/utils";

interface Props {
  className?: string;
}

const LoadingDumbbell = ({ className }: Props) => {
  return (
    <Dumbbell className={cn("w-5 h-5 animate-spin text-primary", className)} />
  );
};

export default LoadingDumbbell;
