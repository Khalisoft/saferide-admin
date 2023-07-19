import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./assets/css/tailwind.output.css";
import App from "./App";
import { SidebarProvider } from "./context/SidebarContext";
import ThemedSuspense from "./components/ThemedSuspense";
import { Windmill } from "@windmill/react-ui";
import * as serviceWorker from "./serviceWorker";
import { AuthProvider } from "./context/AuthContext";
import { LoginContext, LoginProvider } from "./context/LoginContext";
import { ThemeProvider } from "./context/ThemeContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dotenv from "dotenv";
import myStyle from "./utils/myStyle";

// if (process.env.NODE_ENV !== 'production') {
//   const axe = require('react-axe')
//   axe(React, ReactDOM, 1000)
// }

const queryClient = new QueryClient();
ReactDOM.render(
	<LoginProvider>
		<SidebarProvider>
			<Suspense fallback={<ThemedSuspense />}>
				<Windmill usePreferences light theme={myStyle}>
					<QueryClientProvider client={queryClient}>
						<App />
						<ReactQueryDevtools />
					</QueryClientProvider>
				</Windmill>
			</Suspense>
		</SidebarProvider>
	</LoginProvider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
