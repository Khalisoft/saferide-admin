import Moment from "react-moment";
import React from "react";
import { Button } from "@windmill/react-ui";

export const reportColumns = [
	{
		name: "PU",
		selector: (row) => row?.pu,
	},
	{
		name: "Ward",
		selector: (row) => row.ward,
	},
	// {
	// 	name: "Type",
	// 	selector: (row) => row?.type,
	// },
	{
		name: "Title",
		selector: (row) => row?.title,
	},
	{
		name: "Description",
		selector: (row) => row?.description.substring(0, 10) + "...",
	},
	{
		name: "Priority",
		selector: (row) => row?.priority,
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
	// {
	// 	name: "Accredited Voters",
	// 	selector: (row) => row?.accredited_voters,
	// },
	// {
	// 	name: "Valid Votes",
	// 	selector: (row) => row?.valid_votes,
	// },
	// {
	// 	name: "Invalid Votes",
	// 	selector: (row) => row?.invalid_votes,
	// },
	// {
	// 	name: "Total Votes",
	// 	selector: (row) => row?.total_votes,
	// },
	{
		name: "Result",
		selector: (row) => row?.parties.length,
	},
	// {
	// 	name: "Parties",
	// 	selector: (row) =>
	// 		row?.parties.map((party) => <>{party?.name + "-" + party?.votes}</>),
	// },
	// {
	// 	name: "",
	// 	selector: (row) =>
	// 		row?.parties.map((party) => <>{party?.name + "-" + party?.votes}</>),
	// },

	// {
	// 	name: "When",
	// 	selector: (row) => <Moment fromNow>{row?.created_at}</Moment>,
	// },
	// {
	// 	name: "",
	// 	selector: (row) => <Button className="btn">{"Edit"}</Button>,
	// },
];

// "registered_voters": 2,
//     "accredited_voters": 32,
//     "valid_votes": 12,
//     "invalid_votes": 23,
//     "total_votes": 3,
//     "parties": [
//         {
//             "name": "APC",
//             "votes": 12,
//             "party_id": 12
//         },
//         {
//             "name": "PDP",
//             "votes": 12,
//             "party_id": 12
//         }
//     ],
//     "pictures": [
//         "https://someurl.com/images/2",
//         "https://someurl.com/images/3"
//     ]
