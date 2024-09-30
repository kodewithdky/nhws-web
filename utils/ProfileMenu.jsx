import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../src/redux/slices/userSlice";
import { LogOut, User, LayoutGrid } from "lucide-react";
import { toast } from "react-toastify";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";

const ProfileMenu = ({ avatar, is_admin, accessToken }) => {
  const server = import.meta.env.VITE_SERVER;
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch(`${server}/auth/logout`, {
        method: "POST",
        headers: { Authorization: `${accessToken}` },
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        dispatch(signoutSuccess());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Menu>
      <MenuHandler>
        <Avatar
          variant="circular"
          alt="tania andrew"
          className="cursor-pointer w-9 h-9"
          src={`${
            avatar
              ? avatar
              : "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
          }`}
        />
      </MenuHandler>
      <MenuList>
        <MenuItem className="flex items-center gap-2">
          <User />
          <Link to={"/account"}>
            <Typography variant="small" className="font-medium">
              My Profile
            </Typography>
          </Link>
        </MenuItem>
        {is_admin ? (
          <MenuItem className="flex items-center gap-2">
            <LayoutGrid />
            <Link to="/dashboard">
              <Typography variant="small" className="font-medium">
                Dashboard
              </Typography>
            </Link>
          </MenuItem>
        ) : (
          ""
        )}
        <hr className="my-2 border-blue-gray-50" />
        <MenuItem className="flex items-center gap-2 ">
          <LogOut />
          <Typography
            onClick={handleSignout}
            variant="small"
            className="font-medium"
          >
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
