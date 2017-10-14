(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

// At their most basic, promises are a bit like event listeners except:

// A promise can only succeed or fail once. It cannot succeed or fail twice, neither can it switch from success to failure or vice versa.

// If a promise has succeeded or failed and you later add a success/failure callback, the correct callback will be called, even though the event took place earlier.

// This is extremely useful for async success/failure, because you're less interested in the exact time something became available, and more interested in reacting to the outcome.

var dom = require("./dom.js");

var dinosaurs = [];

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



var firstDinoJSON = function() {
	return new Promise(function(resolve, reject) {
		$.ajax('./db/dinosaurs.json').done(function(data1) {
			resolve(data1.dinosaurs1);
		}).fail(function(error1) {
			reject(error1);
		});
	});
};
	
var secondDinoJSON = function() {
	return new Promise(function(resolve, reject) {
		$.ajax('./db/dinosaurs2.json').done(function(data2) {
			resolve(data2.dinosaurs2);
		}).fail(function(error2) {
			reject(error2);
		});
	});
};

var thirdDinoJSON = function() {
	return new Promise(function(resolve, reject) {
		$.ajax('./db/dinosaurs3.json').done(function(data3) {
			resolve(data3.dinosaurs3);
		}).fail(function(error3) {
			reject(error3);
		});
	});
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

var dinoGetter = function(){
	Promise.all([firstDinoJSON(), secondDinoJSON(), thirdDinoJSON()]).then(function(results){
		console.log("results from promise.all", results);
		results.forEach(function(result){
			result.forEach(function(dino){
				dinosaurs.push(dino);
			});
		});
		makeDinos();
	}).catch(function(error){
		console.log("error from Promise.all", error);
	});
};

var makeDinos = function(){
	dinosaurs.forEach(function(dino){
		dom(dino);
	});
};


var initializer = function(){
	dinoGetter();
};

var getDinosaurs = function(){
	return dinosaurs;
};

module.exports = {initializer: initializer, getDinosaurs: getDinosaurs};
},{"./dom.js":2}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
"use strict";

const data = require("./data.js");

$(document).ready(function() {
	data.initializer();
});

},{"./data.js":1}]},{},[3]);
