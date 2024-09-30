import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import logo from "../assets/logo/nhws-logo.png";
import logoText from "../assets/logo/nhws-text.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileMenu from "../../utils/ProfileMenu";

const menuItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Program",
    path: "/program",
  },
  {
    name: "Certificates",
    path: "/certificates",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative w-full bg-black/5 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <Link to="/">
            <img width="50" height="50" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="text-sm font-semibold text-black hover:text-blue-700"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {currentUser ? (
          <div className="hidden lg:block">
            <ProfileMenu
              avatar={currentUser?.data?.user?.avatar?.url}
              is_admin={currentUser?.data?.user?.is_admin}
              accessToken={currentUser?.data?.accessToken}
            />
          </div>
        ) : (
          <div className="hidden lg:block">
            <Link
              to="/sign-in"
              className="px-3 py-2 text-sm font-semibold text-black hover:text-blue-700"
            >
              Sign In
            </Link>
          </div>
        )}

        <div className="lg:hidden">
          <IoMenu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex space-x-2">
                    <Link to="/">
                      <img width="50" height="50" src={logoText} alt="logo" />
                    </Link>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <RxCross2 className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:text-blue-700"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="mt-6 ">
                  {currentUser ? (
                    <div className="lg:hidden">
                      <ProfileMenu
                        avatar={currentUser?.data?.user?.avatar?.url}
                        is_admin={currentUser?.data?.user?.is_admin}
                        accessToken={currentUser?.data?.accessToken}
                      />
                    </div>
                  ) : (
                    <div className="grid gap-y-4">
                      <Link
                        to="/sign-in"
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-blue-700"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          Sign In
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
