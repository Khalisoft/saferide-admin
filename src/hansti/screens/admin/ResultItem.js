import React from "react";
import {
	Card,
	CardBody,
	Label,
	Badge,
	Table,
	TableHeader,
	TableCell,
	TableBody,
	TableRow,
	TableFooter,
	TableContainer,
	Button,
} from "@windmill/react-ui";
import Moment from "react-moment";
import { EditIcon, TrashIcon } from "../../../icons";
import ChartCard from "../../../components/Chart/ChartCard";
import ChartLegend from "./../../../components/Chart/ChartLegend";
import { Bar } from "react-chartjs-2";
// import { barOptions } from "../../../utils/demo/chartsData";
import { barLegends } from "./../../../utils/demo/chartsData";

const ResultItem = ({ item }) => {
	// const sabarOptions = {
	// 	data: {
	// 		labels: [
	// 			lgs[0]?.lga,
	// 			lgs[1]?.lga,
	// 			lgs[2]?.lga,
	// 			lgs[3]?.lga,
	// 			lgs[4]?.lga,
	// 			lgs[5]?.lga,
	// 			lgs[6]?.lga,
	// 			lgs[7]?.lga,
	// 			lgs[8]?.lga,
	// 			lgs[9]?.lga,
	// 			lgs[10]?.lga,
	// 			lgs[11]?.lga,
	// 		],
	// 		datasets: [
	// 			{
	// 				label: "APC",
	// 				backgroundColor: "#047481",
	// 				// borderColor: window.chartColors.red,
	// 				borderWidth: 1,
	// 				data: [
	// 					lgs[0]?.apc,
	// 					lgs[1]?.apc,
	// 					lgs[2]?.apc,
	// 					lgs[3]?.apc,
	// 					lgs[4]?.apc,
	// 					lgs[5]?.apc,
	// 					lgs[6]?.apc,
	// 					lgs[7]?.apc,
	// 					lgs[8]?.apc,
	// 					lgs[9]?.apc,
	// 					lgs[10]?.apc,
	// 					lgs[11]?.apc,
	// 				],
	// 			},
	// 			{
	// 				label: "PDP",
	// 				backgroundColor: "#E02424",
	// 				// borderColor: window.chartColors.blue,
	// 				borderWidth: 1,
	// 				data: [
	// 					lgs[0]?.pdp,
	// 					lgs[1]?.pdp,
	// 					lgs[2]?.pdp,
	// 					lgs[3]?.pdp,
	// 					lgs[4]?.pdp,
	// 					lgs[5]?.pdp,
	// 					lgs[6]?.pdp,
	// 					lgs[7]?.pdp,
	// 					lgs[8]?.pdp,
	// 					lgs[9]?.pdp,
	// 					lgs[10]?.pdp,
	// 					lgs[11]?.pdp,
	// 				],
	// 			},
	// 			{
	// 				label: "NNPP",
	// 				backgroundColor: "#7E3AF2",
	// 				// borderColor: window.chartColors.blue,
	// 				borderWidth: 1,
	// 				data: [
	// 					lgs[0]?.nnpp,
	// 					lgs[1]?.nnpp,
	// 					lgs[2]?.nnpp,
	// 					lgs[3]?.nnpp,
	// 					lgs[4]?.nnpp,
	// 					lgs[5]?.nnpp,
	// 					lgs[6]?.nnpp,
	// 					lgs[7]?.nnpp,
	// 					lgs[8]?.nnpp,
	// 					lgs[9]?.nnpp,
	// 					lgs[10]?.nnpp,
	// 					lgs[11]?.nnpp,
	// 				],
	// 			},
	// 			{
	// 				label: "PRP",

	// 				backgroundColor: "#3F83F8",

	// 				// borderColor: window.chartColors.blue,
	// 				borderWidth: 1,
	// 				data: [
	// 					lgs[0]?.prp,
	// 					lgs[1]?.prp,
	// 					lgs[2]?.prp,
	// 					lgs[3]?.prp,
	// 					lgs[4]?.prp,
	// 					lgs[5]?.prp,
	// 					lgs[6]?.prp,
	// 					lgs[7]?.prp,
	// 					lgs[8]?.prp,
	// 					lgs[9]?.prp,
	// 					lgs[10]?.prp,
	// 					lgs[11]?.prp,
	// 				],
	// 			},
	// 			{
	// 				label: "Others",
	// 				backgroundColor: "#F8B4B4",
	// 				// borderColor: window.chartColors.blue,
	// 				borderWidth: 1,
	// 				data: [
	// 					lgs[0]?.others,
	// 					lgs[1]?.others,
	// 					lgs[2]?.others,
	// 					lgs[3]?.others,
	// 					lgs[4]?.others,
	// 					lgs[5]?.others,
	// 					lgs[6]?.others,
	// 					lgs[7]?.others,
	// 					lgs[8]?.others,
	// 					lgs[9]?.others,
	// 					lgs[10]?.others,
	// 					lgs[11]?.others,
	// 				],
	// 			},
	// 		],
	// 	},
	// 	options: {
	// 		responsive: true,
	// 	},
	// 	legend: {
	// 		display: false,
	// 	},
	// };
	const barOptions = {
		data: {
			labels: ["Gubernatorial", "House of Assembly"],
			datasets: [
				{
					label: item.parties.find((party) => party.name === "APC").name,
					backgroundColor: "#0694a2",
					// borderColor: window.chartColors.red,
					borderWidth: 1,
					data: [
						item.parties.find(
							(party) => party.name === "APC" && party.type === "Gubernatorial"
						)?.votes,
						item.parties.find(
							(party) =>
								party.name === "APC" && party.type === "House of Assembly"
						)?.votes,
					],
				},
				{
					label: item.parties.find((party) => party.name === "PDP").name,

					backgroundColor: "#1c64f2",
					// borderColor: window.chartColors.blue,
					borderWidth: 1,
					data: [
						item.parties.find(
							(party) => party.name === "PDP" && party.type === "Gubernatorial"
						)?.votes,
						item.parties.find(
							(party) =>
								party.name === "PDP" && party.type === "House of Assembly"
						)?.votes,
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
		<div className="flex-col space-y-2">
			<Card className="my-1">
				<CardBody>
					<Label className="my-1 justify-between">
						<Label className="flex justify-between">
							<p className="text-gray-400 font-semibold dark:text-gray-300">
								LGA: {item?.lga}
							</p>
							<p className="text-gray-400 font-semibold dark:text-gray-300">
								Ward: {item?.ward}
							</p>
						</Label>
						<p className="text-gray-400 font-semibold dark:text-gray-300">
							PU: {item?.pu}
						</p>

						<Label className="flex justify-between">
							<p className="text-gray-400 text-xs dark:text-gray-300">
								<Moment fromNow>{item?.created_at}</Moment>
							</p>
							<p className="text-gray-400 text-xs dark:text-gray-300">
								<Moment format="hh:mm A - DD/MM/YYYY">
									{item?.created_at}
								</Moment>
							</p>
						</Label>
					</Label>
					<TableContainer className="my-4">
						<Table>
							<TableHeader>
								<tr>
									<TableCell>Party</TableCell>
									<TableCell>Votes</TableCell>
									<TableCell>Type</TableCell>
									{/* <TableCell>Status</TableCell>
								<TableCell>Date</TableCell>
							<TableCell>Actions</TableCell> */}
								</tr>
							</TableHeader>
							<TableBody>
								{item?.parties.map((party, i) => (
									<>
										<TableRow key={i}>
											<TableCell>
												<p className="font-semibold">{party?.name}</p>
											</TableCell>
											<TableCell>
												<span className="text-sm"> {party?.votes}</span>
											</TableCell>
											<TableCell>
												<span className="text-sm"> {party?.type}</span>
											</TableCell>
										</TableRow>
									</>
								))}
								{/* <TableRow>
								<TableCell>
								<p className="font-semibold">Highest: </p>
								</TableCell>
								<TableCell>
								<span className="text-sm">Lowest</span>
								</TableCell>
							</TableRow> */}
							</TableBody>
						</Table>
					</TableContainer>
				</CardBody>
			</Card>
			<ChartCard title="">
				<Bar {...barOptions} />
				{/* <ChartLegend legends={barLegends} /> */}
			</ChartCard>
		</div>
	);
};

export default ResultItem;
