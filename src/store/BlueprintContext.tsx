import React, { createContext, useContext, useState } from "react";

/* ===== FIELD TYPES ===== */
export type BlueprintFieldType =
  | "TEXT"
  | "DATE"
  | "SIGNATURE"
  | "CHECKBOX";

/* ===== FIELD ===== */
export type BlueprintField = {
  id: string;
  type: BlueprintFieldType;
  label: string;
  position: {
    x: number;
    y: number;
  };
};

/* ===== BLUEPRINT ===== */
export type Blueprint = {
  id: string;
  name: string;
  fields: BlueprintField[];
};

/* ===== CONTEXT TYPE ===== */
type BlueprintContextType = {
  blueprints: Blueprint[];
  addBlueprint: (name: string) => void;
};

/* ===== CONTEXT ===== */
const BlueprintContext = createContext<BlueprintContextType | null>(
  null
);

/* ===== PROVIDER ===== */
export function BlueprintProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [blueprints, setBlueprints] = useState<Blueprint[]>([]);

  const addBlueprint = (name: string) => {
    const newBlueprint: Blueprint = {
      id: crypto.randomUUID(),
      name,
      fields: [
        {
          id: crypto.randomUUID(),
          type: "TEXT",
          label: "Client Name",
          position: { x: 10, y: 20 },
        },
        {
          id: crypto.randomUUID(),
          type: "DATE",
          label: "Agreement Date",
          position: { x: 10, y: 60 },
        },
        {
          id: crypto.randomUUID(),
          type: "SIGNATURE",
          label: "Client Signature",
          position: { x: 10, y: 100 },
        },
        {
          id: crypto.randomUUID(),
          type: "CHECKBOX",
          label: "Accepted Terms",
          position: { x: 10, y: 140 },
        },
      ],
    };

    setBlueprints((prev) => [...prev, newBlueprint]);
  };

  return (
    <BlueprintContext.Provider value={{ blueprints, addBlueprint }}>
      {children}
    </BlueprintContext.Provider>
  );
}

/* ===== HOOK ===== */
export function useBlueprint() {
  const context = useContext(BlueprintContext);
  if (!context) {
    throw new Error(
      "useBlueprint must be used inside BlueprintProvider"
    );
  }
  return context;
}