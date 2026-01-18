import { useState } from "react";
import LoginMock from "./components/LoginMock";
import ContractPage from "./components/contract/ContractPage";
import BlueprintBuilder from "./components/blueprint/BlueprintBuilder";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔹 DEFAULT PAGE = BLUEPRINTS (SAFE CHANGE)
  const [activePage, setActivePage] = useState<
    "contracts" | "blueprints"
  >("blueprints");

  /* ---------- LOGIN SCREEN ---------- */
  if (!isLoggedIn) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%)",
        }}
      >
        <LoginMock onLogin={() => setIsLoggedIn(true)} />
      </div>
    );
  }

  /* ---------- MAIN APP ---------- */
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* SIDEBAR */}
      <div
        style={{
          width: "220px",
          background: "#1e3a8a",
          color: "white",
          padding: "20px",
        }}
      >
        <h3 style={{ marginBottom: "30px", lineHeight: 1.3 }}>
          Contract
          <br />
          Management
        </h3>

        {/* 🔹 BLUEPRINTS FIRST */}
        <button
          onClick={() => setActivePage("blueprints")}
          style={sidebarBtn(activePage === "blueprints")}
        >
          🧩 Blueprints
        </button>

        <button
          onClick={() => setActivePage("contracts")}
          style={sidebarBtn(activePage === "contracts")}
        >
          📄 Contracts
        </button>

        <button
          onClick={() => setIsLoggedIn(false)}
          style={{
            marginTop: "40px",
            background: "transparent",
            border: "1px solid #93c5fd",
            color: "white",
            padding: "8px",
            borderRadius: "6px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, background: "#f8fafc" }}>
        {/* HEADER */}
        <div
          style={{
            background: "white",
            padding: "14px 20px",
            borderBottom: "1px solid #e5e7eb",
            fontWeight: 600,
          }}
        >
          {activePage === "blueprints"
            ? "Blueprint Builder"
            : "Contract Dashboard"}
        </div>

        {/* PAGE CONTENT */}
        <div style={{ padding: "20px", overflowY: "auto" }}>
          {activePage === "blueprints" && <BlueprintBuilder />}
          {activePage === "contracts" && <ContractPage />}
        </div>
      </div>
    </div>
  );
}

/* ---------- SIDEBAR BUTTON ---------- */
function sidebarBtn(active: boolean) {
  return {
    display: "block",
    width: "100%",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: active ? "#2563eb" : "transparent",
    color: "white",
    textAlign: "left" as const,
  };
}