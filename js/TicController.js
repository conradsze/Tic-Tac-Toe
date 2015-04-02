angular
	.module('ticApp')
	.controller("TicController", TodosController);

// TicController.$inject = ['$firebaseArray'];

function TodosController() {
	self = this;
	self.box = [];
	self.nextmove = "x";
	self.movecount = 0;
	self.click = click;
	self.getwinner=getwinner;


	for (var i = 0; i < 9; i++) {
		self.box.push({
			text: "", value: Math.pow(2,i)
		})
	};

	function click(t) {
		index = self.box.indexOf(t);
		if (self.box[index].text== "") {
		self.box[index].text = self.nextmove;
		self.movecount++
		self.getwinner()
		if (self.nextmove == "x") {
			self.nextmove = "o"
		} else {
			self.nextmove = "x"
		};
		};


	}

	function getwinner(){

		if ((self.box[0].text!="" && self.box[0].text==self.box[1].text && self.box[1].text==self.box[2].text)||
			(self.box[0].text!="" && self.box[0].text==self.box[3].text && self.box[3].text==self.box[6].text)||
			(self.box[0].text!="" && self.box[0].text==self.box[4].text && self.box[4].text==self.box[8].text)||
			(self.box[1].text!="" && self.box[1].text==self.box[4].text && self.box[4].text==self.box[7].text)||
			(self.box[2].text!="" && self.box[2].text==self.box[4].text && self.box[4].text==self.box[6].text)||
			(self.box[2].text!="" && self.box[2].text==self.box[5].text && self.box[5].text==self.box[8].text)||
			(self.box[3].text!="" && self.box[3].text==self.box[4].text && self.box[4].text==self.box[5].text)||
			(self.box[6].text!="" && self.box[6].text==self.box[7].text && self.box[7].text==self.box[8].text)
			){

			alert(self.nextmove+" win!")
;
		}
		else if(self.movecount==9){
			setTimeout(function() {

			alert("tie")

		}, 0);
		}
	

	}



};