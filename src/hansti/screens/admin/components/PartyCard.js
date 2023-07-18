import React from "react";
import { Card, CardBody, Label, Avatar, Input } from "@windmill/react-ui";
import image from "./../../../../assets/img/hantsi-logo.png";

const PartyCard = ({ party, setData, data }) => {
	const parties = data.parties;
	const setVote = (vote) => {
		setData({
			...data,
			parties: [
				...parties,
				{ name: party?.name, votes: vote, party_id: party?.party_id },
			],
			total_votes: data?.total_votes ? +data?.total_votes + +vote : 0 + +vote,
		});
	};
	return (
		<Card className="m-1">
			<CardBody className="flex flex-col justify-center ">
				<Label className="flex items-center">
					<Avatar src={party?.icon} size="regular" />
					<p className="ml-2">{party?.name}</p>
				</Label>
				<Input
					type="number"
					placeholder="votes"
					required
					onChange={(e) => setVote(e.target.value)}

					// onChange={(e) => setPhoneNumber(e.target.value)}
				/>
			</CardBody>
		</Card>
	);
};

export default PartyCard;
