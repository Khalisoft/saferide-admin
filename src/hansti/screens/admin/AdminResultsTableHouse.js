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
import {
	resultByLgColumns,
	resultByLgColumnsTable,
	resultColumns,
} from "./components/columns";
import { lgas, parties } from "./../../../utils/data";
import Select from "react-select";
import ResultItem from "./ResultItem";
import AnalyticsBar from "../../../components/Sidebar/AnalyticsBar";
import { getTotals } from "./chartData";
import AdminAnalyticsBar from "./components/AnalyticsAdmin";
const AdminResultsTableHouse = () => {
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
			for (let index = 0; index < house?.length; index++) {
				const element = house[index];
				if (element?.name === party) {
					partySum += +element?.votes ? +element?.votes : 0;
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
			apc: getLG("BAURE").APC,
			pdp: getLG("BAURE").PDP,
			nnpp: getLG("BAURE").NNPP,
			prp: getLG("BAURE").PRP,
			others: getLG("BAURE").Others,
		},
		{
			lga: "BINDAWA",
			apc: getLG("BINDAWA").APC,
			pdp: getLG("BINDAWA").PDP,
			nnpp: getLG("BINDAWA").NNPP,
			prp: getLG("BINDAWA").PRP,
			others: getLG("BINDAWA").Others,
		},
		{
			lga: "DAURA",
			apc: getLG("DAURA").APC,
			pdp: getLG("DAURA").PDP,
			nnpp: getLG("DAURA").NNPP,
			prp: getLG("DAURA").PRP,
			others: getLG("DAURA").Others,
		},
		{
			lga: "DUTSI",
			apc: getLG("DUTSI").APC,
			pdp: getLG("DUTSI").PDP,
			nnpp: getLG("DUTSI").NNPP,
			prp: getLG("DUTSI").PRP,
			others: getLG("DUTSI").Others,
		},
		{
			lga: "INGAWA",
			apc: getLG("INGAWA").APC,
			pdp: getLG("INGAWA").PDP,
			nnpp: getLG("INGAWA").NNPP,
			prp: getLG("INGAWA").PRP,
			others: getLG("INGAWA").Others,
		},
		{
			lga: "KANKIA",
			apc: getLG("KANKIA").APC,
			pdp: getLG("KANKIA").PDP,
			nnpp: getLG("KANKIA").NNPP,
			prp: getLG("KANKIA").PRP,
			others: getLG("KANKIA").Others,
		},
		{
			lga: "KUSADA",
			apc: getLG("KUSADA").APC,
			pdp: getLG("KUSADA").PDP,
			nnpp: getLG("KUSADA").NNPP,
			prp: getLG("KUSADA").PRP,
			others: getLG("KUSADA").Others,
		},
		{
			lga: "MAI'ADUA",
			apc: getLG("MAI'ADUA").APC,
			pdp: getLG("MAI'ADUA").PDP,
			nnpp: getLG("MAI'ADUA").NNPP,
			prp: getLG("MAI'ADUA").PRP,
			others: getLG("MAI'ADUA").Others,
		},
		{
			lga: "MANI",
			apc: getLG("MANI").APC,
			pdp: getLG("MANI").PDP,
			nnpp: getLG("MANI").NNPP,
			prp: getLG("MANI").PRP,
			others: getLG("MANI").Others,
		},
		{
			lga: "MASHI",
			apc: getLG("MASHI").APC,
			pdp: getLG("BAURE").PDP,
			nnpp: getLG("BAURE").NNPP,
			prp: getLG("BAURE").PRP,
			others: getLG("BAURE").Others,
		},
		{
			lga: "SANDAMU",
			apc: getLG("SANDAMU").APC,
			pdp: getLG("SANDAMU").PDP,
			nnpp: getLG("SANDAMU").NNPP,
			prp: getLG("SANDAMU").PRP,
			others: getLG("SANDAMU").Others,
		},
		{
			lga: "ZANGO",
			apc: getLG("ZANGO").APC,
			pdp: getLG("ZANGO").PDP,
			nnpp: getLG("ZANGO").NNPP,
			prp: getLG("ZANGO").PRP,
			others: getLG("ZANGO").Others,
		},
	];
	return (
		<>
			<PageTitle>Results Table</PageTitle>

			<DataTable
				// data={filteredData ? filteredData : results?.data}
				data={lgs}
				columns={resultByLgColumnsTable}
				pagination
				// progressPending={isLoading}
				responsive
				striped
				highlightOnHover
				// onRowClicked={(row) => showReport(row)}
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

export default AdminResultsTableHouse;
