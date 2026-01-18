import type { ContractStatus } from "../../store/ContractContext";

type Props = {
  status: ContractStatus;
};

export default function StatusBadge({ status }: Props) {
  const colors: Record<ContractStatus, string> = {
    CREATED: "#6b7280",
    APPROVED: "#16a34a",
    SENT: "#2563eb",
    SIGNED: "#7c3aed",
    LOCKED: "#000000",
    REVOKED: "#dc2626",
  };

  return (
    <span
      style={{
        backgroundColor: colors[status],
        color: "white",
        padding: "4px 10px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 600,
      }}
    >
      {status}
    </span>
  );
}