import React, { useState, useMemo, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AUTH } from "../data/constants";

// create context
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isAuth, setIsAuth] = useState(false);
	const [authData, setAuthData] = useState(null);

	const findAuth = () => {
		const user = JSON.parse(localStorage.getItem(AUTH));
		if (!user) {
			setIsAuth(!true);
			setAuthData(null);
			window.location = "/login";
		}
		setIsAuth(true);
		setAuthData(user);
		// window.location = "/app/dashboard";
	};

	useEffect(() => {
		// !isAuth && (window.location = "/login");
		findAuth();
	}, []);

	const value = useMemo(
		() => ({
			isAuth,
			authData,
		}),
		[isAuth]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
