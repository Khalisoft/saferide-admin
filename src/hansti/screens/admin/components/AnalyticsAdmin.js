import React from "react";
import { AUTH, ROLE } from "../../../../data/constants";
import { Card, CardBody, Label } from "@windmill/react-ui";
import { useSubmittedPus } from "../../../../data/api";
// import { useSubmittedPus } from "./../../data/api";
// import { parties } from "./../../../utils/data";
import { parties } from "./../../../../utils/data";

function AdminAnalyticsBar(props, { children, dataset }) {
	const { showAnals } = props;
	console.log(props.dataset);
	const user = JSON.parse(localStorage.getItem(AUTH));
	const role = JSON.parse(localStorage.getItem(ROLE));
	const { data } = useSubmittedPus();
	return (
		<aside className="z-30 flex-shrink-0 my-2 overflow-y-auto bg-white dark:bg-gray-800 lg:block">
			{children}
			{/* <PageTitle>Analytics Bar</PageTitle> */}
			{role === "admin" && (
				<Card className="hidden md:grid md:grid-cols-5 grid-cols-3">
					<CardBody>
						<Label>{parties[0].name}</Label>
						<Label className="font-bold">
							{props?.dataset?.allPartyGuberVotes[0]?.total}
						</Label>
					</CardBody>
					<CardBody>
						<Label>{parties[1].name}</Label>
						<Label className="font-bold">
							{props?.dataset?.allPartyGuberVotes[1]?.total}
						</Label>
					</CardBody>
					<CardBody>
						<Label>{parties[2].name}</Label>
						<Label className="font-bold">
							{props?.dataset?.allPartyGuberVotes[2]?.total}
						</Label>
					</CardBody>
					<CardBody>
						<Label>{parties[3].name}</Label>
						<Label className="font-bold">
							{props?.dataset?.allPartyGuberVotes[3]?.total}
						</Label>
					</CardBody>
					<CardBody>
						<Label>{parties[4].name}</Label>
						<Label className="font-bold">
							{props?.dataset?.allPartyGuberVotes[4]?.total}
						</Label>
					</CardBody>
				</Card>
			)}

			{role === "agent" && (
				<Card className="hidden md:grid md:grid-cols-6 grid-cols-3">
					<CardBody>
						<Label>{role === "agent" ? "LGAs" : "LGAs"}</Label>
						<Label className="font-bold">
							{user?.data?.assigned_lgas?.length}
						</Label>
					</CardBody>
					<CardBody>
						<Label>{role === "agent" ? "Wards" : "Wards"}</Label>
						<Label className="font-bold">
							{user?.data?.assigned_wards?.length}
						</Label>
					</CardBody>
					<CardBody>
						<Label>{role === "agent" ? "PUs" : "PUs"}</Label>
						<Label className="font-bold">
							{user?.data?.assigned_pus?.length}
						</Label>
					</CardBody>
					<CardBody>
						<Label>Submitted PUs</Label>
						<Label className="font-bold">{data?.submitted_pus?.length}</Label>
						{/* <Label>{user?.data?.assigned_pus?.length}</Label> */}
					</CardBody>
					<CardBody>
						<Label>Unsubmitted PUs</Label>
						<Label className="font-bold">{0}</Label>
					</CardBody>
					<CardBody>
						<Label>Submitted Reports</Label>
						<Label className="font-bold">{0}</Label>
					</CardBody>
				</Card>
			)}
			<Card className="md:hidden grid grid-cols-3">
				<CardBody>
					<Label>{role === "agent" ? "LGAs" : "LGAs"}</Label>
					<Label className="font-bold">
						{user?.data?.assigned_lgas?.length}
					</Label>
				</CardBody>
				<CardBody>
					<Label>{role === "agent" ? "Wards" : "Wards"}</Label>
					<Label className="font-bold">
						{user?.data?.assigned_wards?.length}
					</Label>
				</CardBody>
				<CardBody>
					<Label>PUs</Label>
					<Label className="font-bold">
						{user?.data?.assigned_pus?.length}
					</Label>
				</CardBody>
			</Card>
			{/* </Label> */}
		</aside>
	);
}

export default AdminAnalyticsBar;
