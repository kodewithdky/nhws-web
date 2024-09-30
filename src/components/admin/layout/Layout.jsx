import SideBar from "../SideBar";

const Layout = ({ children }) => {
  return (
    <div>
      <SideBar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
