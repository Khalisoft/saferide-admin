import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Label, Input, Select as WSelect, Textarea } from "@windmill/react-ui";
import Moment from "react-moment";
import "moment-timezone";
import Select from "react-select";
import { lgas, priority } from "./../../../../utils/data";

const NewReport = () => {
	const [selectedWardsList, setSelectedWardsList] = useState([]);
	const [selectedPusList, setSelectedPusList] = useState([]);
	const [selectedLga, setSelectedLga] = useState(null);
	const [selectedWard, setSelectedWard] = useState(null);
	const [selectedPU, setSelectedPU] = useState(null);

	const selectLga = (lga) => {
		setSelectedLga(lga);
		setSelectedWard(null);
		setSelectedWardsList(lga?.wards);
	};
	const selectWard = (ward) => {
		setSelectedWard(ward);
		setSelectedPU(null);
		setSelectedPusList(ward?.pus);
	};
	const selectPu = (pu) => {
		setSelectedPU(pu);
	};
	return (
		<>
			<Label className="flex justify-evenly my-4">
				<Label radio>
					<Input type="radio" value="personal" name="accountType" required />
					<span className="ml-2">Critical</span>
				</Label>
				<Label radio>
					<Input type="radio" value="business" name="accountType" required />
					<span className="ml-2">Important</span>
				</Label>
				<Label radio>
					<Input type="radio" value="business" name="accountType" required />
					<span className="ml-2">Mild</span>
				</Label>
			</Label>
			<div className="md:flex md:justify-around ">
				<Label className="my-4">
					{/* <span>LGA</span> */}
					<Select
						options={lgas}
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => option.id}
						onChange={selectLga}
						value={selectedLga}
						placeholder="Select LGA"
						required
					/>
				</Label>
				{selectedLga && (
					<Label className="my-4">
						{/* <span>Ward</span> */}
						<Select
							options={selectedWardsList}
							getOptionLabel={(option) => option.name}
							getOptionValue={(option) => option.id}
							onChange={selectWard}
							value={selectedWard}
							placeholder="Select Ward"
							required
						/>
					</Label>
				)}
				{selectedWard && (
					<Label className="my-4">
						{/* <span>Polling Unit</span> */}
						<Select
							options={selectedPusList}
							getOptionLabel={(option) => option.name}
							getOptionValue={(option) => option.id}
							onChange={selectPu}
							value={selectedPU}
							placeholder="Select Polling Unit"
							required
						/>
					</Label>
				)}
			</div>

			{selectedPU && (
				<>
					<Label className="my-4">
						{/* <span>Title</span> */}
						<Input
							type="text"
							placeholder="Title"
							required
							// onChange={(e) => setPhoneNumber(e.target.value)}
						/>
					</Label>
					<Label className="my-4">
						<Textarea placeholder="Description" required></Textarea>
					</Label>
					<Label className="my-4">
						{/* <span>Suggestion</span> */}

						<Textarea placeholder="Suggestion"></Textarea>
					</Label>
					<Label className="my-4">
						<span>Images</span>
						<Input type="file" />
					</Label>
				</>
			)}
		</>
	);
};

export default NewReport;
