import { create } from "zustand";
import {
	ADMINAUTH,
	AUTH,
	ROLE,
	TOKEN,
	TOKENS,
	UNAUTHORIZED,
} from "../data/constants";
import { signinAdminApi, signinAgentApi } from "./api";
import { reports, results } from "./../utils/data";

const handleAgentSignin = async (set, get, params) => {
	const signinAgent = await signinAgentApi(params);
	if (signinAgent.status === 404 || signinAgent.status === 403) {
		return { success: false, ...signinAgent };
	} else {
		localStorage.setItem(AUTH, JSON.stringify(signinAgent));
		localStorage.setItem(TOKEN, JSON.stringify(signinAgent?.auth?.token));
		localStorage.setItem(ROLE, JSON.stringify(signinAgent?.data?.role));
		set({ authData: signinAgent });
		set({ auth: true });
		return { success: true, ...signinAgent };
	}
};
const handleAdminSignin = async (set, get, params) => {
	const signinAdmin = await signinAdminApi(params);
	if (signinAdmin.status === 404 || signinAdmin.status === 403) {
		return { success: false, ...signinAdmin };
	} else {
		localStorage.setItem(AUTH, JSON.stringify(signinAdmin));
		localStorage.setItem(TOKEN, JSON.stringify(signinAdmin?.auth?.token));
		localStorage.setItem(ROLE, JSON.stringify(signinAdmin?.data?.role));
		set({ authData: signinAdmin });
		set({ auth: true });
		return { success: true, ...signinAdmin };
	}
};

// const handleAdminSignin = async (set, get, params) => {
// 	const signinFn = await signinApi(params);
// 	if (signinFn?.status) {
// 		localStorage.setItem(ADMINAUTH, JSON.stringify(signinFn?.data));
// 		localStorage.setItem(TOKENS, JSON.stringify(signinFn?.data?.tokens));
// 		set({ adminAuthData: params });
// 		set({ adminAuth: true });
// 		return signinFn;
// 	} else {
// 		return signinFn;
// 	}
// };

// const handleSignup = async (set, get, params) => {
// 	const signupUser = await signup(params);
// 	if (!signupUser) {
// 		alert("Error, Try Again");
// 		return false;
// 	}
// 	return true;
// };

// const handleGetUserProfile = async (set, get, params) => {
// 	const profile = await getUserProfile(params);
// 	localStorage.setItem(AUTH, JSON.stringify(profile));
// 	return profile;
// };

const handleSignout = async (set, get, params) => {
	localStorage.removeItem(AUTH);
	localStorage.removeItem(ADMINAUTH);
	localStorage.removeItem(TOKENS);
	set({ auth: false });
	set({ adminAuth: false });
};

const handleGetAuth = async (set, get) => {
	const findUser = JSON.parse(localStorage.getItem(AUTH));

	if (findUser) {
		set({ auth: true });
		set({ authData: findUser });
	}
};
// const handleGetAdminAuth = async (set, get) => {
// 	const findAdmin = JSON.parse(localStorage.getItem(ADMINAUTH));
// 	if (findAdmin) {
// 		const getWorker = await getWorkers("", "", "");
// 		if (getWorker?.message === UNAUTHORIZED) {
// 			toast.error("Session Expired! Signin again...");
// 			await handleSignout(set);
// 		} else {
// 			set({ adminAuth: true });
// 			set({ adminAuthData: findAdmin });
// 		}
// 	}
// };

// const handleGetAllUsers = async (set, get) => {
// 	const users = await getAllUsers();
// 	// console.log(users);
// 	set({ users: users });
// 	return users;
// };

const authStore = (set, get) => ({
	auth: false,
	adminAuth: false,
	authData: null,
	adminAuthData: null,
	workers: [],
	getAuth: async (params) => await handleGetAuth(set, get, params),
	// getAdminAuth: async (params) => await handleGetAdminAuth(set, get, params),
	// getUserProfile: async (params) =>
	// 	await handleGetUserProfile(set, get, params),
	// getAllUsers: async (params) => await handleGetAllUsers(set, get, params),
	getAgentSignin: async (params) => await handleAgentSignin(set, get, params),
	getAdminSignin: async (params) => await handleAdminSignin(set, get, params),
	// getAdminSignin: async (params) => await handleAdminSignin(set, get, params),
	// getSignup: async (params) => await handleSignup(set, get, params),
	getSignout: async (params) => await handleSignout(set, get, params),
});

const appStore = (set, get) => ({
	reports: reports,
	results: results,
	adminAuth: false,
	authData: null,
	adminAuthData: null,
	workers: [],
	getAuth: async (params) => await handleGetAuth(set, get, params),
	// getAdminAuth: async (params) => await handleGetAdminAuth(set, get, params),
	// getUserProfile: async (params) =>
	// 	await handleGetUserProfile(set, get, params),
	// getAllUsers: async (params) => await handleGetAllUsers(set, get, params),
	getAgentSignin: async (params) => await handleAgentSignin(set, get, params),
	// getAdminSignin: async (params) => await handleAdminSignin(set, get, params),
	// getSignup: async (params) => await handleSignup(set, get, params),
	getSignout: async (params) => await handleSignout(set, get, params),
});

export const useAuth = create(authStore);
export const useApp = create(appStore);
