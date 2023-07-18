import React, { useContext, Suspense, useEffect, lazy } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import routes from "../routes";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Main from "../containers/Main";
import ThemedSuspense from "../components/ThemedSuspense";
import { SidebarContext } from "../context/SidebarContext";
import { AuthProvider } from "../context/AuthContext";
import AnalyticsBar from "./../components/Sidebar/AnalyticsBar";
import { ROLE, TOKEN } from "./../data/constants";

const Page404 = lazy(() => import("../pages/404"));

function Layout() {
	const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
	let location = useLocation();

	const role = JSON.parse(localStorage.getItem(ROLE));
	useEffect(() => {
		closeSidebar();
	}, [location]);

	return (
		<AuthProvider>
			<div
				className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
					isSidebarOpen && "overflow-hidden"
				}`}
			>
				<Sidebar />

				<div className="flex flex-col flex-1 w-full">
					<Header />
					<Main>
						<Suspense fallback={<ThemedSuspense />}>
							<Switch>
								{routes.map((route, i) => {
									return route.component ? (
										<Route
											key={i}
											exact={true}
											path={`/app${route.path}`}
											render={(props) => <route.component {...props} />}
										/>
									) : null;
								})}
								<Redirect exact from="/app" to={`/app/${role}/dashboard`} />
								<Route component={Page404} />
							</Switch>
						</Suspense>
					</Main>
					{/* <AnalyticsBar /> */}
				</div>
			</div>
		</AuthProvider>
	);
}

export default Layout;
