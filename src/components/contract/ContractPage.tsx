import { useState } from "react";
import { useBlueprint } from "../../store/BlueprintContext";
import { useContract } from "../../store/ContractContext";
import ContractViewModal from "../common/ContractViewModal";

/* ---------- STATUS COLOR ---------- */
const statusColor = (status: string) => {
  switch (status) {
    case "CREATED":
      return "#facc15";
    case "APPROVED":
      return "#22c55e";
    case "SENT":
      return "#3b82f6";
    case "SIGNED":
      return "#6366f1";
    case "LOCKED":
      return "#64748b";
    case "REVOKED":
      return "#ef4444";
    default:
      return "#94a3b8";
  }
};

export default function ContractPage() {
  const { blueprints } = useBlueprint();
  const {
    contracts,
    createContract,
    approveContract,
    sendContract,
    signContract,
    lockContract,
    revokeContract,
  } = useContract();

  const [selectedBlueprintId, setSelectedBlueprintId] = useState("");
  const [filter, setFilter] = useState<
    "ALL" | "ACTIVE" | "PENDING" | "SIGNED"
  >("ALL");
  const [viewContract, setViewContract] = useState<any | null>(null);

  const selectedBlueprint = blueprints.find(
    (b) => b.id === selectedBlueprintId
  );

  /* ---------- FILTER LOGIC ---------- */
  const filteredContracts = contracts.filter((c) => {
    if (filter === "ALL") return true;
    if (filter === "ACTIVE")
      return c.status === "APPROVED" || c.status === "SENT";
    if (filter === "PENDING") return c.status === "CREATED";
    if (filter === "SIGNED") return c.status === "SIGNED";
    return true;
  });

  /* ---------- SUMMARY COUNTS ---------- */
  const total = contracts.length;
  const active = contracts.filter(
    (c) => c.status === "APPROVED" || c.status === "SENT"
  ).length;
  const pending = contracts.filter((c) => c.status === "CREATED").length;
  const signed = contracts.filter((c) => c.status === "SIGNED").length;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#2563eb", marginBottom: "12px" }}>
        Contract Dashboard
      </h2>

      {/* ---------- SUMMARY BAR ---------- */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        {[
          { label: "Total", value: total },
          { label: "Active", value: active },
          { label: "Pending", value: pending },
          { label: "Signed", value: signed },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "white",
              padding: "14px",
              borderRadius: "10px",
              width: "120px",
              textAlign: "center",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontSize: "12px", color: "#64748b" }}>
              {s.label}
            </div>
            <div style={{ fontSize: "20px", fontWeight: 700 }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* ---------- CREATE CONTRACT ---------- */}
      <div style={{ marginBottom: "16px" }}>
        <select
          value={selectedBlueprintId}
          onChange={(e) => setSelectedBlueprintId(e.target.value)}
        >
          <option value="">Select Blueprint</option>
          {blueprints.map((bp) => (
            <option key={bp.id} value={bp.id}>
              {bp.name}
            </option>
          ))}
        </select>

        <button
          disabled={!selectedBlueprint}
          onClick={() => {
            if (selectedBlueprint) {
              createContract(
                selectedBlueprint.id,
                selectedBlueprint.name
              );
            }
          }}
          style={{
            marginLeft: "10px",
            padding: "6px 14px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            opacity: selectedBlueprint ? 1 : 0.6,
          }}
        >
          Create Contract
        </button>
      </div>

      {/* ---------- FILTER ---------- */}
      <div style={{ marginBottom: "12px" }}>
        <strong>Filter:</strong>
        {["ALL", "ACTIVE", "PENDING", "SIGNED"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            style={{
              marginLeft: "6px",
              padding: "4px 10px",
              borderRadius: "20px",
              border: "1px solid #cbd5f5",
              background: filter === f ? "#2563eb" : "white",
              color: filter === f ? "white" : "#1e293b",
              cursor: "pointer",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ---------- TABLE ---------- */}
      {filteredContracts.length === 0 && <p>No contracts found</p>}

      {filteredContracts.length > 0 && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "white",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <thead style={{ background: "#f1f5f9" }}>
            <tr>
              <th>Name</th>
              <th>Blueprint</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredContracts.map((c) => (
              <tr key={c.id} style={{ textAlign: "center" }}>
                <td>{c.blueprintName}</td>
                <td>{c.blueprintName}</td>
                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      color: "white",
                      backgroundColor: statusColor(c.status),
                    }}
                  >
                    {c.status}
                  </span>
                </td>
                <td>{c.createdAt}</td>
                <td>
                  {c.status === "CREATED" && (
                    <button onClick={() => approveContract(c.id)}>
                      Approve
                    </button>
                  )}
                  {c.status === "APPROVED" && (
                    <button onClick={() => sendContract(c.id)}>
                      Send
                    </button>
                  )}
                  {c.status === "SENT" && (
                    <button onClick={() => signContract(c.id)}>
                      Sign
                    </button>
                  )}
                  {c.status === "SIGNED" && (
                    <button onClick={() => lockContract(c.id)}>
                      Lock
                    </button>
                  )}
                  {c.status !== "LOCKED" &&
                    c.status !== "REVOKED" && (
                      <button
                        style={{ marginLeft: "6px" }}
                        onClick={() => revokeContract(c.id)}
                      >
                        Revoke
                      </button>
                    )}
                  <button
                    style={{ marginLeft: "6px" }}
                    onClick={() => setViewContract(c)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ---------- VIEW MODAL (STEP-3 FINAL ADD) ---------- */}
      {viewContract && selectedBlueprint && (
        <ContractViewModal
          contract={viewContract}
          blueprint={selectedBlueprint}
          onClose={() => setViewContract(null)}
        />
      )}
    </div>
  );
}