import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
	Label,
	Input,
	Select as WSelect,
	Textarea,
	Button,
	Avatar,
	Card,
	CardBody,
} from "@windmill/react-ui";
import Moment from "react-moment";
import "moment-timezone";
import Select from "react-select";
import { lgas, parties, priority } from "./../../../utils/data";
import image from "./../../../assets/img/hantsi-logo.png";
import PageTitle from "../../../components/Typography/PageTitle";
import PartyCard from "./components/PartyCard";
import ModalComponent from "../../../components/ModalComponent";
import { hideLoader, showLoader } from "./../../../utils/loader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendResultsApi, useSubmittedPus } from "../../../data/api";
import Axios from "axios";
import { AUTH } from "../../../data/constants";
import { toast } from "react-hot-toast";

const AgentAddResult = () => {
	const assigned_lgas = JSON.parse(localStorage.getItem(AUTH)).data
		.assigned_lgas;
	const queryClient = useQueryClient();
	const history = useHistory();
	// mutation
	const { data } = useSubmittedPus();
	const sendResulttMutation = useMutation({
		mutationFn: (data) => sendResultsApi(data),
		onMutate: () => {
			showLoader("Sending result...");
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["agent-results", "submitted-pus"]);
			hideLoader();
			history.push("/app/agent/results/list");
		},
	});

	const sendResult = async () => {
		if (resultData.parties.length < 1) {
			return toast.error(`${"Save votes na, you won't die..."}`);
		}
		console.log(resultData);
		// let submitted_parties = [];
		// resultData.parties.forEach(e =>)
		// resultData.parties.forEach((element) => {
		// 	submitted_parties = [...submitted_parties, element.name];
		// });
		sendResulttMutation.mutate({
			...resultData,
			submitted_pus: [...data?.submitted_pus, resultData.pu_id],
		});
	};

	const [selectedWardsList, setSelectedWardsList] = useState([]);
	const [selectedPusList, setSelectedPusList] = useState([]);
	const [selectedLga, setSelectedLga] = useState(null);
	const [selectedWard, setSelectedWard] = useState(null);
	const [selectedPU, setSelectedPU] = useState(null);
	const [showResultSummary, setShowResultSummary] = useState(false);

	const [resultData, setResultData] = useState({ parties: [] });
	const [resultData2, setResultData2] = useState({ parties: [] });

	const handleImage = async (e) => {
		showLoader("Uploading Image...");
		if (e.target.files[0]) {
			const imageData = new FormData();
			imageData.append("file", e.target.files[0]);
			imageData.append("upload_preset", "hantsi_elec");
			const res = await Axios.post(
				"https://api.cloudinary.com/v1_1/devkaahl/image/upload",
				imageData
			);
			setResultData({ ...resultData, pictures: [res.data.secure_url] });
			hideLoader();
		}
	};

	// const selectLga = (lga) => {
	// 	setSelectedLga(lga);
	// 	setSelectedWard(null);
	// 	setSelectedWardsList(lga?.wards);
	// };
	// const selectWard = (ward) => {
	// 	setSelectedWard(ward);
	// 	setSelectedPU(null);
	// 	setSelectedPusList(ward?.pus);
	// };
	// const selectPu = (pu) => {
	// 	setSelectedPU(pu);
	// };
	const selectLga = (lga) => {
		setSelectedLga(lga);
		setResultData({ ...resultData, lga: lga.name });
		setSelectedWard(null);
		setSelectedWardsList(lga?.wards);
	};
	const selectWard = (ward) => {
		setSelectedWard(ward);
		setResultData({ ...resultData, ward: ward.name });
		setSelectedPU(null);
		setSelectedPusList(ward?.pus);
	};
	const selectPu = (pu) => {
		setSelectedPU(pu);
		setResultData({ ...resultData, pu: pu.name, pu_id: pu.id });
	};

	return (
		<span>
			<PageTitle>Send Voting Result</PageTitle>
			<div className="grid grid-cols-2 md:grid-cols-3 col-gap-3">
				{/* <Label className="my-4">
					<Select
						options={[
							{ name: "Gubernatorial", value: "Gubernatorial" },
							{ name: "House of Assembly", value: "House of Assembly" },
						]}
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => option.value}
						onChange={(type) =>
							setResultData({ ...resultData, type: type?.name })
						}
						placeholder="Type"
						required
					/>
				</Label> */}
				<Label className="my-4">
					{/* <span>LGA</span> */}
					<Select
						options={lgas.filter((l) => assigned_lgas.includes(l.name))}
						// options={lgas}
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
							options={selectedPusList?.filter(
								(pu) => !data?.submitted_pus?.includes(pu.id)
							)}
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
			<hr />

			{selectedPU && (
				<>
					<div className="md:flex md:justify-between space-x-2 ">
						<Label className="my-4">
							<span>Registered</span>
							<Input
								type="number"
								placeholder="Registered voters"
								required
								onChange={(e) =>
									setResultData({
										...resultData,
										registered_voters: e.target.value,
									})
								}
								// onChange={(e) => setPhoneNumber(e.target.value)}
							/>
						</Label>
						{/* <Label className="my-4">
							<span>Accredited</span>
							<Input
								type="number"
								placeholder="Accredited voters"
								required
								onChange={(e) =>
									setResultData({
										...resultData,
										accredited_voters: e.target.value,
									})
								} 
							/>
						</Label> */}
						{/* <Label className="my-4">
							<span>Valid</span>
							<Input
								type="number"
								placeholder="Valid votes"
								required
								onChange={(e) =>
									setResultData({
										...resultData,
										valid_votes: e.target.value,
									})
								}
							/>
						</Label> */}
						{/* <Label className="my-4">
							<span>Invalid</span>
							<Input
								type="number"
								placeholder="Invalid"
								required
								onChange={(e) =>
									setResultData({
										...resultData,
										invalid_votes: e.target.value,
									})
								}
							/>
						</Label> */}
						{/* <Label className="my-4">
							<span>Total</span>
							<Input
								type="text"
								placeholder="Invalid"
								required
								readOnly
								value={resultData.total_votes ? resultData.total_votes : 0}
								disabled
							/>
						</Label> */}
					</div>

					<Label>Gubernatorial</Label>
					<Label className=" my-4 items-center grid grid-cols-2 md:grid-cols-5">
						{parties?.map((party) => (
							<PartyCard
								party={party}
								setData={setResultData}
								data={resultData}
								type={"Gubernatorial"}
							/>
						))}
					</Label>
					<Label>House of Assembly</Label>
					<Label className=" my-4 items-center grid grid-cols-2 md:grid-cols-5">
						{parties?.map((party) => (
							<PartyCard
								party={party}
								setData={setResultData}
								data={resultData}
								type={"House of Assembly"}
							/>
						))}
					</Label>
					<Label className="my-4">
						<span>Images</span>
						<Input type="file" onChange={(e) => handleImage(e)} />
					</Label>
					<hr />
					<Label className="my-4 flex justify-between">
						{/* <Button layout="outline" onClick={() => setShowResultSummary(true)}>
							Save Draft
						</Button> */}
						<Button onClick={() => setShowResultSummary(true)}>
							Send Result
						</Button>
					</Label>

					<ModalComponent
						title={"Confirm Result"}
						isModalOpen={showResultSummary}
						setIsModalOpen={setShowResultSummary}
						actions={true}
						actionBtn={{ label: "Confirm & Send ", action: () => sendResult() }}
					>
						<p>Confirm Result</p>
					</ModalComponent>
				</>
			)}
		</span>
	);
};

export default AgentAddResult;
