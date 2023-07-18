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
import { lgas, priority } from "./../../../utils/data";
import image from "./../../../assets/img/hantsi-logo.png";
import PageTitle from "../../../components/Typography/PageTitle";
import PartyCard from "./components/PartyCard";
import ModalComponent from "../../../components/ModalComponent";
import Axios from "axios";
import { hideLoader, showLoader } from "./../../../utils/loader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendReportsApi } from "../../../data/api";
import { AUTH } from "../../../data/constants";
const AgentAddReport = () => {
	const lga = JSON.parse(localStorage.getItem(AUTH)).data.lga;
	const assigned_lgas = JSON.parse(localStorage.getItem(AUTH)).data
		.assigned_lgas;
	const queryClient = useQueryClient();
	const history = useHistory();
	// mutation
	const sendReportMutation = useMutation({
		mutationFn: (data) => sendReportsApi(data),
		onMutate: () => {
			showLoader("Uploading report...");
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["agent-reports"]);
			hideLoader();
			history.push("/app/agent/reports/list");
		},
	});

	const sendReport = async () => {
		sendReportMutation.mutate({ ...reportData, type: "default" });
	};

	const [selectedWardsList, setSelectedWardsList] = useState([]);
	const [selectedPusList, setSelectedPusList] = useState([]);
	const [selectedLga, setSelectedLga] = useState(null);
	const [selectedWard, setSelectedWard] = useState(null);
	const [selectedPU, setSelectedPU] = useState(null);
	const [showResultSummary, setShowResultSummary] = useState(false);
	const [reportImage, setReportImage] = useState();
	const [reportImageLink, setReportImageLink] = useState("");

	const [reportData, setReportData] = useState({});
	const selectLga = (lga) => {
		setSelectedLga(lga);
		setReportData({ ...reportData, lga: lga.name });
		setSelectedWard(null);
		setSelectedWardsList(lga?.wards);
	};
	const selectWard = (ward) => {
		setSelectedWard(ward);
		setReportData({ ...reportData, ward: ward.name });
		setSelectedPU(null);
		setSelectedPusList(ward?.pus);
	};
	const selectPu = (pu) => {
		setSelectedPU(pu);
		setReportData({ ...reportData, pu: pu.name });
	};
	const parties = [
		{ name: "APC", icon: image },
		{ name: "PDP", icon: image },
		{ name: "LP", icon: image },
	];

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
			setReportData({ ...reportData, pictures: [res.data.secure_url] });
			setReportImageLink(res.data.secure_url);
			hideLoader();
		}
	};

	const uploadImage = async (image) => {
		const imageData = new FormData();
		imageData.append("file", image);
		imageData.append("upload_preset", "hantsi_elec");
		let data = "";
		const res = await Axios.post(
			"https://api.cloudinary.com/v1_1/devkaahl/image/upload",
			imageData
		);

		setReportData({ ...reportData, pictures: [res.data.secure_url] });
		setReportImageLink(res.data.secure_url);
	};

	return (
		<span>
			<PageTitle>Send Situation Report</PageTitle>
			{/* <Label className="flex justify-evenly my-4">
				<Label radio>
					<Input
						type="radio"
						value="critical"
						name="priority"
						required
						onClick={(e) =>
							setReportData({ ...reportData, priority: e.target.value })
						}
					/>
					<span className="ml-2">Critical</span>
				</Label>
				<Label radio>
					<Input
						type="radio"
						value="important"
						name="pimport { sendReportMutation } from './../../../data/api';
riority"
						required
						onClick={(e) =>
							setReportData({ ...reportData, priority: e.target.value })
						}
					/>
					<span className="ml-2">Important</span>
				</Label>
				<Label radio>
					<Input
						type="radio"
						value="mild"
						name="priority"
						required
						onClick={(e) =>
							setReportData({ ...reportData, priority: e.target.value })
						}
					/>
					<span className="ml-2">Mild</span>
				</Label>
			</Label> */}
			<div className="grid grid-cols-2 md:grid-cols-4 col-gap-4">
				<Label className="my-4">
					{/* <span>LGA</span> */}
					<Select
						options={[
							{ name: "Critical", value: "Critical" },
							{ name: "Important", value: "Important" },
							{ name: "Mild", value: "Mild" },
						]}
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => option.value}
						onChange={(priority) =>
							setReportData({ ...reportData, priority: priority?.name })
						}
						// value={reportData?.priority}
						placeholder="Priority"
						required
					/>
				</Label>
				<Label className="my-4">
					{/* <span>LGA</span> */}
					<Select
						options={lgas.filter((l) => assigned_lgas.includes(l.name))}
						// options={lgas.filter((l) => l.name === assigned_lgas)}
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => option.id}
						onChange={selectLga}
						value={selectedLga}
						placeholder={"Select LGA"}
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
			<hr />

			{selectedPU && (
				<>
					<Label className="my-4">
						{/* <span>Title</span> */}
						<Input
							type="text"
							placeholder="Title"
							required
							onChange={(e) =>
								setReportData({ ...reportData, title: e.target.value })
							}
						/>
					</Label>
					<Label className="my-4">
						<Textarea
							placeholder="Description"
							required
							onChange={(e) =>
								setReportData({ ...reportData, description: e.target.value })
							}
						></Textarea>
					</Label>
					<Label className="my-4">
						{/* <span>Suggestion</span> */}

						<Textarea
							placeholder="Suggestion"
							onChange={(e) =>
								setReportData({ ...reportData, suggestion: e.target.value })
							}
						></Textarea>
					</Label>
					<Label className="my-4">
						<span>Images</span>
						<Input type="file" onChange={(e) => handleImage(e)} />
					</Label>
					<hr />
					<Label className="my-4 flex justify-between">
						{/* <Button layout="outline">Save Draft</Button> */}
						<Button onClick={() => sendReport()}>Send Report</Button>
					</Label>

					<ModalComponent
						title={"Confirm Result"}
						isModalOpen={showResultSummary}
						setIsModalOpen={setShowResultSummary}
						actions={true}
						actionBtn={{ label: "Confirm & Send ", action: () => alert() }}
					>
						<p>Confirm Result</p>
					</ModalComponent>
				</>
			)}
		</span>
	);
};

export default AgentAddReport;
