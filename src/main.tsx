import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BlueprintProvider } from "./store/BlueprintContext";
import { ContractProvider } from "./store/ContractContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BlueprintProvider>
      <ContractProvider>
        <App />
      </ContractProvider>
    </BlueprintProvider>
  </React.StrictMode>
);