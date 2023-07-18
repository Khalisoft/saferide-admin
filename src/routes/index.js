import { lazy } from "react";
// import AgentSubmitResult from "../hansti/screens/admin/AgentSubmitResult";
// import AgentNoResult from "../hansti/screens/admin/AgentNoResult";
// import AddResult from "../hansti/screens/admin/AddResult";
// import AgentNoReport from "../hansti/screens/admin/AgentNoReport";
// import AgentResultList from "../../^/untitled/ts-nul-authority/Untitled-1";
// import AgentReports from "../hansti/screens/admin/AgentReports";
// import AdminDashboard from '../hansti/screens/admin/AdminDashboard'
// import AgentDashboard from '../hansti/screens/agent/AgentDashboard'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Forms = lazy(() => import("../pages/Forms"));
const Cards = lazy(() => import("../pages/Cards"));
const Charts = lazy(() => import("../pages/Charts"));
const Buttons = lazy(() => import("../pages/Buttons"));
const Modals = lazy(() => import("../pages/Modals"));
const Tables = lazy(() => import("../pages/Tables"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));
const AdminDashboard = lazy(() =>
	import("../hansti/screens/admin/AdminDashboard")
);
// const AdminDashboard = lazy(() => import('../hansti/screens/admin/AdminDashboard'))
const AgentDashboard = lazy(() =>
	import("../hansti/screens/agent/AgentDashboard")
);
const AgentResults = lazy(() =>
	import("./../hansti/screens/agent/AgentResults")
);
const AgentReports = lazy(() =>
	import("./../hansti/screens/agent/AgentReports")
);
const AdminResults = lazy(() =>
	import("./../hansti/screens/admin/AdminResults")
);
const AdminResultsTableHouse = lazy(() =>
	import("./../hansti/screens/admin/AdminResultsTableHouse")
);
const AdminReports = lazy(() =>
	import("./../hansti/screens/admin/AdminReports")
);
const CreateAgent = lazy(() => import("./../hansti/screens/admin/CreateAgent"));
const AdminAgents = lazy(() => import("./../hansti/screens/admin/AdminAgents"));
const Analytics = lazy(() => import("./../hansti/screens/agent/AgentResults"));
const AgentReportList = lazy(() =>
	import("./../hansti/screens/agent/AgentReportList")
);
const AgentResultList = lazy(() =>
	import("./../hansti/screens/agent/AgentResultList")
);
const AdminResultsByLga = lazy(() =>
	import("./../hansti/screens/admin/AdminResultsByLga")
);
const AgentAddResult = lazy(() =>
	import("./../hansti/screens/agent/AgentAddResult")
);
const AgentAddReport = lazy(() =>
	import("./../hansti/screens/agent/AgentAddReport")
);
const AdminResultsTable = lazy(() =>
	import("./../hansti/screens/admin/AdminResultsTable")
);
/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
	{
		path: "/dashboard", // the url
		component: Dashboard, // view rendered
	},
	{
		path: "/forms",
		component: Forms,
	},
	{
		path: "/cards",
		component: Cards,
	},
	{
		path: "/charts",
		component: Charts,
	},
	{
		path: "/buttons",
		component: Buttons,
	},
	{
		path: "/modals",
		component: Modals,
	},
	{
		path: "/tables",
		component: Tables,
	},
	{
		path: "/404",
		component: Page404,
	},
	{
		path: "/blank",
		component: Blank,
	},
	{
		path: "/agent",
		component: AgentDashboard,
	},
	{
		path: "/agent/dashboard",
		component: AgentDashboard,
	},
	{
		path: "/agent/reports",
		component: AgentReports,
	},
	{
		path: "/agent/reports/add",
		component: AgentAddReport,
	},
	{
		path: "/agent/reports/list",
		component: AgentReportList,
	},
	{
		path: "/agent/results",
		component: AgentResults,
	},
	{
		path: "/agent/results/list",
		component: AgentResultList,
	},
	{
		path: "/agent/results/add",
		component: AgentAddResult,
	},
	{
		path: "/admin",
		component: AdminDashboard,
	},
	{
		path: "/admin/dashboard",
		component: AdminDashboard,
	},
	{
		path: "/admin/reports",
		component: AdminReports,
	},
	{
		path: "/admin/results",
		component: AdminResults,
	},
	{
		path: "/admin/results-lga",
		component: AdminResultsByLga,
	},
	{
		path: "/admin/results-table",
		component: AdminResultsTable,
	},
	{
		path: "/admin/results-table-house",
		component: AdminResultsTableHouse,
	},
	{
		path: "/admin/create-agent",
		component: CreateAgent,
	},
	{
		path: "/admin/agents",
		component: AdminAgents,
	},
];

export default routes;
