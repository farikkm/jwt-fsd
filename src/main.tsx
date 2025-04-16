import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/styles/main.css"
import { App } from "./app/App";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("@/shared/mocks/browser");

  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
