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
import NewResult from "./components/NewResult";
import { useResults } from "../../../data/api";

const AgentResults = () => {
	const [showDetails, setShowDetails] = useState(false);
	const [sendResult, setSendResult] = useState(false);

	// const { results } = useApp((state) => state);
	const { data: results } = useResults();

	const history = useHistory();
	// setup pages control for every table
	const [pageTable1, setPageTable1] = useState(1);
	const [dataTable1, setDataTable1] = useState([]);
	const [reportItemData, setReportItemData] = useState([]);
	const [resultItemData, setResultItemData] = useState([]);
	const [selectedItemData, setSelectedtItemData] = useState(null);

	// pagination setup
	const resultsPerPage = 10;
	const totalResults = results?.data?.length;

	// pagination change control
	function onPageChangeTable(p) {
		setPageTable1(p);
	}

	// on page change, load new sliced data
	// here you would make another server request for new data
	useEffect(() => {
		setResultItemData(results?.data.slice(0, 4));
	}, [pageTable1]);

	const selectItem = (item) => {
		setSelectedtItemData(item);
		setShowDetails(true);
	};

	const VotingListItem = ({ item }) => {
		return (
			<Card
				onClick={() => selectItem(item)}
				className="my-1 cursor-pointer hover:bg-gray-200 duration-500"
			>
				<CardBody className="cursor-pointer">
					<Label className="my-1 cursor-pointer flex justify-between">
						<p className="cursor-pointer font-semibold text-gray-600 dark:text-gray-300">
							{item?.pu}
						</p>
						<Badge
						// type={`${
						// 	item?.status === "complete" || item?.status
						// 		? "success"
						// 		: "warning"
						// }`}
						// className="bg-gray-200 items-center"
						>
							{item?.type}
						</Badge>
					</Label>
					<Label className="cursor-pointer my-1">
						<p className="text-gray-600 dark:text-gray-300">
							{item?.suggestion}
						</p>
					</Label>
					<Label className="my-1 cursor-pointer flex justify-between">
						<p className="text-gray-400 text-xs dark:text-gray-300">
							{item?.ward} Ward
						</p>

						<p className="text-gray-400 text-xs dark:text-gray-300">
							{item?.total_votes}
						</p>
						{/* <p className="text-gray-400 text-xs dark:text-gray-300">
							{item?.total_votes}
						</p> */}
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
				<PageTitle>Voting Results</PageTitle>
				<div
					onClick={() => history.push("/app/agent/results/add")}
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
					title="Total Votes"
					value={results ? results?.data?.length : 0}
				></InfoCard>
				<InfoCard title="PUs Submitted" value="0"></InfoCard>
				<InfoCard title="PUs awaiting" value="0"></InfoCard>
			</div>
			{/* Show on mobile */}
			<div className="flex md:hidden lg:hidden xl:hidden my-2 w-full justify-between items-center">
				<InfoCard
					className="w-1/3 grow"
					title="Total Votes"
					value={results ? results?.data?.length : 0}
				></InfoCard>
				<InfoCard
					className="min-w-1/3 grow"
					title="PUs submitted"
					value="0"
				></InfoCard>
				<InfoCard
					className="min-w-1/3 grow"
					title="PUs awaiting"
					value="0"
				></InfoCard>
			</div>

			<div className="mb-4">
				<div className="flex justify-end space-x-2">
					<Link
						to="/app/agent/results/list"
						className="underline hover:text-primary text-xs"
					>
						View all
					</Link>
				</div>
				{resultItemData.map((item, index) => (
					<VotingListItem key={index} item={item} />
				))}
			</div>

			<ModalComponent
				title={"Result details"}
				isModalOpen={showDetails}
				setIsModalOpen={setShowDetails}
			>
				<VotingListItem item={selectedItemData} />
			</ModalComponent>
			<ModalComponent
				title={"Send Voting Result"}
				isModalOpen={sendResult}
				setIsModalOpen={setSendResult}
				actions={true}
				actionBtn={{ label: "Send Result", action: () => alert() }}
			>
				<NewResult />
			</ModalComponent>
		</div>
	);
};

export default AgentResults;

// import React, { useState, useEffect } from "react";
// import PageTitle from "../../../components/Typography/PageTitle";
// import SectionTitle from "../../../components/Typography/SectionTitle";
// import { EditIcon, PeopleIcon } from "../../../icons";
// import InfoCard from "./../../../components/Cards/InfoCard";
// import RoundIcon from "./../../../components/RoundIcon";
// import {
// 	Table,
// 	TableHeader,
// 	TableCell,
// 	TableBody,
// 	TableRow,
// 	TableFooter,
// 	TableContainer,
// 	Badge,
// 	Avatar,
// 	Button,
// 	Pagination,
// } from "@windmill/react-ui";

// const AgentResults = () => {
// 	// setup pages control for every table
// 	const [pageTable1, setPageTable1] = useState(1);
// 	const [dataTable1, setDataTable1] = useState([]);

// 	const response = [{}];
// 	// pagination setup
// 	const resultsPerPage = 10;
// 	const totalResults = response.length;

// 	// pagination change control
// 	function onPageChangeTable(p) {
// 		setPageTable1(p);
// 	}

// 	// on page change, load new sliced data
// 	// here you would make another server request for new data
// 	useEffect(() => {
// 		setDataTable1(
// 			response.slice(
// 				(pageTable1 - 1) * resultsPerPage,
// 				pageTable1 * resultsPerPage
// 			)
// 		);
// 	}, [pageTable1]);

// 	return (
// 		<>
// 			{/* <PageTitle>Agent / Supervisor</PageTitle> */}
// 			{/* <SectionTitle	ectionTitle>Election Results</SectionTitle> */}
// 			<div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
// 				<InfoCard title="Submit Result" value="Submit Election Result">
// 					<RoundIcon
// 						icon={EditIcon}
// 						iconColorClass="text-orange-500 dark:text-orange-100"
// 						bgColorClass="bg-orange-100 dark:bg-orange-500"
// 						className="mr-4"
// 					/>
// 				</InfoCard>
// 				{/* <InfoCard title="Election Results" value="6389">
// 					<RoundIcon
// 						icon={PeopleIcon}
// 						iconColorClass="text-orange-500 dark:text-orange-100"
// 						bgColorClass="bg-orange-100 dark:bg-orange-500"
// 						className="mr-4"
// 					/>
// 				</InfoCard> */}
// 			</div>

// 			<TableContainer className="mb-8">
// 				<Table>
// 					<TableHeader>
// 						<tr>
// 							{/* <div className="flex flex-col text-sm"> */}
// 							<TableCell>PU</TableCell>
// 							{/* <TableCell>Ward</TableCell> */}
// 							<TableCell>APC</TableCell>
// 							<TableCell>PDP</TableCell>
// 							<TableCell>Others</TableCell>
// 							{/* </div> */}
// 							<TableCell>Leading</TableCell>
// 							<TableCell>Last Update</TableCell>
// 							<TableCell>Action</TableCell>
// 						</tr>
// 					</TableHeader>
// 					<TableBody>
// 						{[1, 2, 3, 4, 5].map((user, i) => (
// 							<TableRow key={i}>
// 								<TableCell>
// 									<div className="flex items-center text-sm">
// 										{/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" /> */}
// 										<div>
// 											<p className="font-semibold">Polling Unit</p>
// 											{/* <p className="font-semibold">{user.name}</p> */}
// 											<p className="text-xs text-gray-600 dark:text-gray-400">
// 												Ward
// 											</p>
// 											{/* <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p> */}
// 										</div>
// 									</div>
// 								</TableCell>
// 								<TableCell>
// 									<span className="text-sm">980</span>
// 									{/* <span className="text-sm">$ {user.amount}</span> */}
// 								</TableCell>
// 								<TableCell>
// 									{/* <Badge type={"error"}>Status</Badge> */}
// 									{/* <Badge type={user.status}>Status</Badge> */}
// 									<span className="text-sm">180</span>
// 								</TableCell>
// 								<TableCell>
// 									{/* <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span> */}
// 									{/* <span className="text-sm">25/2/2023</span> */}
// 									<span className="text-sm">21</span>
// 								</TableCell>
// 								<TableCell>
// 									<span className="text-sm">APC</span>
// 								</TableCell>
// 								<TableCell>
// 									<span className="text-sm">21</span>
// 								</TableCell>
// 								<TableCell width={1}>
// 									<RoundIcon
// 										icon={EditIcon}
// 										iconColorClass="text-blue-500 dark:text-blue-100"
// 										bgColorClass="bg-blue-100 dark:bg-blue-500"
// 										className="mr-4 w-auto"
// 									/>
// 								</TableCell>
// 							</TableRow>
// 						))}
// 					</TableBody>
// 				</Table>
// 				<TableFooter>
// 					<Pagination
// 						totalResults={totalResults}
// 						resultsPerPage={resultsPerPage}
// 						onChange={onPageChangeTable}
// 						label="Table navigation"
// 					/>
// 				</TableFooter>
// 			</TableContainer>
// 		</>
// 	);
// };

// export default AgentResults;
