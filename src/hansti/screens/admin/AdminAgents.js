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
import { useAgents, useResults } from "../../../data/api";
import { ROLE } from "../../../data/constants";
import DataTable from "react-data-table-component";
import { agentColumns, resultColumns } from "./components/columns";
import { hideLoader, showLoader } from "./../../../utils/loader";

const AdminAgents = () => {
	// setup pages control for every table
	const [pageTable1, setPageTable1] = useState(1);
	const [dataTable1, setDataTable1] = useState([]);
	const [sendReport, setSendReport] = useState(false);
	const [selectedReport, setSelectedReport] = useState(null);

	const history = useHistory();
	const [showDetails, setShowDetails] = useState(false);
	// const { reports } = useApp((state) => state);
	// const response = [{}];
	const role = JSON.parse(localStorage.getItem(ROLE));

	const { data: results, isLoading } = useResults(role);
	const { data: agents, isLoading: agentLoading } = useAgents();

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

	const showReport = (item) => {
		setSelectedReport(item);
		setShowDetails(true);
	};
	return (
		<>
			{/* <PageTitle>Agent / Supervisor</PageTitle> */}
			<Label className="flex justify-between items-center">
				<PageTitle>Agents</PageTitle>
				{/* <button onClick={() => setShowDetails(true)}>Open</button> */}
				<div onClick={() => history.push("/app/admin/create-agent")}>
					<RoundIcon
						icon={EditIcon}
						iconColorClass="text-orange-500 hover:text-white hover:cursor-pointer dark:text-orange-100"
						bgColorClass="bg-orange-100 hover:cursor-pointer dark:bg-orange-500"
						className="hover:bg-gray-500 cursor-pointer duration-500 "
					/>
				</div>
			</Label>
			<SearchComponent />
			{/* {isLoading && <PageTitle>Fetching Data</PageTitle>} */}

			<DataTable
				data={agents}
				columns={agentColumns}
				pagination
				progressPending={agentLoading}
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

export default AdminAgents;
