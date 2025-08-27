
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
type UserDropDownType = {
  user: any;
  logout: () => void;
};
const UserDropDown = ({ user, logout }: UserDropDownType) => {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        data-slot="dropdown-menu-trigger"
        className="hidden md:block px-4 py-2 text-white rounded-lg border border-border hover:bg-accent-blue transition"
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
  );
};

export default UserDropDown;
