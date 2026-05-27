import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setBaseUrl } from "../../../lib/api-client-react/src";

// Initialize API client base URL from Vite env (VITE_API_URL).
// Make sure `.env.local` contains `VITE_API_URL` and restart the dev server.
setBaseUrl(import.meta.env.VITE_API_URL ?? null);

createRoot(document.getElementById("root")!).render(<App />);
