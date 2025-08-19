import { Dumbbell } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-primary border-b-2 border-b-border shadow-md fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4 lg:px-0 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex gap-2 items-center hover:text-accent-blue">
          <Dumbbell className="h-10 w-10 bg-white text-primary p-2 rounded-full" />
          <h3 className="font-semibold text-xl text-text">GymBow</h3>
        </Link>

        {/* navbars */}
        <nav className="hidden md:flex gap-6 items-center font-medium text-text">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition ${
                isActive
                  ? "text-accent-blue font-semibold border-b-2 border-b-accent-blue"
                  : ""
              }`
            }
          >
            Trang chủ
          </NavLink>

          <NavLink
            to="/my-packages"
            className={({ isActive }) =>
              `transition ${isActive ? "text-accent-blue font-semibold" : ""}`
            }
          >
            Gói của tôi
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              `transition ${isActive ? "text-accent-blue font-semibold" : ""}`
            }
          >
            Dịch vụ
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `transition ${isActive ? "text-accent-blue font-semibold" : ""}`
            }
          >
            Liên hệ
          </NavLink>
        </nav>
        <div className="hidden md:block">
          <Link
            to="/auth"
            className="px-4 py-2 text-white rounded-lg hover:bg-accent-blue transition border border-border "
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
