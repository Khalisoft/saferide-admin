import React from "react";
import { Card, CardBody, Label, Badge } from "@windmill/react-ui";
import Moment from "react-moment";

const ReportItem = ({ item }) => {
	return (
		<Card className="my-1">
			<CardBody>
				<Label className="my-1 flex justify-between">
					<p className=" font-semibold text-gray-600 dark:text-gray-300">
						{item?.title}
					</p>
					<Badge type="danger" className="bg-gray-200 items-center">
						{item?.priority}
					</Badge>
				</Label>
				<Label className="my-1">
					<p className="text-gray-600 dark:text-gray-300">
						{item?.description}
					</p>
				</Label>
				<Label className="my-1 flex justify-between">
					<p className="text-gray-400 text-xs dark:text-gray-300">{item?.pu}</p>
					<p className="text-gray-400 text-xs dark:text-gray-300">
						{item?.ward}
					</p>
					<p className="text-gray-400 text-xs dark:text-gray-300">
						<Moment fromNow>{item?.created_at}</Moment>
					</p>
					<p className="text-gray-400 text-xs dark:text-gray-300">
						<Moment format="hh:mm A - DD/MM/YYYY">{item?.created_at}</Moment>
					</p>
				</Label>
			</CardBody>
		</Card>
	);
};

export default ReportItem;
