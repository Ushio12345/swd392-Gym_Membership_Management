import { Dumbbell, LogOut, User } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../lib/context/authContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

const Header = () => {
  const navigate = useNavigate();
  const { token, logout, user } = useAuth();
  return (
    <header className="w-full bg-primary border-b-2 border-b-border shadow-md fixed top-0 left-0 z-50">
      <div className="container  mx-auto px-4 lg:px-0 flex justify-between items-center h-16">
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
            Home
          </NavLink>

          <NavLink
            to="/packages"
            className={({ isActive }) =>
              `transition ${isActive ? "text-accent-blue font-semibold" : ""}`
            }
          >
            Packages
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              `transition ${isActive ? "text-accent-blue font-semibold" : ""}`
            }
          >
            Services
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `transition ${isActive ? "text-accent-blue font-semibold" : ""}`
            }
          >
            Contact
          </NavLink>
        </nav>
        {token ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              data-slot="dropdown-menu-trigger"
              className="px-4 py-2 text-white rounded-lg border border-border hover:bg-accent-blue transition"
            >
              {user?.fullName}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-card text-text-primary shadow-lg min-w-[200px]"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuItem
                className="hover:bg-foreground"
                onClick={() => navigate("/profile")}
              >
                <User className="mr-2 size-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem
                className="hover:bg-foreground text-accent-error"
                onClick={logout}
              >
                <LogOut className="mr-2 size-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="hidden md:block">
            <Link
              to="/auth"
              className="px-4 py-2 text-white rounded-lg hover:bg-accent-blue transition border border-border "
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
