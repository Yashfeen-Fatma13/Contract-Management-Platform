import type { Contract } from "../../store/ContractContext";
import type { Blueprint } from "../../store/BlueprintContext";

type Props = {
  contract: Contract;
  blueprint?: Blueprint;
  onClose: () => void;
};

export default function ContractViewModal({
  contract,
  blueprint,
  onClose,
}: Props) {
  if (!blueprint) return null;

  const isLocked = contract.status === "LOCKED";
  const isRevoked = contract.status === "REVOKED";

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>Contract: {contract.blueprintName}</h3>

        <p style={{ fontSize: "13px", color: "#64748b" }}>
          Lifecycle: Created → Approved → Sent → Signed → Locked
        </p>

        <p>
          <strong>Status:</strong> {contract.status}
        </p>

        <hr />

        {blueprint.fields.map((f) => (
          <div key={f.id} style={{ marginBottom: "10px" }}>
            <label>{f.label}</label>

            {f.type === "TEXT" && (
              <input disabled={isLocked || isRevoked} style={input} />
            )}

            {f.type === "DATE" && (
              <input
                type="date"
                disabled={isLocked || isRevoked}
                style={input}
              />
            )}

            {f.type === "CHECKBOX" && (
              <input type="checkbox" disabled={isLocked || isRevoked} />
            )}

            {f.type === "SIGNATURE" && (
              <input
                placeholder="Signature"
                disabled={isLocked || isRevoked}
                style={input}
              />
            )}
          </div>
        ))}

        {(isLocked || isRevoked) && (
          <p style={{ color: "#ef4444", fontSize: "12px" }}>
            Editing disabled for this contract.
          </p>
        )}

        <button onClick={onClose} style={btn}>
          Close
        </button>
      </div>
    </div>
  );
}

/* styles */
const overlay = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modal = {
  background: "white",
  padding: "20px",
  width: "420px",
  borderRadius: "10px",
};

const input = {
  width: "100%",
  marginTop: "4px",
  padding: "6px",
};

const btn = {
  marginTop: "10px",
  padding: "6px 12px",
};