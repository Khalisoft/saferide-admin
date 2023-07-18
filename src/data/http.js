import axios from "axios";
import { ADMINAUTH, BASEURL, TOKEN, TOKENS } from "./constants";
// const authdata = JSON.parse(localStorage.getItem(TOKENS));

// const authdata = JSON.parse(localStorage.getItem(TOKENS));
const token = JSON.parse(localStorage.getItem(TOKEN));
export const httpGet = async ({ path }) => {
	const options = {
		method: "get",
		url: `${process.env.REACT_APP_BASEURL}/${path}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const res = await axios(options);
		return res?.data ? res?.data : res;
	} catch (error) {
		return error?.response?.data;
	}
};
export const httpPost = async ({ payload, path }) => {
	const options = {
		method: "post",
		url: `${process.env.REACT_APP_BASEURL}/${path}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: payload,
	};
	try {
		const res = await axios(options);
		return res?.data ? res?.data : res;
	} catch (error) {
		return error?.response?.data;
	}
};
