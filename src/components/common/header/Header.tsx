import { Dumbbell, LogOut, Menu, User } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { use, useState } from "react";
import { Drawer } from "antd";
import { useAuth } from "../../../lib/context/authContext";
import UserDropDown from "./patials/UserDropDown";

const Header = () => {
  const { token, logout, user } = useAuth();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/packages", label: "Packages" },
    { path: "/our-services", label: "Services" },
    { path: "/contact", label: "Contact" },
    // { path: "/manage-package", label: "Manage"},
  ];

  return (
    <header className="w-full bg-primary border-b-2 border-b-border shadow-md fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4 lg:px-0 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex gap-2 items-center hover:text-accent-blue">
          <Dumbbell className="h-10 w-10 bg-white text-primary p-2 rounded-full" />
          <h3 className="font-semibold text-xl text-text">GymBow</h3>
        </Link>

        {/* nav desktop */}
        <nav className="hidden md:flex gap-6 items-center font-medium text-text">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "text-accent-blue font-semibold border-b-2 border-b-accent-blue"
                    : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          {user?.role === "STAFF" && (
            <NavLink to={"/manage-package"} className="text-lg font-medium">
              Manage
            </NavLink>
          )}
        </nav>

        {/* nav mobile toggle */}
        <div className="md:hidden flex items-center">
          <Menu
            className="text-white cursor-pointer"
            size={28}
            onClick={() => setOpen(true)}
          />
        </div>

        {/* user menu */}
        {token ? (
          <UserDropDown user={user} logout={logout} />
        ) : (
          <div className="hidden md:block">
            <Link
              to="/auth"
              className="px-4 py-2 text-white rounded-lg hover:bg-accent-blue transition border border-border"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Drawer menu for mobile */}
      <Drawer
        placement="left"
        closable
        onClose={() => setOpen(false)}
        open={open}
      >
        {token && (
          <NavLink
            to="profile"
            className="bg-card flex items-center gap-3 p-3 rounded-lg hover:bg-foreground transition-colors border border-border mb-4"
          >
            <User className="text-text-primary size-6" />
            <div className="flex flex-col">
              <p className="text-text-primary font-semibold text-base">
                {user?.fullName}
              </p>
              <span className="text-text-secondary text-sm">{user?.email}</span>
            </div>
          </NavLink>
        )}
        <nav className="flex flex-col gap-4">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className="text-lg font-medium"
            >
              {item.label}
            </NavLink>
          ))}

          <div className="border-t pt-4 mt-4">
            {token ? (
              <button
                className="w-full text-left text-red-500"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
              >
                <LogOut className="inline-block mr-2" /> Logout
              </button>
            ) : (
              <Link
                to="/auth"
                className="text-accent-blue font-semibold"
                onClick={() => setOpen(false)}
              >
                Sign Up / Login
              </Link>
            )}
          </div>
        </nav>
      </Drawer>
    </header>
  );
};

export default Header;
