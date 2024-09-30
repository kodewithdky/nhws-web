import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./layout/Layout";
import AllTeam from "./AllTeam";
import AddTeam from "./AddTeam";

const ManageTeam = () => {
  const [selectedComponent, setSelectedComponent] = useState("Profile");
  return (
    <Layout>
      <div className="flex min-h-screen w-full flex-col absolute sm:left-[15%] max-w-[80vw]">
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 sm:pl-20">
          <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">Manage Team</h1>
          </div>
          <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            <nav className="grid gap-4 text-sm text-muted-foreground">
              <Link
                to="#"
                className={
                  selectedComponent === "AllTeam"
                    ? "font-semibold text-primary"
                    : ""
                }
                onClick={() => setSelectedComponent("AllTeam")}
              >
                Teams
              </Link>
              <Link
                to="#"
                className={
                  selectedComponent === "Add Team"
                    ? "font-semibold text-primary"
                    : ""
                }
                onClick={() => setSelectedComponent("Add Team")}
              >
                Add Team
              </Link>
            </nav>
            <div className="grid gap-6">
              {(() => {
                switch (selectedComponent) {
                  case "AllTeam":
                    return <AllTeam />;
                  case "Add Team":
                    return <AddTeam />;
                  default:
                    return <AllTeam />;
                }
              })()}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default ManageTeam;
