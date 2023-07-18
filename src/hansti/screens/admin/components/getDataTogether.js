// const getLG = (LG) => {
// 	const lg = results?.data?.filter((result) => result.lga === LG);

// 	let allResults = []; //get all parties for this LG
// 	for (let index = 0; index < lg?.length; index++) {
// 		const element = lg[index];
// 		allResults = [...allResults, ...element?.parties];
// 	}
// 	let guber = allResults?.filter((res) => res.type === "Gubernatorial"); //get guber votes
// 	let house = allResults?.filter((res) => res.type === "House of Assembly"); //get house of assembly votes
// 	console.log(" Guber >>", guber);

// 	let guberSum = 0;
// 	let houseSum = 0;

// 	for (let index = 0; index < guber?.length; index++) {
// 		const element = guber[index];
// 		guberSum += +element?.votes ? +element?.votes : 0;
// 	}
// 	for (let index = 0; index < house?.length; index++) {
// 		const element = house[index];
// 		houseSum += +element?.votes ? +element?.votes : 0;
// 	}
// 	// console.log(" Guber >>", guberSum);
// 	// console.log(" House >>", houseSum);

// 	const getPartySum = (party) => {
// 		let partySum = 0;
// 		for (let index = 0; index < guber?.length; index++) {
// 			const element = guber[index];
// 			if (element?.name === party) {
// 				if (element?.votes) {
// 					partySum = partySum + +element?.votes;
// 				}
// 			}
// 		}
// 		return partySum;
// 	};

// 	// console.log(" House >>", house?.length);
// 	// console.log(allResults?.length);
// 	return {
// 		APC: getPartySum("APC"),
// 		PDP: getPartySum("PDP"),
// 		NNPP: getPartySum("NNPC"),
// 		PRP: getPartySum("PRP"),
// 		Others: getPartySum("Others"),
// 	};
// };
