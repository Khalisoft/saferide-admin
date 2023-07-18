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
import { resultColumns } from "./components/columns";
import { lgas, parties } from "./../../../utils/data";
import Select from "react-select";
import ResultItem from "./ResultItem";
import AnalyticsBar from "../../../components/Sidebar/AnalyticsBar";
import { getTotals } from "./chartData";
import AdminAnalyticsBar from "./components/AnalyticsAdmin";
const AdminResults = () => {
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

	const showReport = (item) => {
		setSelectedReport(item);
		setShowDetails(true);
	};
	const dataset = getTotals(filteredData ? filteredData : results);
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
			<div className=" md:grid flex flex-wrap gap-2 justify-evenly md:gap-4 grid-cols-1 md:grid-cols-1">
				<AdminAnalyticsBar
					dataset={getTotals(filteredData ? { data: filteredData } : results)}
				/>
				{/* <AdminAnalyticsBar
					dataset={getTotals(filteredData ? filteredData : results)}
				/> */}
			</div>

			<div className=" md:grid flex flex-wrap gap-2 justify-evenly md:gap-4 grid-cols-2 md:grid-cols-4 items-center">
				{/* <Label className="my-2">
					<Select
						options={[
							{ name: "Gubernatorial", id: "Gubernatorial" },
							{ name: "House of Assembly", id: "HOA" },
						]}
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => option.id}
						onChange={(e) => filterByType(e)}
						// value={selectedLga}
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
						placeholder="LGA"
						hideSelectedOptions
						required
						value={selectedLGA}
						// isClearable={true}
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
						// isClearable={true}
						value={selectedWard}
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
						// isClearable={true}
						value={selectedPu}
					/>
				</Label>
				<div
					className=""
					onClick={() => {
						setFilteredData(null);
						setSelectedLGA(null);
						setSelectedWard(null);
						setSelectedPu(null);
					}}
				>
					<Button className="bg-orange-100 w-full">Reset</Button>
				</div>
			</div>
			{/* {isLoading && <PageTitle>Fetching Data</PageTitle>} */}

			<DataTable
				data={filteredData ? filteredData : results?.data}
				columns={resultColumns}
				pagination
				progressPending={isLoading}
				responsive
				striped
				highlightOnHover
				onRowClicked={(row) => showReport(row)}
				style={{ cursor: "pointer" }}
			/>

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

export default AdminResults;
