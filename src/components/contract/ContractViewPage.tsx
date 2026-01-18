import { useContract } from "../../store/ContractContext";
import { useBlueprint } from "../../store/BlueprintContext";

export default function ContractViewPage() {
  const { contracts } = useContract();
  const { blueprints } = useBlueprint();

  if (contracts.length === 0) {
    return <p style={{ padding: "20px" }}>No contract selected</p>;
  }

  // Showing latest contract (safe MVP approach)
  const contract = contracts[contracts.length - 1];

  const blueprint = blueprints.find(
    (b) => b.id === contract.blueprintId
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#2563eb" }}>Contract View</h2>

      <div style={{ marginBottom: "15px" }}>
        <p>
          <strong>Contract Name:</strong> {contract.blueprintName}
        </p>
        <p>
          <strong>Blueprint:</strong> {contract.blueprintName}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span style={{ fontWeight: 600 }}>{contract.status}</span>
        </p>
        <p>
          <strong>Created At:</strong> {contract.createdAt}
        </p>
      </div>

      <hr />

      <h3 style={{ marginTop: "20px" }}>Contract Fields</h3>

      {!blueprint || blueprint.fields.length === 0 ? (
        <p>No fields available</p>
      ) : (
        <div style={{ marginTop: "10px" }}>
          {blueprint.fields.map((field) => (
            <div
              key={field.id}
              style={{
                border: "1px solid #e5e7eb",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "6px",
              }}
            >
              <p>
                <strong>Label:</strong> {field.label}
              </p>
              <p>
                <strong>Type:</strong> {field.type}
              </p>
              <p>
                <strong>Position:</strong> x:{field.position.x}, y:
                {field.position.y}
              </p>

              {/* READ-ONLY FIELD PREVIEW */}
              {field.type === "TEXT" && (
                <input type="text" disabled placeholder="Text value" />
              )}

              {field.type === "DATE" && (
                <input type="date" disabled />
              )}

              {field.type === "SIGNATURE" && (
                <div
                  style={{
                    border: "1px dashed gray",
                    padding: "10px",
                    width: "200px",
                  }}
                >
                  Signature Area
                </div>
              )}

              {field.type === "CHECKBOX" && (
                <input type="checkbox" disabled />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}