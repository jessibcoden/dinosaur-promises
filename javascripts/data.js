"use strict";

// At their most basic, promises are a bit like event listeners except:

// A promise can only succeed or fail once. It cannot succeed or fail twice, neither can it switch from success to failure or vice versa.

// If a promise has succeeded or failed and you later add a success/failure callback, the correct callback will be called, even though the event took place earlier.

// This is extremely useful for async success/failure, because you're less interested in the exact time something became available, and more interested in reacting to the outcome.

const dom = require("./dom.js");

let dinosaurs = [];

// THE OLD WAY - aka PYRAMID OF DOOM! :
// let dinoGetter = () => {
// 	$.ajax("./db/dinosaurs.json").done((data1) {
// 		console.log("data1", data1);
// 		data1.dinosaurs1.forEach((dino) {
// 			dinosaurs.push(dino);
// 		});

// 		$.ajax("./db/dinosaurs2.json").done((data2) {
// 		console.log("data1", data1);
// 		data2.dinosaurs2.forEach((dino) {
// 			dinosaurs.push(dino);
// 			});

// 			$.ajax("./db/dinosaurs3.json").done((data3) {
// 			console.log("data3", data3);
// 			data3.dinosaurs3.forEach((dino) {
// 				dinosaurs.push(dino);
// 				});

// 			console.log("dinosaurs", dinosaurs);
// 			});
// 		});
// 	});
// };



const firstDinoJSON = () => {
	return new Promise(resolve, reject) {
		$.ajax('./db/dinosaurs.json').done(data1) {
			resolve(data1.dinosaurs1);
		}.fail(error1) {
			reject(error1);
		};
	};
};
	
const secondDinoJSON = () => {
	return new Promise(resolve, reject) {
		$.ajax('./db/dinosaurs2.json').done(data2) {
			resolve(data2.dinosaurs2);
		}.fail(error2) {
			reject(error2);
		};
	};
};

const thirdDinoJSON = () => {
	return new Promise(resolve, reject) {
		$.ajax('./db/dinosaurs3.json').done(data3) {
			resolve(data3.dinosaurs3);
		}.fail(error3) {
			reject(error3);
		};
	};
};

// PROMISE WORKS - promise pyramid of doom!

// var dinoGetter = function() {
// 	firstDinoJSON().then(function(results) {
// 		results.forEach(function(dino){
// 			dinosaurs.push(dino);
// 		});
	
// 		secondDinoJSON().then(function(results2){
// 			results2.forEach(function(dino){
// 				dinosaurs.push(dino);
// 			});

// 			thirdDinoJSON().then(function(results3){
// 			results3.forEach(function(dino){
// 				dinosaurs.push(dino);
// 			});

// 			console.log("results from dino1", dinosaurs);
// 		});
// 	});

// 	}).catch(function(error) {
// 		console.log("error from dino1", error);
// 	});
// };


// PROMISE - the correct way to be used MOST OF THE TIME when solving two or less promises

// var dinoGetter = function(){
// 	firstDinoJSON().then(function(results) {
// 		results.forEach(function(dino){
// 			dinosaurs.push(dino);
// 		});
// 		return secondDinoJSON();
// 	}).then(function(results2){
// 		results2.forEach(function(dino){
// 			dinosaurs.push(dino);
// 		});	
// 		return thirdDinoJSON();	
// 	}).then(function(results3){
// 		results3.forEach(function(dino){
// 			dinosaurs.push(dino);
// 		});
// 		console.log("dinosaurs", dinosaurs);
// 		makeDinos();
// 	});
// };


// PROMISE - this is a rare case - 2 or more promises that are the same

const dinoGetter = () => {
	Promise.all([firstDinoJSON(), secondDinoJSON(), thirdDinoJSON()]).then(results){
		console.log("results from promise.all", results);
		results.forEach(result){
			result.forEach(dino){
				dinosaurs.push(dino);
			};
		};
		makeDinos();
	}.catch(error){
		console.log("error from Promise.all", error);
	};
};

const makeDinos = () => {
	dinosaurs.forEach(dino){
		dom(dino);
	};
};


const initializer = () => {
	dinoGetter();
};

const getDinosaurs = () => {
	return dinosaurs;
};

module.exports = {initializer: initializer, getDinosaurs: getDinosaurs};