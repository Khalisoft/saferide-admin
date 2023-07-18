/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
	// {
	// 	path: "/app/dashboard", // the url
	// 	icon: "HomeIcon", // the component being exported from icons/index.js
	// 	name: "Dashboard", // name that appear in Sidebar
	// },
	// {
	//   path: '/app/dashboard', // the url
	//   icon: 'HomeIcon', // the component being exported from icons/index.js
	//   name: 'Dashboard', // name that appear in Sidebar
	// },
	{
		path: "/app/agent/dashboard",
		icon: "HomeIcon",
		name: "Dashboard",
	},
	{
		path: "/app/agent/reports/list",
		icon: "ReportIcon",
		name: "Reports",
	},
	{
		path: "/app/agent/results/list",
		icon: "ResultIcon",
		name: "Results",
	},
	// {
	// 	path: "/app/agent/analytics",
	// 	icon: "ReportIcon",
	// 	name: "Analytics",
	// },
	// {
	// 	path: "/app/agent/settings",
	// 	icon: "OutlineCogIcon",
	// 	name: "Settings",
	// },

	// {
	// 	path: "/app/admin/dashboard",
	// 	icon: "HomeIcon",
	// 	name: "Admin Dashboard",
	// },
	// {
	//   path: '/app/cards',
	//   icon: 'CardsIcon',
	//   name: 'Cards',
	// },
	// {
	//   path: '/app/charts',
	//   icon: 'ChartsIcon',
	//   name: 'Charts',
	// },
	// {
	//   path: '/app/buttons',
	//   icon: 'ButtonsIcon',
	//   name: 'Buttons',
	// },
	// {
	//   path: '/app/modals',
	//   icon: 'ModalsIcon',
	//   name: 'Modals',
	// },
	// {
	//   path: '/app/tables',
	//   icon: 'TablesIcon',
	//   name: 'Tables',
	// },
	// {
	//   icon: 'PagesIcon',
	//   name: 'Pages',
	//   routes: [
	//     // submenu
	//     {
	//       path: '/login',
	//       name: 'Login',
	//     },
	//     {
	//       path: '/create-account',
	//       name: 'Create account',
	//     },
	//     {
	//       path: '/forgot-password',
	//       name: 'Forgot password',
	//     },
	//     {
	//       path: '/app/404',
	//       name: '404',
	//     },
	//     {
	//       path: '/app/blank',
	//       name: 'Blank',
	//     },
	//   ],
	// },
];
export const adminRoutes = [
	// {
	// 	path: "/app/dashboard", // the url
	// 	icon: "HomeIcon", // the component being exported from icons/index.js
	// 	name: "Dashboard", // name that appear in Sidebar
	// },
	// {
	//   path: '/app/dashboard', // the url
	//   icon: 'HomeIcon', // the component being exported from icons/index.js
	//   name: 'Dashboard', // name that appear in Sidebar
	// },
	// {
	// 	path: "/app/agent/dashboard",
	// 	icon: "HomeIcon",
	// 	name: "Dashboard",
	// },
	// {
	// 	path: "/app/agent/reports/list",
	// 	icon: "HomeIcon",
	// 	name: "Reports",
	// },
	// {
	// 	path: "/app/agent/results/list",
	// 	icon: "HomeIcon",
	// 	name: "Results",
	// },
	{
		path: "/app/admin/dashboard",
		icon: "HomeIcon",
		name: "Admin Dashboard",
	},
	// {
	// 	path: "/app/admin/reports",
	// 	icon: "ReportIcon",
	// 	name: "Reports",
	// },
	{
		path: "/app/admin/results",
		icon: "ResultIcon",
		name: "All Results",
	},
	// {
	// 	path: "/app/admin/results-lga",
	// 	icon: "ResultIcon",
	// 	name: "Results by LGA",
	// },
	{
		path: "/app/admin/results-table",
		icon: "ResultIcon",
		name: "Results Table (guber)",
	},
	{
		path: "/app/admin/results-table-house",
		icon: "ResultIcon",
		name: "Results Table (house)",
	},
	{
		path: "/app/admin/agents",
		icon: "PeopleIcon",
		name: "Agents",
	},
	// {
	// 	path: "/app/admin/dashboard",
	// 	icon: "HomeIcon",
	// 	name: "Admin Dashboard",
	// },
	// {
	//   path: '/app/cards',
	//   icon: 'CardsIcon',
	//   name: 'Cards',
	// },
	// {
	//   path: '/app/charts',
	//   icon: 'ChartsIcon',
	//   name: 'Charts',
	// },
	// {
	//   path: '/app/buttons',
	//   icon: 'ButtonsIcon',
	//   name: 'Buttons',
	// },
	// {
	//   path: '/app/modals',
	//   icon: 'ModalsIcon',
	//   name: 'Modals',
	// },
	// {
	//   path: '/app/tables',
	//   icon: 'TablesIcon',
	//   name: 'Tables',
	// },
	// {
	//   icon: 'PagesIcon',
	//   name: 'Pages',
	//   routes: [
	//     // submenu
	//     {
	//       path: '/login',
	//       name: 'Login',
	//     },
	//     {
	//       path: '/create-account',
	//       name: 'Create account',
	//     },
	//     {
	//       path: '/forgot-password',
	//       name: 'Forgot password',
	//     },
	//     {
	//       path: '/app/404',
	//       name: '404',
	//     },
	//     {
	//       path: '/app/blank',
	//       name: 'Blank',
	//     },
	//   ],
	// },
];

export default routes;
