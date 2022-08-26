import Navbar from "./Navbar";

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="pt-16">{children}</main>
    </>
  );
};

export default Layout;
