import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./layout/Layout";
import AddProgram from "./AddProgram";
import AllProgram from "./AllProgram";

const ManageProgram = () => {
  const [selectedComponent, setSelectedComponent] = useState("Profile");
  return (
    <Layout>
      <div className="flex min-h-screen w-full flex-col absolute sm:left-[15%] max-w-[80vw]">
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 sm:pl-20">
          <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">Manage Program</h1>
          </div>
          <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            <nav className="grid gap-4 text-sm text-muted-foreground">
              <Link
                href="#"
                className={
                  selectedComponent === "AllProgram"
                    ? "font-semibold text-primary"
                    : ""
                }
                onClick={() => setSelectedComponent("AllProgram")}
              >
                Programs
              </Link>
              <Link
                href="#"
                className={
                  selectedComponent === "Add Program"
                    ? "font-semibold text-primary"
                    : ""
                }
                onClick={() => setSelectedComponent("Add Program")}
              >
                Add Program
              </Link>
            </nav>
            <div className="grid gap-6">
              {(() => {
                switch (selectedComponent) {
                  case "AllProgram":
                    return <AllProgram />;
                  case "Add Program":
                    return <AddProgram />;
                  default:
                    return <AllProgram />;
                }
              })()}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default ManageProgram;
