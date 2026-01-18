import { useState } from "react";
import { useBlueprint } from "../../store/BlueprintContext";

export default function BlueprintBuilder() {
  const { blueprints, addBlueprint } = useBlueprint();
  const [name, setName] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#2563eb" }}>Create Blueprint</h2>

      <input
        type="text"
        placeholder="Blueprint name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
  onClick={() => addBlueprint(name)}
  style={{
    marginLeft: "8px",
    padding: "6px 14px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Create
</button>

      <h3 style={{ marginTop: "20px" }}>Existing Blueprints</h3>

      {blueprints.length === 0 && <p>No blueprints yet</p>}

      <ul>
        {blueprints.map((b) => (
          <li key={b.id}>{b.name}</li>
        ))}
      </ul>
    </div>
  );
}