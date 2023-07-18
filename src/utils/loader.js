// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import HoldOn from "react-hold-on";

const options = {
	theme: "sk-bounce",
	message: "Please wait...",
	backgroundColor: "blue",
	textColor: "white",
};

export const showLoader = (message) => {
	HoldOn.open({ ...options, message: message });
};

export const hideLoader = () => {
	HoldOn.close();
};
