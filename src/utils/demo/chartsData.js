export const doughnutLegends = [
	{ title: "APC", color: "bg-teal-600" },
	{ title: "PDP", color: "bg-red-600" },
	{ title: "NNPP", color: "bg-purple-600" },
	{ title: "PRP", color: "bg-blue-500" },
	{ title: "Others", color: "bg-red-300" },
];

export const lineLegends = [
	{ title: "APC", color: "bg-teal-600" },
	{ title: "PDP", color: "bg-red-600" },
	{ title: "NNPP", color: "bg-purple-600" },
	{ title: "PRP", color: "bg-blue-500" },
	{ title: "Others", color: "bg-red-300" },
];

export const barLegends = [
	{ title: "APC", color: "bg-teal-600" },
	{ title: "PDP", color: "bg-red-600" },
	{ title: "NNPP", color: "bg-purple-600" },
	{ title: "PRP", color: "bg-blue-500" },
	{ title: "Others", color: "bg-red-300" },
];

export const doughnutOptions = {
	data: {
		datasets: [
			{
				data: [70, 10, 10, 10, 5],
				/**
				 * These colors come from Tailwind CSS palette
				 * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
				 */
				backgroundColor: [
					"#0694a2",
					"#1c64f2",
					"#7e3af2",
					"#E02424",
					"#E05645",
				],
				label: "Dataset 1",
			},
		],
		labels: ["APC", "PDP", "NNPP", "PRP", "Others"],
	},
	options: {
		responsive: true,
		cutoutPercentage: 80,
	},
	legend: {
		display: false,
	},
};

export const lineOptions = {
	data: {
		labels: ["Daura", "Baure", "Mashi", "Mani", "Zango", "Maiadua", "Kankia"],
		datasets: [
			{
				label: "APC",
				backgroundColor: "#0694a2",
				// borderColor: window.chartColors.red,
				borderWidth: 1,
				data: [-3, 14, 52, 74, 33, 90, 70],
			},
			{
				label: "PDP",
				backgroundColor: "#1c64f2",
				// borderColor: window.chartColors.blue,
				borderWidth: 1,
				data: [66, 33, 43, 12, 54, 62, 84],
			},
			{
				label: "NNPP",
				backgroundColor: "#7e3af2",
				// borderColor: window.chartColors.blue,
				borderWidth: 1,
				data: [66, 33, 43, 12, 54, 62, 84],
			},
			{
				label: "PRP",
				backgroundColor: "#E02424",
				// borderColor: window.chartColors.blue,
				borderWidth: 1,
				data: [10, 5, 5, 12, 4, 2, 84],
			},
		],
	},
	options: {
		responsive: true,
		tooltips: {
			mode: "index",
			intersect: false,
		},
		hover: {
			mode: "nearest",
			intersect: true,
		},
		scales: {
			x: {
				display: true,
				scaleLabel: {
					display: true,
					labelString: "Month",
				},
			},
			y: {
				display: true,
				scaleLabel: {
					display: true,
					labelString: "Value",
				},
			},
		},
	},
	legend: {
		display: false,
	},
};

export const barOptions = {
	data: {
		labels: ["Daura", "Baure", "Mashi", "Mani", "Zango", "Maiadua", "Kankia"],
		datasets: [
			{
				label: "APC",
				backgroundColor: "#0694a2",
				// borderColor: window.chartColors.red,
				borderWidth: 1,
				data: [-3, 14, 52, 74, 33, 90, 70],
			},
			{
				label: "PDP",
				backgroundColor: "#1c64f2",
				// borderColor: window.chartColors.blue,
				borderWidth: 1,
				data: [66, 33, 43, 12, 54, 62, 84],
			},
			{
				label: "NNPP",
				backgroundColor: "#7e3af2",
				// borderColor: window.chartColors.blue,
				borderWidth: 1,
				data: [66, 33, 43, 12, 54, 62, 84],
			},
			{
				label: "PRP",
				backgroundColor: "#E02424",
				// borderColor: window.chartColors.blue,
				borderWidth: 1,
				data: [10, 5, 5, 12, 4, 2, 84],
			},
		],
	},
	options: {
		responsive: true,
	},
	legend: {
		display: false,
	},
};
