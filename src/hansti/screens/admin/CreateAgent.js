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
import { createAgentApi } from "./../../../data/api";
import { AUTH } from "../../../data/constants";
const CreateAgent = () => {
	const queryClient = useQueryClient();
	const history = useHistory();
	// mutation
	const createAgentMutation = useMutation({
		mutationFn: (data) => createAgentApi(data),
		onMutate: () => {
			showLoader("Creating New Agent...");
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["agents"]);
			hideLoader();
			history.push("/app/admin/agents");
		},
	});

	const createAgent = async (e) => {
		createAgentMutation.mutate({ ...agentData });
		// e.preventDefault();
		// console.log(agentData);
	};

	const [selectedWardsList, setSelectedWardsList] = useState([]);
	const [selectedPusList, setSelectedPusList] = useState([]);
	const [selectedLga, setSelectedLga] = useState(null);
	const [selectedWard, setSelectedWard] = useState(null);
	const [assignedWards, setAssignedWards] = useState(null);
	const [assignedLgas, setAssignedLgas] = useState(null);
	const [selectedPU, setSelectedPU] = useState(null);
	const [showResultSummary, setShowResultSummary] = useState(false);
	const [reportImage, setReportImage] = useState();
	const [reportImageLink, setReportImageLink] = useState("");

	const [agentData, setAgentData] = useState({});
	const selectLga = (lga) => {
		console.log(lga);
		setSelectedLga(lga);
		let wards = [];
		let pus = [];
		let lgas = [];
		let pusIds = [];
		if (lga?.length > 0) {
			for (let index = 0; index < lga.length; index++) {
				const element = lga[index];
				lgas = [...lgas, element.name];
				element.wards.forEach((ward) => {
					wards = [...wards, ward.id];
					pus = [...pus, ...ward.pus];
				});
			}
		}
		pus.forEach((pu) => {
			pusIds = [...pusIds, pu.id];
		});

		setAgentData({
			...agentData,
			lga: lga.name,
			assigned_lga: lga.name,
			assigned_lgas: lgas,
			assigned_wards: wards,
			assigned_pus: pusIds,
		});
		console.log(agentData);
		setAssignedLgas(lga);
		setAssignedWards(wards);
		setSelectedWard(null);
		setSelectedWardsList(lga?.wards);
	};
	const selectWard = (ward) => {
		setSelectedWard(ward);
		setAgentData({ ...agentData, ward: ward.name });
		setSelectedPU(null);
		setSelectedPusList(ward?.pus);
	};
	const selectPu = (pu) => {
		setSelectedPU(pu);
		setAgentData({ ...agentData, pu: pu.name });
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
			setAgentData({ ...agentData, pictures: [res.data.secure_url] });
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

		setAgentData({ ...agentData, pictures: [res.data.secure_url] });
		setReportImageLink(res.data.secure_url);
	};

	return (
		<form>
			<PageTitle>Create New LGA Agent</PageTitle>
			<Label className="grid gap-6 md:grid-cols-2 grid-cols-1">
				{/* First part */}
				<Label className="grid grid-cols-1">
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
							isMulti
							maxLength={3}
						/>
					</Label>

					<Label className="my-4">
						{/* <span>LGA</span> */}
						<Input
							type="text"
							placeholder="Phone Number"
							required
							maxLength={11}
							onChange={(e) =>
								setAgentData({ ...agentData, phone_number: e.target.value })
							}
						/>
					</Label>
					<Label className="my-4">
						{/* <span>LGA</span> */}
						<Input
							type="password"
							placeholder="Password"
							required
							minLength={6}
							onChange={(e) =>
								setAgentData({ ...agentData, password: e.target.value })
							}
						/>
					</Label>
					<Label className="my-4">
						{/* <span>LGA</span> */}
						<Textarea
							placeholder="Address"
							onChange={(e) =>
								setAgentData({ ...agentData, address: e.target.value })
							}
						></Textarea>
					</Label>
					{/* <Card>
						<CardBody></CardBody>
					</Card> */}
				</Label>
				{/* Second part */}
				<hr className="md:hidden" />
				<Label className="grid grid-cols-1">
					<Label className="my-4">
						{/* <span>LGA</span> */}
						<Input
							type="text"
							placeholder="Voters ID"
							required
							onChange={(e) =>
								setAgentData({ ...agentData, vin: e.target.value })
							}
						/>
					</Label>
					<Label className="my-4">
						{/* <span>LGA</span> */}
						<Input
							type="text"
							placeholder="First name"
							required
							onChange={(e) =>
								setAgentData({ ...agentData, first_name: e.target.value })
							}
						/>
					</Label>

					<Label className="my-4">
						<Input
							type="text"
							placeholder="Last name"
							required
							onChange={(e) =>
								setAgentData({ ...agentData, last_name: e.target.value })
							}
						/>
					</Label>
					<Label className="my-4">
						<Card>
							<CardBody className="grid grid-cols-3">
								<Label>
									<Label className="">Assigned LGAs</Label>
									<Label className="font-bold">
										{assignedLgas ? agentData?.assigned_lgas?.length : 0}
									</Label>
								</Label>
								<Label>
									<Label className="">Assigned Wards</Label>
									<Label className="font-bold">
										{assignedWards ? agentData?.assigned_wards?.length : 0}
									</Label>
								</Label>
								<Label>
									<Label>Assigned Polling Units</Label>
									<Label className="font-bold">
										{agentData?.assigned_pus
											? agentData?.assigned_pus?.length
											: 0}
									</Label>
								</Label>
							</CardBody>
						</Card>
					</Label>
					{/* <hr className="" /> */}
					{/* <Label className="my-4">
						<span>PRo</span>
						<Input type="file" onChange={(e) => handleImage(e)} />
					</Label> */}
				</Label>
			</Label>
			<hr />
			<Label className="my-4 flex justify-between">
				{/* <Button layout="outline">Save Draft</Button> */}
				<Button onClick={() => setShowResultSummary(true)}>Continue</Button>
			</Label>

			<ModalComponent
				title={"Confirm Result"}
				isModalOpen={showResultSummary}
				setIsModalOpen={setShowResultSummary}
				actions={true}
				actionBtn={{ label: "Confirm & Send ", action: (e) => createAgent(e) }}
			>
				<p>Create Agent</p>
			</ModalComponent>
		</form>
	);
};

export default CreateAgent;
