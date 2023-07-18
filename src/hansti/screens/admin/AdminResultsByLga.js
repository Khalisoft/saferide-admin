import React, { useState, useEffect } from "react";
import PageTitle from "../../../components/Typography/PageTitle";
import SectionTitle from "../../../components/Typography/SectionTitle";
import { EditIcon, PeopleIcon } from "../../../icons";
import InfoCard from "./../../../components/Cards/InfoCard";
import RoundIcon from "./../../../components/RoundIcon";
import {
	Table,
	TableHeader,
	TableCell,
	TableBody,
	TableRow,
	TableFooter,
	TableContainer,
	Badge,
	Avatar,
	Label,
	Button,
	Pagination,
	Card,
	CardBody,
} from "@windmill/react-ui";
import SearchComponent from "../../../components/SearchComponent";
import ModalComponent from "../../../components/ModalComponent";
import NewReport from "./components/NewReport";
import ReportItem from "./components/ReportItem";
import Moment from "react-moment";
import { useApp } from "../../../data/store";
// import "moment-timezone";
import { useHistory } from "react-router-dom";
import { useResults } from "../../../data/api";
import { ROLE } from "../../../data/constants";
import DataTable from "react-data-table-component";
import { resultByLgColumns, resultColumns } from "./components/columns";
import { lgas, parties } from "./../../../utils/data";
import Select from "react-select";
import ResultItem from "./ResultItem";
import AnalyticsBar from "../../../components/Sidebar/AnalyticsBar";
import { getTotals } from "./chartData";
import AdminAnalyticsBar from "./components/AnalyticsAdmin";
const AdminResultsByLga = () => {
	// setup pages control for every table
	const [pageTable1, setPageTable1] = useState(1);
	const [dataTable1, setDataTable1] = useState([]);
	const [sendReport, setSendReport] = useState(false);
	const [selectedReport, setSelectedReport] = useState(null);

	const history = useHistory();
	const [showDetails, setShowDetails] = useState(false);
	const [filteredData, setFilteredData] = useState();
	// const { reports } = useApp((state) => state);
	// const response = [{}];
	const [selectedLGA, setSelectedLGA] = useState(null);
	const [selectedWard, setSelectedWard] = useState(null);
	const [selectedPu, setSelectedPu] = useState(null);
	const [showAnals, setShowAnals] = useState(null);

	const role = JSON.parse(localStorage.getItem(ROLE));

	const { data: results, isLoading } = useResults(role);

	// pagination setup
	const resultsPerPage = 5;
	const totalResults = results ? results?.data?.length : 0;

	// pagination change control
	function onPageChangeTable(p) {
		setPageTable1(p);
	}

	// on page change, load new sliced data
	// here you would make another server request for new data
	useEffect(() => {
		setDataTable1(
			results?.data?.slice(
				(pageTable1 - 1) * resultsPerPage,
				pageTable1 * resultsPerPage
			)
		);
	}, [pageTable1]);

	const loopall = (all) => {
		let APC = [];
		let PDP = [];
		let NNPP = [];
		let PRP = [];
		let Others = [];
		let newC = [];
		for (let index = 0; index < all.length; index++) {
			const element = all[index];
			const parties = element.parties;
			for (let index = 0; index < parties.length; index++) {
				const party = parties[index];
				newC = [
					...newC,
					{
						...party,
						lga: element.lga,
						ward: element.ward,
						pu: element.pu,
					},
				];
			}
			console.log(newC);
		}

		for (let index = 0; index < newC.length; index++) {
			const element = newC[index];
			if (element.name === "APC") {
				APC = [...APC, element];
			}
			if (element.name === "PDP") {
				PDP = [...PDP, element];
			}
			if (element.name === "NNPP") {
				NNPP = [...NNPP, element];
			}
			if (element.name === "APC") {
				PRP = [...PRP, element];
			}
			if (element.name === "Others") {
				Others = [...Others, element];
			}
		}
		setShowAnals([
			{ name: "APC", total: APC.length },
			{ name: "PDP", total: PDP.length },
			{ name: "NNPP", total: NNPP.length },
			{ name: "PRP", total: PRP.length },
			{ name: "Others", total: Others.length },
		]);
	};
	const calcall = (data) => {
		// console.log(data);
		//get all results
		let alll = [];
		let house = [];
		let guber = [];
		let newRaw = [];
		for (let index = 0; index < data?.length; index++) {
			const element = data[index];
			const parties = element.parties;
			for (let index = 0; index < parties.length; index++) {
				const party = parties[index];
				newRaw = [
					...newRaw,
					{
						...party,
						lga: element.lga,
						ward: element.ward,
						pu: element.pu,
					},
				];
			}
			alll = [...alll, ...element?.parties];
		}
		console.log(newRaw);
		// sort by lg
		let newSortLG = [];
		for (let index = 0; index < lgas.length; index++) {
			const element = lgas[index];
			let lgrec = [];
			let sum = 0;
			// group by party
			let partyRec = [];
			for (let index = 0; index < parties.length; index++) {
				const party = parties[index];
				for (let index = 0; index < newRaw.length; index++) {
					const raw = newRaw[index];
					if (raw.name === party.name) {
						partyRec = [...partyRec, raw];
					}
					if (raw.lga === element.name) {
						lgrec = [...lgrec, raw];
						sum += +raw.votes;
					}
				}
			}
			console.log(partyRec);
			// for (let index = 0; index < newRaw.length; index++) {
			// 	const raw = newRaw[index];

			// 	if (raw.lga === element.name) {
			// 		lgrec = [...lgrec, raw];
			// 		sum += +raw.votes;
			// 	}
			// }
			newSortLG = [
				...newSortLG,
				{
					lga: element.name,
					total: sum,
					results: lgrec,
				},
			];
			console.log(newSortLG);
		}
		// console.log(alll);
		// get by type
		for (let index = 0; index < alll.length; index++) {
			const element = alll[index];
			// console.log(element);
			// if (element?.type === "Gubernatorial") {
			// 	guber = [...guber, element];
			// }
			// if (element?.type === "House of Assembly") {
			// 	house = [...house, element];
			// }
		}
		// console.log(house);
		// console.log(guber);
	};

	const filterByLGA = (search) => {
		setSelectedLGA(search);
		const filter = results?.data?.filter((i) => i.lga === search.name);
		setFilteredData(filter);
		calcall(results?.data?.filter((i) => i.lga === search.name));
		loopall(results?.data?.filter((i) => i.lga === search.name));
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

	const showReport = (item) => {
		setSelectedReport(item);
		setShowDetails(true);
	};

	// for (let index = 0; index < lgas.length; index++) {
	// 	// console.log(lgas.length);
	// 	const lga = lgas[index];
	// 	let currentLG = [];
	// 	for (let index = 0; index < results?.data.length; index++) {
	// 		const element = results?.data[index];
	// 		if (element.lga === lga.name) {
	// 			currentLG = [...currentLG, element];
	// 		}
	// 	}
	// 	console.log("current >> ", { lga: lga.name, results: currentLG });
	// }
	return (
		<>
			{/* <PageTitle>Agent / Supervisor</PageTitle> */}
			<Label className="flex justify-between items-center">
				<PageTitle>Voting Results</PageTitle>
				{/* <button onClick={() => setShowDetails(true)}>Open</button> */}
				<div onClick={() => history.push("/app/agent/results/add")}>
					<RoundIcon
						icon={EditIcon}
						iconColorClass="text-orange-500 hover:text-white hover:cursor-pointer dark:text-orange-100"
						bgColorClass="bg-orange-100 hover:cursor-pointer dark:bg-orange-500"
						className="hover:bg-gray-500 cursor-pointer duration-500 "
					/>
				</div>
			</Label>
			{/* <SearchComponent /> */}
			<AdminAnalyticsBar data={showAnals} />

			<div className=" md:grid flex flex-wrap gap-2 justify-evenly md:gap-4 grid-cols-2 md:grid-cols-4">
				{/* <Label className="my-2">
					<Select
						options={[
							{ name: "Gubernatorial", id: "Gubernatorial" },
							{ name: "House of Assembly", id: "HOA" },
						]}
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => option.id}
						onChange={(e) => filterByType(e)}
						placeholder="Type"
						hideSelectedOptions
						required
					/>
				</Label> */}
				<Label className="my-2">
					<Select
						options={[{ name: "All", id: "all" }, ...lgas]}
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => option.id}
						onChange={(e) => filterByLGA(e)}
						// value={selectedLga}
						placeholder="LGA"
						hideSelectedOptions
						required

						// defaultValue={[{ name: "All", id: "all" }]}
					/>
				</Label>

				<Label className="my-2">
					<Select
						options={selectedLGA?.wards}
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => option.id}
						onChange={(e) => filterByWard(e)}
						// value={selectedLga}
						placeholder="Ward"
						// hideSelectedOptions
						required
					/>
				</Label>

				{/* <Label className="my-2">
					<Select
						options={selectedWard?.pus}
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => option.id}
						onChange={(e) => filterByPu(e)}
						// value={selectedLga}
						placeholder="PU"
						hideSelectedOptions
						required
					/>
				</Label> */}
			</div>
			{isLoading && <PageTitle>Fetching Data</PageTitle>}

			<DataTable
				data={filteredData ? filteredData : results?.data}
				columns={resultByLgColumns}
				pagination
				progressPending={isLoading}
				responsive
				striped
				highlightOnHover
				onRowClicked={(row) => showReport(row)}
				style={{ cursor: "pointer" }}
			/>
			{/* <DataTable
				data={filteredData ? filteredData : results?.data}
				columns={resultByLgColumns}
				pagination
				progressPending={isLoading}
				responsive
				striped
				highlightOnHover
				onRowClicked={(row) => showReport(row)}
				style={{ cursor: "pointer" }}
			/> */}

			<ModalComponent
				title={"Result details"}
				isModalOpen={showDetails}
				setIsModalOpen={setShowDetails}
			>
				<ResultItem item={selectedReport} />
			</ModalComponent>
			<ModalComponent
				title={"New Report"}
				isModalOpen={sendReport}
				setIsModalOpen={setSendReport}
				actions={true}
				actionBtn={{ label: "Send Report", action: () => alert() }}
			>
				<NewReport />
			</ModalComponent>
		</>
	);
};

export default AdminResultsByLga;
