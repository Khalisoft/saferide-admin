import Moment from "react-moment";
import React from "react";
import { Button, Label } from "@windmill/react-ui";

export const reportColumns = [
	{
		name: "PU",
		selector: (row) => row?.pu,
	},
	{
		name: "Ward",
		selector: (row) => row.ward,
	},
	{
		name: "Type",
		selector: (row) => row?.type,
	},
	{
		name: "Priority",
		selector: (row) => row?.priority,
	},
	{
		name: "Title",
		selector: (row) => row?.title,
	},
	{
		name: "When",
		selector: (row) => <Moment fromNow>{row?.created_at}</Moment>,
	},
	// {
	// 	name: "",
	// 	selector: (row) => <Button className="btn">{"Edit"}</Button>,
	// },
];

export const agentColumns = [
	{
		name: "Name",
		selector: (row) => `${row?.first_name} ${row?.last_name}`,
	},
	{
		name: "LGAs",
		selector: (row) => row?.assigned_lgas,
	},
	{
		name: "Wards",
		selector: (row) => row?.assigned_wards?.length,
	},
	{
		name: "PUs",
		selector: (row) => row?.assigned_pus?.length,
	},
	{
		name: "Submitted",
		selector: (row) => row?.submitted_pus?.length,
	},
	{
		name: "Pending",
		selector: (row) => row?.assigned_pus?.length - row?.submitted_pus?.length,
	},
	{
		name: "% Complete",
		selector: (row) =>
			`${(
				(row?.submitted_pus?.length / row?.assigned_pus?.length) *
				100
			).toFixed(2)}%`,
	},
];
export const resultColumns = [
	{
		name: "PU",
		selector: (row) => row?.pu,
	},
	{
		name: "Ward",
		selector: (row) => row.ward,
	},
	{
		name: "Type",
		selector: (row) => row?.type,
	},
	{
		name: "Registered Voters",
		selector: (row) => row?.registered_voters,
	},

	{
		name: "Result",
		selector: (row) => row?.parties.length,
	},
];
export const resultByLgColumns = [
	{
		name: "PU",
		selector: (row) => row?.pu,
	},
	{
		name: "Ward",
		selector: (row) => row.ward,
	},
	{
		name: "Type",
		selector: (row) => row?.type,
	},
	{
		name: "Result",
		selector: (row) => row?.parties.length,
	},
];
export const resultByLgColumnsTable = [
	{
		name: "LGA",
		selector: (row) => <Label className="font-bold">{row?.lga}</Label>,
	},
	{
		name: "APC",
		selector: (row) => <>{row?.apc}</>,
	},
	{
		name: "PDP",
		selector: (row) => <>{row?.pdp}</>,
	},
	{
		name: "NNPP",
		selector: (row) => <>{row?.nnpp}</>,
	},
	{
		name: "PRP",
		selector: (row) => <>{row?.prp}</>,
	},
	{
		name: "Others",
		selector: (row) => <>{row?.others}</>,
	},
];
export const resultByColumns = [
	{
		name: "LGA",
		selector: (row) => row?.pu,
	},
	{
		name: "Ward",
		selector: (row) => row.ward,
	},
	{
		name: "PU",
		selector: (row) => row?.pu,
	},
	{
		name: "Type",
		selector: (row) => row?.type,
	},
	{
		name: "Result",
		selector: (row) => row?.parties.length,
	},
];
