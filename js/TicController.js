angular
	.module('ticApp')
	.controller("TicController", TodosController);

// TicController.$inject = ['$firebaseArray'];

function TodosController() {
	self = this;
	self.box = [];
	self.nextmove = "x";
	self.click = click;

	for (var i = 0; i < 9; i++) {
		self.box.push({
			text: ""
		})
	};

	function click(t) {
		index = self.box.indexOf(t);
		self.box[index].text = self.nextmove;
		if (self.nextmove == "x") {
			self.nextmove = "o"
		} else {
			self.nextmove = "x"
		};

	}



};