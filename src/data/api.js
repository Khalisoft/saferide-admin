import { httpGet, httpPost } from "./http";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reports } from "./../utils/data";

export const signinAgentApi = async (data) => {
	return await httpPost({ path: `authentication/signin-agent`, payload: data });
};
export const signinAdminApi = async (data) => {
	return await httpPost({ path: `authentication/signin-admin`, payload: data });
};
// export const signinApi = async (data) => {
// 	return await httpPost({ path: `admin/auth/login`, payload: data });
// };
// export const signinApi = async (data) => {
// 	return await httpPost({ path: `admin/auth/login`, payload: data });
// };
// export const getWorkers = async (status, category, member) => {
// 	return await httpGet({
// 		path: `admin/workers?member=${member}&category=${category}&status=${status}`,
// 	});
// };
// export const getWorkerDetails = async (id) => {
// 	return await httpGet({
// 		path: `admin/workers/${id}`,
// 	});
// };

// React Query APIs
export const getReportsApi = async (role) => {
	return await httpGet({ path: `reports/${role === "admin" ? "all" : role}` });
};
export const getResultsApi = async (role) => {
	return await httpGet({ path: `results/${role === "admin" ? "all" : role}` });
};
export const getSubmittedPusApi = async (role) => {
	return await httpGet({ path: `authentication/get-submitted-pus` });
};
export const getAgentsApi = async (role) => {
	return await httpGet({ path: `authentication/get-agents` });
};
export const sendReportsApi = async (data) => {
	return await httpPost({ path: `reports/send`, payload: data });
};
export const sendResultsApi = async (data) => {
	return await httpPost({ path: `results/send`, payload: data });
};
export const createAgentApi = async (data) => {
	return await httpPost({
		path: `authentication/register-agent`,
		payload: data,
	});
};

// React Queries

export const useReports = (role) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["agent-reports"],
		queryFn: async () => await getReportsApi(role),
	});
	return { data, isLoading, isError };
};

export const useResults = (role) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["agent-results"],
		queryFn: async () => await getResultsApi(role),
	});
	return { data, isLoading, isError };
};
export const useAllResults = (role) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["all-results"],
		queryFn: async () => await getResultsApi(role),
	});
	return { data, isLoading, isError };
};
export const useSubmittedPus = (role) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["submitted-pus"],
		queryFn: async () => await getSubmittedPusApi(role),
	});
	return { data, isLoading, isError };
};
export const useAgents = (role) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["all-agents"],
		queryFn: async () => await getAgentsApi(role),
	});
	return { data, isLoading, isError };
};
// export const sendReportMutation = () => {
// 	const { data, isLoading, isError } = useMutation({
// 		mutationFn: (data) => sendReportsApi(data),
// 		// queryKey: ["agent-results"],
// 		// queryFn: async () => await getResultsApi(),
// 	});

// 	return { data, isLoading, isError };
// };
// const queryClient = useQueryClient();
// export const sendReportMutation = () => {
// 	return useMutation({
// 		mutationFn: (data) => sendReportsApi(data),
// 		onSuccess: () => {
// 			queryClient.invalidateQueries(["agent-reports"]);
// 		},
// 		// queryKey: ["agent-results"],
// 		// queryFn: async () => await getResultsApi(),
// 	});
// };
