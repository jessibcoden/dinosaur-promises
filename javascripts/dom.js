"use strict";


let outputDiv = $('#dinosaur');

const domString = (dinosaur) => {
	let dinoString = '';
	// for(let i = 0; i < dinosaur.length; i++) {
		dinoString += `<div>
						 <h1>${dinosaur.type}</h1>
					   </div>`;
	// };

	printToDom(dinoString);
};

const printToDom = (strang) => {
	outputDiv.append(strang);
};

module.exports = domString;