type Props = {
  open: boolean;
  onClose: () => void;
};

export default function InviteUsersModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3 style={{ marginBottom: "12px" }}>
          Send Invites for Contract
        </h3>

        <input
          placeholder="Invite by Email"
          style={input}
        />

        <div style={{ marginTop: "12px" }}>
          <strong>Invited Users</strong>

          <div style={userRow}>
            <span>example@gmail.com</span>
            <select>
              <option>Read</option>
              <option>Edit</option>
              <option>Approve</option>
            </select>
          </div>
        </div>

        <div style={actions}>
          <button onClick={onClose} style={btnSecondary}>
            Cancel
          </button>
          <button style={btnPrimary}>
            Invite
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== styles ===== */

const overlay = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 100,
};

const modal = {
  background: "#fff",
  width: "380px",
  padding: "20px",
  borderRadius: "10px",
};

const input = {
  width: "100%",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const userRow = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "8px",
};

const actions = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "8px",
  marginTop: "16px",
};

const btnPrimary = {
  background: "#7c3aed",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

const btnSecondary = {
  background: "#e5e7eb",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};