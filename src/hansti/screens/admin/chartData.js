import { lgas, parties } from "./../../../utils/data";
export const getTotals = (results) => {
	// console.log(results.data);
	let allResults = [];
	let allPartyVotes = [];
	let allLGAVotes = [];
	let allPartyGuberVotes = [];
	let allPartyHouseVotes = [];
	let guber = [];
	let house = [];

	//
	// for (let index = 0; index < lgas.length; index++) {
	// 	const lga = lgas[index];
	// 	let currentLG = [];
	// 	for (let index = 0; index < results?.data.length; index++) {
	// 		const element = results?.data[index];
	// 		if (element.lga === lga.name) {
	// 			currentLG = [...currentLG, element];
	// 		}
	// 	}
	// 	console.log("current >> ", { lga: lga.name, results: currentLG });
	// }

	//
	for (let index = 0; index < results?.data?.length; index++) {
		const element = results?.data[index];
		allResults = [...allResults, ...element?.parties];
	}
	for (let index = 0; index < results?.data?.length; index++) {
		const element = results?.data[index];
		if (element.lga) {
		}
		// allResults = [...allResults, ...element?];
	}
	// console.log(allResults);
	// check type here
	for (let index = 0; index < allResults.length; index++) {
		const element = allResults[index];
		if (element?.type === "Gubernatorial") {
			guber = [...guber, element];
		}
		if (element?.type === "House of Assembly") {
			house = [...house, element];
		}
	}
	// console.log(guber.length);
	// console.log(house.length);
	// console.log(guber);
	// console.log(house);
	// check LGA here
	for (let index = 0; index < lgas.length; index++) {
		const lga = lgas[index];
		let currentLGAVotes = [];
		for (let index = 0; index < guber.length; index++) {
			const result = guber[index];
			if (result?.lga === lga?.name) {
				currentLGAVotes = [...currentLGAVotes, result];
			}
		}
		let sum = 0;
		for (let index = 0; index < currentLGAVotes.length; index++) {
			const element = currentLGAVotes[index];
			sum += +element?.votes;
		}

		// console.log({
		// 	lga: lga.name,
		// 	length: currentLGAVotes.length,
		// 	votes: currentLGAVotes,
		// 	total: sum,
		// });
		// return;
		// allPartyGuberVotes = [
		// 	...allPartyGuberVotes,
		// 	{
		// 		party: party.name,
		// 		length: currentPartyVotes.length,
		// 		votes: currentPartyVotes,
		// 		total: sum,
		// 	},
		// ];
		// allPartyVotes = [
		// 	...allPartyVotes,
		// 	{
		// 		party: party.name,
		// 		length: currentPartyVotes.length,
		// 		votes: currentPartyVotes,
		// 		total: sum,
		// 	},
		// ];
	}
	for (let index = 0; index < parties.length; index++) {
		const party = parties[index];
		let currentPartyVotes = [];
		for (let index = 0; index < guber.length; index++) {
			const result = guber[index];
			if (result?.name === party?.name) {
				currentPartyVotes = [...currentPartyVotes, result];
			}
		}
		let sum = 0;
		for (let index = 0; index < currentPartyVotes.length; index++) {
			const element = currentPartyVotes[index];
			// sum += +element?.votes;
			// if (element.votes) {

			// }
			sum += +element.votes ? +element?.votes : 0;
		}
		// console.log({
		// 	party: party.name,
		// 	length: currentPartyVotes.length,
		// 	votes: currentPartyVotes,
		// 	total: sum,
		// });
		// return;
		allPartyGuberVotes = [
			...allPartyGuberVotes,
			{
				party: party.name,
				length: currentPartyVotes.length,
				votes: currentPartyVotes,
				total: sum,
			},
		];
		allPartyVotes = [
			...allPartyVotes,
			{
				party: party.name,
				length: currentPartyVotes.length,
				votes: currentPartyVotes,
				total: sum,
			},
		];
		console.log(allPartyVotes);
	}
	for (let index = 0; index < parties.length; index++) {
		const party = parties[index];
		let currentPartyVotes = [];
		for (let index = 0; index < house.length; index++) {
			const result = house[index];
			if (result?.name === party?.name) {
				currentPartyVotes = [...currentPartyVotes, result];
			}
		}
		let sum = 0;
		for (let index = 0; index < currentPartyVotes.length; index++) {
			const element = currentPartyVotes[index];
			// if (condition) {

			// }
			sum += element.votes ? +element?.votes : 0;
		}
		// console.log({
		// 	party: party.name,
		// 	length: currentPartyVotes.length,
		// 	votes: currentPartyVotes,
		// 	total: sum,
		// });
		// return;
		allPartyHouseVotes = [
			...allPartyHouseVotes,
			{
				party: party.name,
				length: currentPartyVotes.length,
				votes: currentPartyVotes,
				total: sum,
			},
		];
		allPartyVotes = [
			...allPartyVotes,
			{
				party: party.name,
				length: currentPartyVotes.length,
				votes: currentPartyVotes,
				total: sum,
			},
		];
	}

	// console.log(allPartyVotes);
	return {
		allResults: allResults,
		allPartyVotes: allPartyVotes,
		allPartyHouseVotes: allPartyHouseVotes,
		allPartyGuberVotes: allPartyGuberVotes,
	};
};
