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
import { useReports } from "../../../data/api";
import Select from "react-select";
import { lgas, parties } from "./../../../utils/data";
import DataTable from "react-data-table-component";
import { reportColumns } from "./components/columns";
import { ROLE } from "../../../data/constants";

const AdminReport = () => {
	// Get report data
	const role = JSON.parse(localStorage.getItem(ROLE));
	const { data: reports, isLoading, isError } = useReports(role);

	// console.log(reports?.data.length);
	// setup pages control for every table
	const [pageTable1, setPageTable1] = useState(1);
	const [sendReport, setSendReport] = useState(false);
	const [selectedReport, setSelectedReport] = useState(null);

	const history = useHistory();
	const [showDetails, setShowDetails] = useState(false);
	// const { reports } = useApp((state) => state);
	// const response = [{}];

	// pagination setup
	const resultsPerPage = 5;
	const totalResults = reports ? reports?.data?.length : 0;

	const [dataTable1, setDataTable1] = useState([]);
	// pagination change control
	function onPageChangeTable(p) {
		setPageTable1(p);
	}

	// on page change, load new sliced data
	// here you would make another server request for new data
	// console.log(
	// 	reports?.data?.slice(
	// 		(pageTable1 - 1) * resultsPerPage,
	// 		pageTable1 * resultsPerPage
	// 	)
	// );

	const showReport = (item) => {
		setSelectedReport(item);
		setShowDetails(true);
	};

	const update = () => {
		setDataTable1(
			reports?.data?.slice(
				(pageTable1 - 1) * resultsPerPage,
				pageTable1 * resultsPerPage
			)
		);
	};

	useEffect(() => {
		return update();
	}, [pageTable1]);

	return (
		<>
			{/* <PageTitle>Agent / Supervisor</PageTitle> */}
			<Label className="flex justify-between items-center">
				<PageTitle>Situation Report</PageTitle>
				{/* <button onClick={() => setShowDetails(true)}>Open</button> */}
				{/* <div onClick={() => history.push("/app/agent/reports/add")}>
					<RoundIcon
						icon={EditIcon}
						iconColorClass="text-orange-500 hover:text-white hover:cursor-pointer dark:text-orange-100"
						bgColorClass="bg-orange-100 hover:cursor-pointer dark:bg-orange-500"
						className="hover:bg-gray-500 cursor-pointer duration-500 "
					/>
				</div> */}
			</Label>
			<div className=" md:grid flex flex-wrap gap-2 justify-evenly md:gap-4 grid-cols-3 md:grid-cols-3">
				{/* <Label className="my-2">
					<Select
						options={[
							{ name: "Gubernatorial", id: "Gubernatorial" },
							{ name: "House of Assembly", id: "HOA" },
						]}
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => option.id}
						// onChange={selectLga}
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
						// onChange={selectLga}
						// value={selectedLga}
						placeholder="LGA"
						hideSelectedOptions
						required

						// defaultValue={[{ name: "All", id: "all" }]}
					/>
				</Label>

				<Label className="my-2">
					<Select
						options={lgas[0].wards}
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => option.id}
						// onChange={selectLga}
						// value={selectedLga}
						placeholder="Ward"
						// hideSelectedOptions
						required
					/>
				</Label>

				<Label className="my-2">
					<Select
						options={lgas[0].wards[0].pus}
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => option.id}
						// onChange={selectLga}
						// value={selectedLga}
						placeholder="PU"
						hideSelectedOptions
						required
					/>
				</Label>

				{/* <Label className="my-2">
					<Select
						options={parties}
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => option.party_id}
						// onChange={selectLga}
						// value={selectedLga}
						placeholder="Party"
						// hideSelectedOptions
						required
					/>
				</Label> */}
			</div>
			<SearchComponent />
			{/* {isLoading && <PageTitle>Fetching Data</PageTitle>} */}
			{/*  */}
			<DataTable
				columns={reportColumns}
				data={reports?.data}
				pagination
				progressPending={isLoading}
				responsive
				striped
				highlightOnHover
				onRowClicked={(row) => showReport(row)}
				style={{ cursor: "pointer" }}
			/>

			<ModalComponent
				title={"Report details"}
				isModalOpen={showDetails}
				setIsModalOpen={setShowDetails}
			>
				<ReportItem item={selectedReport} />
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

export default AdminReport;
