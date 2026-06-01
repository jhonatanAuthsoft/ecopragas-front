import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { QueryProvider } from "@/rest/query-provider";
import { SessionProvider } from "@/store/session-provider";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryProvider>
      <SessionProvider>
        <App />
      </SessionProvider>
    </QueryProvider>
  </BrowserRouter>,
);
