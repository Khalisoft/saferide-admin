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
import { EditIcon, TrashIcon } from "../../../../icons";

const ResultItem = ({ item }) => {
	return (
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
							<Moment format="hh:mm A - DD/MM/YYYY">{item?.created_at}</Moment>
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
	);
};

export default ResultItem;
