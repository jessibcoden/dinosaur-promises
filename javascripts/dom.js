"use strict";

let outputDiv = $('#dinosaur');

const domString = (dinosaur) => {
	let dinoString = '';
	// for(let i = 0; i < dinosaur.length; i++) {
		dinoString += `<div class=${dinosaur.info === 'Carnivore' ? 'card-bad' : 'card-good'}>
						 <h1>${dinosaur.type}</h1>
						 <h4>${dinosaur.bio}</h4>`;
		if (dinosaur.info === 'Carnivore'){
			dinoString += `<h4>Has some tasty snacks.</h4>`;
		} else {
			dinoString += `<h4>Has some furry friends.</h4>`;
		}
		dinoString += `<div class="card-holder">`;
		dinosaur.snacks.forEach((cat) => {
			dinoString += `<div class="card">
						   <h5>${cat.name}</h5>
							   <div class="card-img">
							   	<img src=${cat.imageUrl}>
							   </div>
						   <p class="card-description">${cat.specialSkill}</p>
						   </div>`;
		});
		dinoString += 	`</div>`;
		dinoString +=  `</div>`;
	// };

	printToDom(dinoString);
};

const printToDom = (strang) => {
	console.log("strang", strang);
	outputDiv.append(strang);
};

module.exports = domString;