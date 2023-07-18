import React from "react";
import { Label } from "@windmill/react-ui";
import { MailIcon } from "../../../../icons";

const InputWithIcon = ({ props }) => {
	return (
		<Label>
			<div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
				<input
					className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
					placeholder="Jane Doe"
					{...props}
				/>
				<div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
					<MailIcon className="w-5 h-5" aria-hidden="true" />
				</div>
			</div>
		</Label>
	);
};

export default InputWithIcon;
