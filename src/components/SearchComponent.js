import React from "react";
import { SearchIcon } from "../icons";

const SearchComponent = ({ action }) => {
	return (
		<div className="flex grow items-center w-full max-w-full bg-white my-2 p-2 rounded-sm focus-within:text-purple-500">
			{/* <div className="absolute inset-y-0 flex items-center pl-2"> */}
			{/* </div> */}
			<SearchIcon className="w-4 h-4 m-1" aria-hidden="true" />
			<input
				className="pl-4 w-full text-gray-700"
				placeholder="Search"
				aria-label="Search"
				onChange={(e) => action(e.target.value)}
			/>
		</div>
	);
};

export default SearchComponent;
