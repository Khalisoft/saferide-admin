import React, { useState, useEffect } from "react";
import PageTitle from "../../../components/Typography/PageTitle";
import SectionTitle from "../../../components/Typography/SectionTitle";
import { EditIcon, PeopleIcon } from "../../../icons";
import InfoCard from "./../../../components/Cards/InfoCard";
import RoundIcon from "./../../../components/RoundIcon";
import { Link, useHistory } from "react-router-dom";
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
import Moment from "react-moment";
import "moment-timezone";
import ModalComponent from "../../../components/ModalComponent";
import NewReport from "./components/NewReport";
import { useApp } from "../../../data/store";
import { useReports } from "../../../data/api";

const AgentReports = () => {
	const [showDetails, setShowDetails] = useState(false);
	const [sendReport, setSendReport] = useState(false);

	// const { reports } = useApp((state) => state);
	const { data: reports, isError, isLoading } = useReports();

	const history = useHistory();
	// setup pages control for every table
	const [pageTable1, setPageTable1] = useState(1);
	const [dataTable1, setDataTable1] = useState([]);
	const [reportItemData, setReportItemData] = useState([]);
	const [selectedItemData, setSelectedtItemData] = useState(null);

	// const response = [{}];
	// pagination setup
	const resultsPerPage = 10;
	const totalResults = reports.length;

	// pagination change control
	function onPageChangeTable(p) {
		setPageTable1(p);
	}

	// on page change, load new sliced data
	// here you would make another server request for new data
	useEffect(() => {
		setReportItemData(reports?.data?.slice(0, 4));
	}, [pageTable1]);

	const selectItem = (item) => {
		setSelectedtItemData(item);
		setShowDetails(true);
	};

	const ReportListItem = ({ item }) => {
		return (
			<Card
				onClick={() => selectItem(item)}
				className="my-1 cursor-pointer hover:bg-gray-200 duration-500"
			>
				<CardBody className="cursor-pointer">
					<Label className="my-1 cursor-pointer flex justify-between">
						<p className="cursor-pointer font-semibold text-gray-600 dark:text-gray-300">
							{item?.title}
						</p>
						<Badge type="danger" className="bg-gray-200 items-center">
							{item?.priority}
						</Badge>
					</Label>
					<Label className="cursor-pointer my-1">
						<p className="text-gray-600 dark:text-gray-300">
							{item?.description}
						</p>
					</Label>
					<Label className="my-1 cursor-pointer flex justify-between">
						<p className="text-gray-400 text-xs dark:text-gray-300">
							{item?.ward} Ward
						</p>

						<p className="text-gray-400 text-xs dark:text-gray-300">
							{item?.pu}
						</p>
						<p className="text-gray-400 text-xs dark:text-gray-300">
							<Moment fromNow>{item?.created_at}</Moment>
							{/* <Moment format="hh:mm - DD/MM/YYYY">{item?.created_at}</Moment> */}
						</p>
					</Label>
				</CardBody>
			</Card>
		);
	};

	return (
		<div className="max-w-full ">
			{/* <PageTitle>Agent / Supervisor</PageTitle> */}
			<Label className="flex justify-between items-center">
				<PageTitle>Situation Report</PageTitle>
				<div
					onClick={() => history.push("/app/agent/reports/add")}
					className=""
				>
					<RoundIcon
						icon={EditIcon}
						iconColorClass="text-orange-500 hover:text-white hover:cursor-pointer dark:text-orange-100"
						bgColorClass="bg-orange-100 hover:cursor-pointer dark:bg-orange-500"
						className="hover:bg-gray-500 cursor-pointer duration-500 "
					/>
				</div>
			</Label>

			<div className="hidden md:grid xl:grid gap-6 my-2 md:grid-cols-2 xl:grid-cols-3">
				<InfoCard
					title="Submitted"
					value={reports ? reports?.data?.length : 0}
				></InfoCard>
				<InfoCard
					title="Responded"
					value={
						reports ? reports?.data?.filter((r) => r.comment != null).length : 0
					}
				></InfoCard>
				<InfoCard
					title="Resolved"
					value={reports ? reports?.data?.filter((r) => r.settled).length : 0}
				></InfoCard>
			</div>
			{/* Show on mobile */}
			<div className="flex md:hidden lg:hidden xl:hidden my-2 w-full justify-between items-center">
				<InfoCard
					className="w-1/3 grow"
					title="Submitted"
					value={reports ? reports?.data?.length : 0}
				></InfoCard>
				<InfoCard
					className="min-w-1/3 grow"
					title="Responded"
					value={
						reports ? reports?.data?.filter((r) => r.comment != null).length : 0
					}
				></InfoCard>
				<InfoCard
					className="min-w-1/3 grow"
					title="Resolved"
					value={reports ? reports?.data?.filter((r) => r.settled).length : 0}
				></InfoCard>
			</div>

			<div className="mb-4">
				{isLoading && <PageTitle>Fetching Data</PageTitle>}
				{reports?.data?.length > 0 && (
					<>
						<div className="flex justify-end space-x-2">
							<Link
								to="/app/agent/reports/list"
								className="underline hover:text-primary text-xs"
							>
								View all
							</Link>
						</div>
						{reportItemData.map((item, index) => (
							<ReportListItem key={index} item={item} />
						))}
					</>
				)}
			</div>

			<ModalComponent
				title={"Report details"}
				isModalOpen={showDetails}
				setIsModalOpen={setShowDetails}
			>
				<ReportListItem item={selectedItemData} />
			</ModalComponent>
			<ModalComponent
				title={"New Report"}
				isModalOpen={sendReport}
				setIsModalOpen={setSendReport}
				actions={true}
				actionBtn={{ label: "Send Report", action: () => alert() }}
			>
				{/* <ReportListItem item={selectedItemData} /> */}
				<NewReport />
			</ModalComponent>
		</div>
	);
};

export default AgentReports;
