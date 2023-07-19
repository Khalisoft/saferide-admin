import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import ImageLight from "../assets/img/logo-lockup-light.png";
import ImageDark from "../assets/img/logo-lockup-dark.png";
import { GithubIcon, TwitterIcon } from "../icons";
import { Label, Input, Button } from "@windmill/react-ui";
import { AuthContext } from "./../context/AuthContext";
import { LoginContext } from "./../context/LoginContext";
import { useAuth } from "../data/store";
import { hideLoader, showLoader } from "./../utils/loader";
import { toast } from "react-hot-toast";

function Login() {
	const { login } = useContext(LoginContext);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");

	const { getAgentSignin, getAdminSignin } = useAuth((state) => state);
	const signinFn = async () => {
		showLoader("Signing in...");
		const data = {
			phone_number: phoneNumber,
			password: password,
		};

		if (phoneNumber.includes("admin")) {
			//admin signin
			const res = await getAdminSignin(data);
			if (res?.success) {
				hideLoader();
				toast.success(`${"Signed in successfully..."}`);
				login(res?.data?.role);
			} else {
				toast.error(`${res?.error}`);
				hideLoader();
			}
		} else {
			const res = await getAgentSignin(data);
			if (res?.success) {
				hideLoader();
				toast.success(`${"Signed in successfully..."}`);
				login(res?.data?.role);
			} else {
				toast.error(`${res?.error}`);
				hideLoader();
			}
		}
		// const res = await getAgentSignin(data);
		// if (res?.success) {
		// 	hideLoader();
		// 	toast.success(`${"Signed in successfully..."}`);
		// 	login(res?.data?.role);
		// } else {
		// 	toast.error(`${res?.error}`);
		// 	hideLoader();
		// }
	};
	return (
		<div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
			<div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
				<div className="flex flex-col justify-center items-center overflow-y-auto md:flex-row">
					{/* <Label className="absolute text-center">
						Election Monitoring System
					</Label> */}
					<div className=" md:w-1/2">
						<img
							aria-hidden="true"
							className="w-full dark:hidden"
							src={ImageLight}
							alt="Office"
						/>
						<img
							aria-hidden="true"
							className="hidden w-full dark:block"
							src={ImageDark}
							alt="Office"
						/>
					</div>
					<main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
						<div className="w-full">
							<h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
								Login
							</h1>
							<Label>
								<span>Username / Phone Number</span>
								<Input
									className="mt-1"
									type="email"
									placeholder="john@doe.com"
									onChange={(e) => setPhoneNumber(e.target.value)}
								/>
							</Label>

							<Label className="mt-4">
								<span>Password</span>
								<Input
									className="mt-1"
									type="password"
									placeholder="***************"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Label>

							<Button
								className="mt-4 bg-primary"
								block
								// tag={Link} to="/app"
								onClick={() => signinFn()}
							>
								Log in
							</Button>

							{/* <hr className="my-8" /> */}

							{/* <Button block layout="outline">
								<GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
								Github
							</Button>
							<Button className="mt-4" block layout="outline">
								<TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
								Twitter
							</Button> */}

							{/* <p className="mt-4">
								<Link
									className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
									to="/forgot-password"
								>
									Forgot your password?
								</Link>
							</p>
							<p className="mt-1">
								<Link
									className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
									to="/create-account"
								>
									Create account
								</Link>
							</p> */}
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}

export default Login;
