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
import DataTable from "react-data-table-component";
import { reportColumns } from "./components/columns";
import { AUTH, ROLE } from "../../../data/constants";
import Select from "react-select";
import { lgas } from "./../../../utils/data";

const AgentReportList = () => {
	const role = JSON.parse(localStorage.getItem(ROLE));
	const assigned_lgas = JSON.parse(localStorage.getItem(AUTH)).data
		.assigned_lgas;
	// Get report data
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
	const [filteredData, setFilteredData] = useState();
	const [selectedLGA, setSelectedLGA] = useState(null);
	const [selectedWard, setSelectedWard] = useState(null);
	const [selectedPu, setSelectedPu] = useState(null);
	// pagination change control
	function onPageChangeTable(p) {
		setPageTable1(p);
	}

	const filterData = (search) => {
		console.log(search);
		const filter = reports.data.filter((i) => i.title.includes(search));

		setFilteredData(filter);
	};
	// on page change, load new sliced data
	// here you would make another server request for new data
	// console.log(
	// 	reports?.data?.slice(
	// 		(pageTable1 - 1) * resultsPerPage,
	// 		pageTable1 * resultsPerPage
	// 	)
	// );

	const filterByLGA = (search) => {
		setSelectedLGA(search);
		const filter = reports.data.filter((i) => i.lga === search.name);
		setFilteredData(filter);
	};
	const filterByWard = (search) => {
		setSelectedWard(search);
		const filter = reports.data.filter((i) => i.ward === search.name);
		setFilteredData(filter);
	};
	const filterByPu = (search) => {
		setSelectedPu(search);
		const filter = reports.data.filter((i) => i.pu === search.name);
		setFilteredData(filter);
	};

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
				<div onClick={() => history.push("/app/agent/reports/add")}>
					<RoundIcon
						icon={EditIcon}
						iconColorClass="text-orange-500 hover:text-white hover:cursor-pointer dark:text-orange-100"
						bgColorClass="bg-orange-100 hover:cursor-pointer dark:bg-orange-500"
						className="hover:bg-gray-500 cursor-pointer duration-500 "
					/>
				</div>
			</Label>
			<div className=" md:grid flex flex-wrap gap-2 justify-evenly md:gap-4 grid-cols-3 md:grid-cols-4 items-center">
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
						options={[
							{ name: "All", id: "all" },
							...lgas.filter((l) => assigned_lgas.includes(l.name)),
						]}
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
						// options={lgas[0].wards}
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => option.id}
						onChange={(e) => filterByWard(e)}
						// value={selectedLga}
						placeholder="Ward"
						// hideSelectedOptions
						required
					/>
				</Label>

				<Label className="my-2">
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
				</Label>
				<div
					className=""
					onClick={() => {
						setFilteredData();
						setSelectedLGA();
						setSelectedWard();
						setSelectedPu();
					}}
				>
					<Button className="bg-orange-100 w-full">Reset</Button>
				</div>
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
			{/* <SearchComponent action={console.log} /> */}
			{/* {isLoading && <PageTitle>Fetching Data</PageTitle>} */}
			{/* {reports?.data.length > 0 && (
				<TableContainer className="mb-8">
					<Table>
						<TableHeader>
							<tr>
								<TableCell>PU/Ward</TableCell>
								<TableCell>Type</TableCell>
								<TableCell>Priority</TableCell>
								<TableCell>Title</TableCell>
								<TableCell>Updated</TableCell>
								<TableCell>Action</TableCell>
							</tr>
						</TableHeader>
						<TableBody>
							{dataTable1?.map((item, i) => (
								<TableRow
									className="cursor-pointer hover:bg-gray-200 duration-500								 "
									onClick={() => showReport(item)}
									key={i}
								>
									<TableCell>
										<div className="flex items-center text-sm">
											<div>
												<p className="font-semibold">{item?.pu}</p>
												<p className="text-xs text-gray-600 dark:text-gray-400">
													{item?.ward}
												</p>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<span className="text-sm">{item?.type}</span>
									</TableCell>
									<TableCell>
										<span className="text-sm">{item?.priority}</span>
									</TableCell>
									<TableCell>
										<span className="text-sm">{item?.title}</span>
									</TableCell>
									<TableCell>
										<span className="text-sm">
											<Moment fromNow>{item?.created_at}</Moment>
										</span>
									</TableCell>

									<TableCell width={1}>
										<RoundIcon
											icon={EditIcon}
											iconColorClass="text-blue-500 dark:text-blue-100"
											bgColorClass="bg-blue-100 dark:bg-blue-500"
											className="mr-4 w-auto"
										/>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<TableFooter>
						<Pagination
							totalResults={totalResults}
							resultsPerPage={resultsPerPage}
							onChange={onPageChangeTable}
							label="Table navigation"
						/>
					</TableFooter>
				</TableContainer>
			)} */}

			<DataTable
				columns={reportColumns}
				data={filteredData ? filteredData : reports?.data}
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

export default AgentReportList;
