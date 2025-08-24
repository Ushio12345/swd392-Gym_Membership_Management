import { AlertCircle } from "lucide-react";
import { Button } from "../../../components/ui/button";

const ErrorPackageComponent = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto mt-10">
      <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
        <div className="p-6 bg-foreground text-text-primary flex items-center gap-4">
          <AlertCircle size={24} className="text-red-600" />
          <div>
            <h2 className="text-xl font-semibold text-red-600">Error</h2>
            <p className="text-text-secondary mt-2">
              This package is currently unavailable or has an error. Please
              select another package.
            </p>
          </div>
        </div>
        <div className="border-t border-border px-6 py-4 flex justify-center">
          <Button
            variant={"primary"}
            onClick={() => (window.location.href = "/packages")}
          >
            View Other Packages
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPackageComponent;
