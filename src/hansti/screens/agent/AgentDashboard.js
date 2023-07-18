import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PageTitle from "../../../components/Typography/PageTitle";
import SectionTitle from "../../../components/Typography/SectionTitle";
import { useReports, useResults } from "../../../data/api";
import { AUTH, ROLE } from "../../../data/constants";
import { useApp } from "../../../data/store";
import { PeopleIcon } from "../../../icons";
import InfoCard from "./../../../components/Cards/InfoCard";
import RoundIcon from "./../../../components/RoundIcon";

const AgentDashboard = () => {
	const user = JSON.parse(localStorage.getItem(AUTH));
	const role = JSON.parse(localStorage.getItem(ROLE));

	const history = useHistory();
	// const { results } = useApp((state) => state);
	// const { reports, results } = useApp((state) => state);
	const { data: reports } = useReports(role);
	const { data: results } = useResults(role);

	return (
		<>
			<PageTitle>
				{`${user?.data?.first_name ? user?.data?.first_name : ""} `}
				Agent
			</PageTitle>
			{/* <PageTitle>{`${user?.data?.lga} LG `}Agent</PageTitle> */}
			<SectionTitle>{` (${user?.data?.assigned_lgas.toString()})`}</SectionTitle>
			<div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
				<div
					className="cursor-pointer"
					onClick={() => history.push("/app/agent/reports/list")}
				>
					<InfoCard title="Situation Report" value={reports?.data?.length}>
						<RoundIcon
							icon={PeopleIcon}
							iconColorClass="text-orange-500 dark:text-orange-100"
							bgColorClass="bg-orange-100 dark:bg-orange-500"
							className="mr-4"
						/>
					</InfoCard>
				</div>
				<div
					className="cursor-pointer"
					onClick={() => history.push("/app/agent/results/list")}
				>
					<InfoCard title="Election Results" value={results?.data?.length}>
						<RoundIcon
							icon={PeopleIcon}
							iconColorClass="text-orange-500 dark:text-orange-100"
							bgColorClass="bg-orange-100 dark:bg-orange-500"
							className="mr-4"
						/>
					</InfoCard>
				</div>
			</div>
		</>
	);
};

export default AgentDashboard;
