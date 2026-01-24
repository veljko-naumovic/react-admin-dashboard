import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { AuthProvider } from "./auth/AuthProvider";

dayjs.extend(isBetween);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AuthProvider>
	</StrictMode>,
);
