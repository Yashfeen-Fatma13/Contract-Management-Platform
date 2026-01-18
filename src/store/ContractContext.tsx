import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type ContractStatus =
  | "CREATED"
  | "APPROVED"
  | "SENT"
  | "SIGNED"
  | "LOCKED"
  | "REVOKED";

export type Contract = {
  id: string;
  blueprintId: string;
  blueprintName: string;
  status: ContractStatus;
  createdAt: string;
};

type ContractContextType = {
  contracts: Contract[];
  createContract: (blueprintId: string, blueprintName: string) => void;
  approveContract: (id: string) => void;
  sendContract: (id: string) => void;
  signContract: (id: string) => void;
  lockContract: (id: string) => void;
  revokeContract: (id: string) => void;
};

const ContractContext = createContext<ContractContextType | undefined>(
  undefined
);

export function ContractProvider({ children }: { children: ReactNode }) {
  const [contracts, setContracts] = useState<Contract[]>([]);

  const createContract = (
    blueprintId: string,
    blueprintName: string
  ) => {
    setContracts((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        blueprintId,
        blueprintName,
        status: "CREATED",
        createdAt: new Date().toLocaleString(),
      },
    ]);
  };

  const approveContract = (id: string) => {
    setContracts((prev) =>
      prev.map((c) =>
        c.id === id && c.status === "CREATED"
          ? { ...c, status: "APPROVED" }
          : c
      )
    );
  };

  const sendContract = (id: string) => {
    setContracts((prev) =>
      prev.map((c) =>
        c.id === id && c.status === "APPROVED"
          ? { ...c, status: "SENT" }
          : c
      )
    );
  };

  const signContract = (id: string) => {
    setContracts((prev) =>
      prev.map((c) =>
        c.id === id && c.status === "SENT"
          ? { ...c, status: "SIGNED" }
          : c
      )
    );
  };

  const lockContract = (id: string) => {
    setContracts((prev) =>
      prev.map((c) =>
        c.id === id && c.status === "SIGNED"
          ? { ...c, status: "LOCKED" }
          : c
      )
    );
  };

  const revokeContract = (id: string) => {
    setContracts((prev) =>
      prev.map((c) =>
        c.id === id && c.status !== "LOCKED"
          ? { ...c, status: "REVOKED" }
          : c
      )
    );
  };

  return (
    <ContractContext.Provider
      value={{
        contracts,
        createContract,
        approveContract,
        sendContract,
        signContract,
        lockContract,
        revokeContract,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
}

export function useContract() {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error(
      "useContract must be used inside ContractProvider"
    );
  }
  return context;
}