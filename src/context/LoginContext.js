import React, { useState, useMemo, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AUTH } from "../data/constants";
import { TOKEN } from "./../data/constants";

// create context
export const LoginContext = React.createContext();

export const LoginProvider = ({ children }) => {
	const login = (role) => {
		const user = JSON.parse(localStorage.getItem(AUTH));
		if (!user) {
			window.location = "/login";
		} else {
			const { data } = user;
			window.location = `/app/${role}/dashboard`;
		}
	};
	const logout = () => {
		// const user = JSON.parse(localStorage.getItem(AUTH));
		localStorage.removeItem(AUTH);
		localStorage.removeItem(TOKEN);
		window.location = "/login";
		// if (!user) {
		// } else {
		// 	const { data } = user;
		// 	window.location = `/app/${data?.role}`;
		// }
	};

	const value = useMemo(
		() => ({
			login,
			logout,
		}),
		[]
	);

	return (
		<LoginContext.Provider value={value}>{children}</LoginContext.Provider>
	);
};
