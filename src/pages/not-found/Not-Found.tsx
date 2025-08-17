import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Home, ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "../../components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8">
          <AlertTriangle className="w-24 h-24 text-text-error mx-auto mb-6" />
          <h1 className="text-6xl font-bold text-text-muted mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-muted mb-4">
            Trang không tồn tại
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
            Hãy kiểm tra lại đường dẫn hoặc quay về trang chủ.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={goBack}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Button>
          <Button onClick={goHome} className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Về trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
