import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PageTitle from "../../../components/Typography/PageTitle";
import SectionTitle from "../../../components/Typography/SectionTitle";
import {
	useAgents,
	useAllResults,
	useReports,
	useResults,
} from "../../../data/api";
import { useApp } from "../../../data/store";
import { PeopleIcon } from "../../../icons";
import InfoCard from "./../../../components/Cards/InfoCard";
import RoundIcon from "./../../../components/RoundIcon";
//
import Select from "react-select";

import { Label, Card, CardBody } from "@windmill/react-ui";
import ChartCard from "../../../components/Chart/ChartCard";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import ChartLegend from "../../../components/Chart/ChartLegend";
import { lgas, parties } from "./../../../utils/data";
import {
	doughnutOptions,
	lineOptions,
	barOptions,
	doughnutLegends,
	lineLegends,
	barLegends,
} from "../../../utils/demo/chartsData";
import { ROLE } from "../../../data/constants";
import { getTotals } from "./chartData";

const AdminDashboard = () => {
	const history = useHistory();
	// const { results } = useApp((state) => state);
	// const { reports, results } = useApp((state) => state);
	const role = JSON.parse(localStorage.getItem(ROLE));
	const { data: reports } = useReports(role);
	const { data: results, isLoading } = useAllResults(role);
	const { data: agentsData } = useAgents();

	const findPUanals = (agents) => {
		let totalPus = 0;
		let submittedPus = 0;
		for (let index = 0; index < agents?.length; index++) {
			const element = agents[index];
			totalPus += element?.assigned_pus ? +element?.assigned_pus?.length : 0;
			submittedPus += element?.submitted_pus
				? +element?.submitted_pus?.length
				: 0;
		}

		// console.log(totalPus);
		// console.log(submittedPus);
		return {
			totalPus: totalPus,
			submittedPus: submittedPus,
		};
	};
	const [filteredData, setFilteredData] = useState();

	const [selectedLGA, setSelectedLGA] = useState(null);
	const [selectedWard, setSelectedWard] = useState(null);
	const [selectedPu, setSelectedPu] = useState(null);

	const filterByLGA = (search) => {
		setSelectedLGA(search);
		const filter = results?.data?.filter((i) => i.lga === search.name);
		setFilteredData(filter);
	};
	const filterByWard = (search) => {
		setSelectedWard(search);
		const filter = results?.data?.filter((i) => i.ward === search.name);
		setFilteredData(filter);
	};
	const filterByPu = (search) => {
		setSelectedPu(search);
		const filter = results?.data?.filter((i) => i.pu === search.name);
		setFilteredData(filter);
	};
	const filterByType = (search) => {
		// setSelectedPu(search);
		const filter = results?.data?.filter((i) => i.type === search.name);
		setFilteredData(filter);
	};
	// Calculations

	const dataset = getTotals(results);

	console.log(
		dataset
		// dataset.allPartyGuberVotes[1]?.total,
		// dataset.allPartyGuberVotes[2]?.total,
		// dataset.allPartyGuberVotes[3]?.total,
		// dataset.allPartyGuberVotes[4]?.total
	);
	const labels = parties.map((p) => p.name);
	// Doughnut options
	const doughnutGuberOptions = {
		data: {
			datasets: [
				{
					data: [
						dataset.allPartyGuberVotes[0]?.total,
						dataset.allPartyGuberVotes[1]?.total,
						dataset.allPartyGuberVotes[2]?.total,
						dataset.allPartyGuberVotes[3]?.total,
						dataset.allPartyGuberVotes[4]?.total,
					],
					/**
					 * These colors come from Tailwind CSS palette
					 * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
					 */
					backgroundColor: [
						"#0694a2",
						"#E02424",
						"#7e3af2",
						"#1c64f2",
						"#E05645",
					],
					label: "Dataset 1",
				},
			],
			labels: [
				dataset.allPartyGuberVotes[0]?.party,
				dataset.allPartyGuberVotes[1]?.party,
				dataset.allPartyGuberVotes[2]?.party,
				dataset.allPartyGuberVotes[3]?.party,
				dataset.allPartyGuberVotes[4]?.party,
			],
			// labels: ["APC", "PDP", "NNPP", "PRP", "Others"],
		},
		options: {
			responsive: true,
			cutoutPercentage: 80,
		},
		legend: {
			display: false,
		},
	};
	const doughnutHouseOptions = {
		data: {
			datasets: [
				{
					data: [
						dataset.allPartyHouseVotes[0]?.total,
						dataset.allPartyHouseVotes[1]?.total,
						dataset.allPartyHouseVotes[2]?.total,
						dataset.allPartyHouseVotes[3]?.total,
						dataset.allPartyHouseVotes[4]?.total,
					],
					/**
					 * These colors come from Tailwind CSS palette
					 * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
					 */
					backgroundColor: [
						"#0694a2",
						"#1c64f2",
						"#7e3af2",
						"#E02424",
						"#E05645",
					],
					label: "Dataset 1",
				},
			],
			labels: [
				dataset.allPartyHouseVotes[0]?.party,
				dataset.allPartyHouseVotes[1]?.party,
				dataset.allPartyHouseVotes[2]?.party,
				dataset.allPartyHouseVotes[3]?.party,
				dataset.allPartyHouseVotes[4]?.party,
			],
			// labels: ["APC", "PDP", "NNPP", "PRP", "Others"],
		},
		options: {
			responsive: true,
			cutoutPercentage: 80,
		},
		legend: {
			display: false,
		},
	};

	// Formulate data
	const getLG = (LG) => {
		const lg = results?.data?.filter((result) => result.lga === LG);

		let allResults = []; //get all parties for this LG
		for (let index = 0; index < lg?.length; index++) {
			const element = lg[index];
			allResults = [...allResults, ...element?.parties];
		}
		let guber = allResults?.filter((res) => res.type === "Gubernatorial"); //get guber votes
		let house = allResults?.filter((res) => res.type === "House of Assembly"); //get house of assembly votes
		console.log(" Guber >>", guber);

		let guberSum = 0;
		let houseSum = 0;

		for (let index = 0; index < guber?.length; index++) {
			const element = guber[index];
			guberSum += +element?.votes ? +element?.votes : 0;
		}
		for (let index = 0; index < house?.length; index++) {
			const element = house[index];
			houseSum += +element?.votes ? +element?.votes : 0;
		}
		// console.log(" Guber >>", guberSum);
		// console.log(" House >>", houseSum);

		const getPartySum = (party) => {
			let partySum = 0;
			for (let index = 0; index < guber?.length; index++) {
				const element = guber[index];
				if (element?.name === party) {
					if (element?.votes) {
						partySum = partySum + +element?.votes;
					}
				}
			}
			return partySum;
		};
		return {
			APC: getPartySum("APC"),
			PDP: getPartySum("PDP"),
			NNPP: getPartySum("NNPC"),
			PRP: getPartySum("PRP"),
			Others: getPartySum("Others"),
		};
	};
	// Formulate data
	const getLGHouse = (LG) => {
		const lg = results?.data?.filter((result) => result.lga === LG);

		let allResults = []; //get all parties for this LG
		for (let index = 0; index < lg?.length; index++) {
			const element = lg[index];
			allResults = [...allResults, ...element?.parties];
		}
		let guber = allResults?.filter((res) => res.type === "Gubernatorial"); //get guber votes
		let house = allResults?.filter((res) => res.type === "House of Assembly"); //get house of assembly votes
		console.log(" Guber >>", guber);

		let guberSum = 0;
		let houseSum = 0;

		for (let index = 0; index < guber?.length; index++) {
			const element = guber[index];
			guberSum += +element?.votes ? +element?.votes : 0;
		}
		for (let index = 0; index < house?.length; index++) {
			const element = house[index];
			houseSum += +element?.votes ? +element?.votes : 0;
		}
		// console.log(" Guber >>", guberSum);
		// console.log(" House >>", houseSum);

		const getPartySum = (party) => {
			let partySum = 0;
			for (let index = 0; index < house?.length; index++) {
				const element = house[index];
				if (element?.name === party) {
					if (element?.votes) {
						partySum = partySum + +element?.votes;
					}
				}
			}
			return partySum;
		};

		// console.log(" House >>", house?.length);
		// console.log(allResults?.length);
		return {
			APC: getPartySum("APC"),
			PDP: getPartySum("PDP"),
			NNPP: getPartySum("NNPC"),
			PRP: getPartySum("PRP"),
			Others: getPartySum("Others"),
		};
	};
	const lgs = [
		{
			lga: "BAURE",
			apc: getLG("BAURE")?.APC,
			pdp: getLG("BAURE")?.PDP,
			nnpp: getLG("BAURE")?.NNPP,
			prp: getLG("BAURE")?.PRP,
			others: getLG("BAURE")?.Others,
		},
		{
			lga: "BINDAWA",
			apc: getLG("BINDAWA")?.APC,
			pdp: getLG("BINDAWA")?.PDP,
			nnpp: getLG("BINDAWA")?.NNPP,
			prp: getLG("BINDAWA")?.PRP,
			others: getLG("BINDAWA")?.Others,
		},
		{
			lga: "DAURA",
			apc: getLG("DAURA")?.APC,
			pdp: getLG("DAURA")?.PDP,
			nnpp: getLG("DAURA")?.NNPP,
			prp: getLG("DAURA")?.PRP,
			others: getLG("DAURA")?.Others,
		},
		{
			lga: "DUTSI",
			apc: getLG("DUTSI")?.APC,
			pdp: getLG("DUTSI")?.PDP,
			nnpp: getLG("DUTSI")?.NNPP,
			prp: getLG("DUTSI")?.PRP,
			others: getLG("DUTSI")?.Others,
		},
		{
			lga: "INGAWA",
			apc: getLG("INGAWA")?.APC,
			pdp: getLG("INGAWA")?.PDP,
			nnpp: getLG("INGAWA")?.NNPP,
			prp: getLG("INGAWA")?.PRP,
			others: getLG("INGAWA")?.Others,
		},
		{
			lga: "KANKIA",
			apc: getLG("KANKIA")?.APC,
			pdp: getLG("KANKIA")?.PDP,
			nnpp: getLG("KANKIA")?.NNPP,
			prp: getLG("KANKIA")?.PRP,
			others: getLG("KANKIA")?.Others,
		},
		{
			lga: "KUSADA",
			apc: getLG("KUSADA")?.APC,
			pdp: getLG("KUSADA")?.PDP,
			nnpp: getLG("KUSADA")?.NNPP,
			prp: getLG("KUSADA")?.PRP,
			others: getLG("KUSADA")?.Others,
		},
		{
			lga: "MAI'ADUA",
			apc: getLG("MAI'ADUA")?.APC,
			pdp: getLG("MAI'ADUA")?.PDP,
			nnpp: getLG("MAI'ADUA")?.NNPP,
			prp: getLG("MAI'ADUA")?.PRP,
			others: getLG("MAI'ADUA")?.Others,
		},
		{
			lga: "MANI",
			apc: getLG("MANI")?.APC,
			pdp: getLG("MANI")?.PDP,
			nnpp: getLG("MANI")?.NNPP,
			prp: getLG("MANI")?.PRP,
			others: getLG("MANI")?.Others,
		},
		{
			lga: "MASHI",
			apc: getLG("MASHI")?.APC,
			pdp: getLG("BAURE")?.PDP,
			nnpp: getLG("BAURE")?.NNPP,
			prp: getLG("BAURE")?.PRP,
			others: getLG("BAURE")?.Others,
		},
		{
			lga: "SANDAMU",
			apc: getLG("SANDAMU")?.APC,
			pdp: getLG("SANDAMU")?.PDP,
			nnpp: getLG("SANDAMU")?.NNPP,
			prp: getLG("SANDAMU")?.PRP,
			others: getLG("SANDAMU")?.Others,
		},
		{
			lga: "ZANGO",
			apc: getLG("ZANGO")?.APC,
			pdp: getLG("ZANGO")?.PDP,
			nnpp: getLG("ZANGO")?.NNPP,
			prp: getLG("ZANGO")?.PRP,
			others: getLG("ZANGO")?.Others,
		},
	];
	const lgsHouse = [
		{
			lga: "BAURE",
			apc: getLGHouse("BAURE")?.APC,
			pdp: getLGHouse("BAURE")?.PDP,
			nnpp: getLGHouse("BAURE")?.NNPP,
			prp: getLGHouse("BAURE")?.PRP,
			others: getLGHouse("BAURE")?.Others,
		},
		{
			lga: "BINDAWA",
			apc: getLGHouse("BINDAWA")?.APC,
			pdp: getLGHouse("BINDAWA")?.PDP,
			nnpp: getLGHouse("BINDAWA")?.NNPP,
			prp: getLGHouse("BINDAWA")?.PRP,
			others: getLGHouse("BINDAWA")?.Others,
		},
		{
			lga: "DAURA",
			apc: getLGHouse("DAURA")?.APC,
			pdp: getLGHouse("DAURA")?.PDP,
			nnpp: getLGHouse("DAURA")?.NNPP,
			prp: getLGHouse("DAURA")?.PRP,
			others: getLGHouse("DAURA")?.Others,
		},
		{
			lga: "DUTSI",
			apc: getLGHouse("DUTSI")?.APC,
			pdp: getLGHouse("DUTSI")?.PDP,
			nnpp: getLGHouse("DUTSI")?.NNPP,
			prp: getLGHouse("DUTSI")?.PRP,
			others: getLGHouse("DUTSI")?.Others,
		},
		{
			lga: "INGAWA",
			apc: getLGHouse("INGAWA")?.APC,
			pdp: getLGHouse("INGAWA")?.PDP,
			nnpp: getLGHouse("INGAWA")?.NNPP,
			prp: getLGHouse("INGAWA")?.PRP,
			others: getLGHouse("INGAWA")?.Others,
		},
		{
			lga: "KANKIA",
			apc: getLGHouse("KANKIA")?.APC,
			pdp: getLGHouse("KANKIA")?.PDP,
			nnpp: getLGHouse("KANKIA")?.NNPP,
			prp: getLGHouse("KANKIA")?.PRP,
			others: getLGHouse("KANKIA")?.Others,
		},
		{
			lga: "KUSADA",
			apc: getLGHouse("KUSADA")?.APC,
			pdp: getLGHouse("KUSADA")?.PDP,
			nnpp: getLGHouse("KUSADA")?.NNPP,
			prp: getLGHouse("KUSADA")?.PRP,
			others: getLGHouse("KUSADA")?.Others,
		},
		{
			lga: "MAI'ADUA",
			apc: getLGHouse("MAI'ADUA")?.APC,
			pdp: getLGHouse("MAI'ADUA")?.PDP,
			nnpp: getLGHouse("MAI'ADUA")?.NNPP,
			prp: getLGHouse("MAI'ADUA")?.PRP,
			others: getLGHouse("MAI'ADUA")?.Others,
		},
		{
			lga: "MANI",
			apc: getLGHouse("MANI")?.APC,
			pdp: getLGHouse("MANI")?.PDP,
			nnpp: getLGHouse("MANI")?.NNPP,
			prp: getLGHouse("MANI")?.PRP,
			others: getLGHouse("MANI")?.Others,
		},
		{
			lga: "MASHI",
			apc: getLGHouse("MASHI")?.APC,
			pdp: getLGHouse("BAURE")?.PDP,
			nnpp: getLGHouse("BAURE")?.NNPP,
			prp: getLGHouse("BAURE")?.PRP,
			others: getLGHouse("BAURE")?.Others,
		},
		{
			lga: "SANDAMU",
			apc: getLGHouse("SANDAMU")?.APC,
			pdp: getLGHouse("SANDAMU")?.PDP,
			nnpp: getLGHouse("SANDAMU")?.NNPP,
			prp: getLGHouse("SANDAMU")?.PRP,
			others: getLGHouse("SANDAMU")?.Others,
		},
		{
			lga: "ZANGO",
			apc: getLGHouse("ZANGO")?.APC,
			pdp: getLGHouse("ZANGO")?.PDP,
			nnpp: getLGHouse("ZANGO")?.NNPP,
			prp: getLGHouse("ZANGO")?.PRP,
			others: getLGHouse("ZANGO")?.Others,
		},
	];

	const barOptions = {
		data: {
			labels: [
				lgs[0]?.lga,
				lgs[1]?.lga,
				lgs[2]?.lga,
				lgs[3]?.lga,
				lgs[4]?.lga,
				lgs[5]?.lga,
				lgs[6]?.lga,
				lgs[7]?.lga,
				lgs[8]?.lga,
				lgs[9]?.lga,
				lgs[10]?.lga,
				lgs[11]?.lga,
			],
			datasets: [
				{
					label: "APC",
					backgroundColor: "#047481",
					// borderColor: window.chartColors.red,
					borderWidth: 1,
					data: [
						lgs[0]?.apc,
						lgs[1]?.apc,
						lgs[2]?.apc,
						lgs[3]?.apc,
						lgs[4]?.apc,
						lgs[5]?.apc,
						lgs[6]?.apc,
						lgs[7]?.apc,
						lgs[8]?.apc,
						lgs[9]?.apc,
						lgs[10]?.apc,
						lgs[11]?.apc,
					],
				},
				{
					label: "PDP",
					backgroundColor: "#E02424",
					// borderColor: window.chartColors.blue,
					borderWidth: 1,
					data: [
						lgs[0]?.pdp,
						lgs[1]?.pdp,
						lgs[2]?.pdp,
						lgs[3]?.pdp,
						lgs[4]?.pdp,
						lgs[5]?.pdp,
						lgs[6]?.pdp,
						lgs[7]?.pdp,
						lgs[8]?.pdp,
						lgs[9]?.pdp,
						lgs[10]?.pdp,
						lgs[11]?.pdp,
					],
				},
				{
					label: "NNPP",
					backgroundColor: "#7E3AF2",
					// borderColor: window.chartColors.blue,
					borderWidth: 1,
					data: [
						lgs[0]?.nnpp,
						lgs[1]?.nnpp,
						lgs[2]?.nnpp,
						lgs[3]?.nnpp,
						lgs[4]?.nnpp,
						lgs[5]?.nnpp,
						lgs[6]?.nnpp,
						lgs[7]?.nnpp,
						lgs[8]?.nnpp,
						lgs[9]?.nnpp,
						lgs[10]?.nnpp,
						lgs[11]?.nnpp,
					],
				},
				{
					label: "PRP",

					backgroundColor: "#3F83F8",

					// borderColor: window.chartColors.blue,
					borderWidth: 1,
					data: [
						lgs[0]?.prp,
						lgs[1]?.prp,
						lgs[2]?.prp,
						lgs[3]?.prp,
						lgs[4]?.prp,
						lgs[5]?.prp,
						lgs[6]?.prp,
						lgs[7]?.prp,
						lgs[8]?.prp,
						lgs[9]?.prp,
						lgs[10]?.prp,
						lgs[11]?.prp,
					],
				},
				{
					label: "Others",
					backgroundColor: "#F8B4B4",
					// borderColor: window.chartColors.blue,
					borderWidth: 1,
					data: [
						lgs[0]?.others,
						lgs[1]?.others,
						lgs[2]?.others,
						lgs[3]?.others,
						lgs[4]?.others,
						lgs[5]?.others,
						lgs[6]?.others,
						lgs[7]?.others,
						lgs[8]?.others,
						lgs[9]?.others,
						lgs[10]?.others,
						lgs[11]?.others,
					],
				},
			],
		},
		options: {
			responsive: true,
		},
		legend: {
			display: false,
		},
	};
	const barHouseOptions = {
		data: {
			labels: [
				lgsHouse[0]?.lga,
				lgsHouse[1]?.lga,
				lgsHouse[2]?.lga,
				lgsHouse[3]?.lga,
				lgsHouse[4]?.lga,
				lgsHouse[5]?.lga,
				lgsHouse[6]?.lga,
				lgsHouse[7]?.lga,
				lgsHouse[8]?.lga,
				lgsHouse[9]?.lga,
				lgsHouse[10]?.lga,
				lgsHouse[11]?.lga,
			],
			datasets: [
				{
					label: "APC",
					backgroundColor: "#047481",
					// borderColor: window.chartColors.red,
					borderWidth: 1,
					data: [
						lgsHouse[0]?.apc,
						lgsHouse[1]?.apc,
						lgsHouse[2]?.apc,
						lgsHouse[3]?.apc,
						lgsHouse[4]?.apc,
						lgsHouse[5]?.apc,
						lgsHouse[6]?.apc,
						lgsHouse[7]?.apc,
						lgsHouse[8]?.apc,
						lgsHouse[9]?.apc,
						lgsHouse[10]?.apc,
						lgsHouse[11]?.apc,
					],
				},
				{
					label: "PDP",

					backgroundColor: "#E02424",
					// borderColor: window.chartColors.blue,
					borderWidth: 1,
					data: [
						lgsHouse[0]?.pdp,
						lgsHouse[1]?.pdp,
						lgsHouse[2]?.pdp,
						lgsHouse[3]?.pdp,
						lgsHouse[4]?.pdp,
						lgsHouse[5]?.pdp,
						lgsHouse[6]?.pdp,
						lgsHouse[7]?.pdp,
						lgsHouse[8]?.pdp,
						lgsHouse[9]?.pdp,
						lgsHouse[10]?.pdp,
						lgsHouse[11]?.pdp,
					],
				},
				{
					label: "NNPP",
					backgroundColor: "#7E3AF2",
					// borderColor: window.chartColors.blue,
					borderWidth: 1,
					data: [
						lgsHouse[0]?.nnpp,
						lgsHouse[1]?.nnpp,
						lgsHouse[2]?.nnpp,
						lgsHouse[3]?.nnpp,
						lgsHouse[4]?.nnpp,
						lgsHouse[5]?.nnpp,
						lgsHouse[6]?.nnpp,
						lgsHouse[7]?.nnpp,
						lgsHouse[8]?.nnpp,
						lgsHouse[9]?.nnpp,
						lgsHouse[10]?.nnpp,
						lgsHouse[11]?.nnpp,
					],
				},
				{
					label: "PRP",
					backgroundColor: "#3F83F8",
					// borderColor: window.chartColors.blue,
					borderWidth: 1,
					data: [
						lgsHouse[0]?.prp,
						lgsHouse[1]?.prp,
						lgsHouse[2]?.prp,
						lgsHouse[3]?.prp,
						lgsHouse[4]?.prp,
						lgsHouse[5]?.prp,
						lgsHouse[6]?.prp,
						lgsHouse[7]?.prp,
						lgsHouse[8]?.prp,
						lgsHouse[9]?.prp,
						lgsHouse[10]?.prp,
						lgsHouse[11]?.prp,
					],
				},
				{
					label: "Others",
					backgroundColor: "#F8B4B4",
					// borderColor: window.chartColors.blue,
					borderWidth: 1,
					data: [
						lgsHouse[0]?.others,
						lgsHouse[1]?.others,
						lgsHouse[2]?.others,
						lgsHouse[3]?.others,
						lgsHouse[4]?.others,
						lgsHouse[5]?.others,
						lgsHouse[6]?.others,
						lgsHouse[7]?.others,
						lgsHouse[8]?.others,
						lgsHouse[9]?.others,
						lgsHouse[10]?.others,
						lgsHouse[11]?.others,
					],
				},
			],
		},
		options: {
			responsive: true,
		},
		legend: {
			display: false,
		},
	};

	return (
		<>
			<PageTitle>Admin Dashboard</PageTitle>
			{/* <SectionTitle>Agent / Supervisor</SectionTitle> */}
			{/* <div className=" md:grid flex flex-wrap gap-2 justify-evenly md:gap-4 grid-cols-3 md:grid-cols-5">
				<Label className="my-2">
					<Select
						options={[
							{ name: "Gubernatorial", id: "Gubernatorial" },
							{ name: "House of Assembly", id: "HOA" },
						]}
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => option.id}
					
						placeholder="Type"
						hideSelectedOptions
						required
					/>
				</Label>
				<Label className="my-2">
					<Select
						options={[{ name: "All", id: "all" }, ...lgas]}
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => option.id}
						onChange={(e) => filterByLGA(e)}
						placeholder="LGA"
						hideSelectedOptions
						required

					/>
				</Label>

				<Label className="my-2">
					<Select
						options={selectedLGA?.wards}
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => option.id}
						onChange={(e) => filterByWard(e)}
						placeholder="Ward"
						
						required
					/>
				</Label>

				<Label className="my-2">
					<Select
						options={selectedWard?.pus}
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => option.id}
						onChange={(e) => filterByPu(e)}
						placeholder="PU"
						hideSelectedOptions
						required
					/>
				</Label>

				<Label className="my-2">
					<Select
						options={parties}
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => option.party_id}
						
						placeholder="Party"
						required
					/>
				</Label>
			</div> */}
			{isLoading && <PageTitle>Loading info...</PageTitle>}
			{results && (
				<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
					<Card className="grid gap-6 mb-8 md:grid-cols-5 xl:grid-cols-5">
						<CardBody>
							<Label>{parties[0]?.name}</Label>
							<Label className="font-bold">
								{dataset.allPartyGuberVotes[0]?.total}
							</Label>
						</CardBody>
						<CardBody>
							<Label>{parties[1]?.name}</Label>
							<Label className="font-bold">
								{dataset.allPartyGuberVotes[1]?.total}
							</Label>
						</CardBody>
						<CardBody>
							<Label>{parties[2]?.name}</Label>
							<Label className="font-bold">
								{dataset.allPartyGuberVotes[2]?.total}
							</Label>
						</CardBody>
						<CardBody>
							<Label>{parties[3]?.name}</Label>
							<Label className="font-bold">
								{dataset.allPartyGuberVotes[3]?.total}
							</Label>
						</CardBody>
						<CardBody>
							<Label>{parties[4]?.name}</Label>
							<Label className="font-bold">
								{dataset.allPartyGuberVotes[4]?.total}
							</Label>
						</CardBody>
					</Card>

					<Card className="grid gap-6 mb-8 md:grid-cols-4 xl:grid-cols-4">
						<CardBody>
							<Label>Total PUs</Label>
							<Label className="font-bold">
								{findPUanals(agentsData)?.totalPus}
							</Label>
						</CardBody>

						<CardBody>
							<Label>Submitted</Label>
							<Label className="font-bold">
								{findPUanals(agentsData)?.submittedPus}
							</Label>
						</CardBody>
						<CardBody>
							<Label>Pending</Label>
							<Label className="font-bold">
								{findPUanals(agentsData)?.totalPus -
									findPUanals(agentsData)?.submittedPus}
							</Label>
						</CardBody>
						<CardBody>
							<Label>Complete</Label>
							<Label className="font-bold">
								{(
									(findPUanals(agentsData)?.submittedPus /
										findPUanals(agentsData)?.totalPus) *
									100
								).toFixed(2)}
								%
							</Label>
						</CardBody>
					</Card>
				</div>
			)}
			{/* <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
				<div
					className="cursor-pointer"
					onClick={() => history.push("/app/agent/reports/list")}
				>
					<InfoCard title="Registered Voters" value={reports?.data?.length}>
						<RoundIcon
							icon={PeopleIcon}
							iconColorClass="text-orange-500 dark:text-orange-100"
							bgColorClass="bg-orange-100 dark:bg-orange-500"
							className="mr-4"
						/>
					</InfoCard>
				</div>
				<div
					className="cursor-pointer"
					onClick={() => history.push("/app/agent/results/list")}
				>
					<InfoCard title="Accredited Voters" value={results?.data?.length}>
						<RoundIcon
							icon={PeopleIcon}
							iconColorClass="text-orange-500 dark:text-orange-100"
							bgColorClass="bg-orange-100 dark:bg-orange-500"
							className="mr-4"
						/>
					</InfoCard>
				</div>
				<div
					className="cursor-pointer"
					onClick={() => history.push("/app/agent/results/list")}
				>
					<InfoCard title="Valid Votes" value={results?.data?.length}>
						<RoundIcon
							icon={PeopleIcon}
							iconColorClass="text-orange-500 dark:text-orange-100"
							bgColorClass="bg-orange-100 dark:bg-orange-500"
							className="mr-4"
						/>
					</InfoCard>
				</div>
				<div
					className="cursor-pointer"
					onClick={() => history.push("/app/agent/results/list")}
				>
					<InfoCard title="Invalid Votes" value={results?.data?.length}>
						<RoundIcon
							icon={PeopleIcon}
							iconColorClass="text-orange-500 dark:text-orange-100"
							bgColorClass="bg-orange-100 dark:bg-orange-500"
							className="mr-4"
						/>
					</InfoCard>
				</div>
			</div> */}
			{/* <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
				<div
					className="cursor-pointer"
					onClick={() => history.push("/app/agent/reports/list")}
				>
					<InfoCard title="APC (Gwagware)" value={reports?.data?.length}>
						<RoundIcon
							icon={PeopleIcon}
							iconColorClass="text-orange-500 dark:text-orange-100"
							bgColorClass="bg-orange-100 dark:bg-orange-500"
							className="mr-4"
						/>
					</InfoCard>
				</div>
				<div
					className="cursor-pointer"
					onClick={() => history.push("/app/agent/results/list")}
				>
					<InfoCard title="PDP (Danmarke)" value={results?.data?.length}>
						<RoundIcon
							icon={PeopleIcon}
							iconColorClass="text-orange-500 dark:text-orange-100"
							bgColorClass="bg-orange-100 dark:bg-orange-500"
							className="mr-4"
						/>
					</InfoCard>
				</div>
				<div
					className="cursor-pointer"
					onClick={() => history.push("/app/agent/results/list")}
				>
					<InfoCard title="NNPP (Nur Khalil)" value={results?.data?.length}>
						<RoundIcon
							icon={PeopleIcon}
							iconColorClass="text-orange-500 dark:text-orange-100"
							bgColorClass="bg-orange-100 dark:bg-orange-500"
							className="mr-4"
						/>
					</InfoCard>
				</div>
				<div
					className="cursor-pointer"
					onClick={() => history.push("/app/agent/results/list")}
				>
					<InfoCard title="PRP (Imran)" value={results?.data?.length}>
						<RoundIcon
							icon={PeopleIcon}
							iconColorClass="text-orange-500 dark:text-orange-100"
							bgColorClass="bg-orange-100 dark:bg-orange-500"
							className="mr-4"
						/>
					</InfoCard>
				</div>
			</div> */}
			{/* <SectionTitle>Gubernatorial</SectionTitle> */}
			{results && (
				<>
					<div className="grid gap-6 mb-8 md:grid-cols-1">
						<ChartCard title="Gubernatorial">
							<Doughnut {...doughnutGuberOptions} />
							<ChartLegend legends={doughnutLegends} />
						</ChartCard>
					</div>

					<div className="grid gap-6 mb-8 md:grid-cols-1">
						<ChartCard title="Gubernatorial Distribution ">
							<Bar {...barOptions} />
							<ChartLegend legends={barLegends} />
						</ChartCard>
						<ChartCard title="House of Assembly Distribution">
							<Bar {...barHouseOptions} />
							<ChartLegend legends={barLegends} />
						</ChartCard>
					</div>
				</>
			)}
		</>
	);
};

export default AdminDashboard;
