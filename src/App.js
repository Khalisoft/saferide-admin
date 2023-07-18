import React, { lazy, useEffect, useContext } from "react";
import { Toaster } from "react-hot-toast";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import { WindmillContext, Button } from "@windmill/react-ui";
import { ThemeContext } from "./context/ThemeContext";

const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

function App() {
	console.log(process.env.REACT_APP_ANOTHER);
	// const { mode, toggleMode } = useContext(WindmillContext);
	// const { theme, toggleTheme } = useContext(ThemeContext);
	// const changeToLigh = () => {
	// 	console.log("theme");
	// 	if (theme === "dark" || theme === false) toggleTheme();
	// };
	useEffect(() => {
		// console.log(theme);
		// changeToLigh();
		// toggleMode();
		// toggleTheme();
		// toggleTheme();
	}, []);
	return (
		<>
			<Toaster
				position="top-center"
				reverseOrder={false}
				gutter={8}
				containerClassName=""
				containerStyle={{}}
				toastOptions={{
					// Define default options
					className: "",
					duration: 5000,
					style: {
						background: "#363636",
						color: "#fff",
					},

					// Default options for specific types
					success: {
						duration: 3000,
						theme: {
							primary: "green",
							secondary: "black",
						},
					},
				}}
			/>

			<Router>
				<AccessibleNavigationAnnouncer />
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/create-account" component={CreateAccount} />
					<Route path="/forgot-password" component={ForgotPassword} />
					{/* Place new routes over this */}
					<Route path="/app" component={Layout} />
					{/* If you have an index page, you can remothis Redirect */}
					<Redirect exact from="/" to="/login" />
				</Switch>
			</Router>
		</>
	);
}

export default App;
