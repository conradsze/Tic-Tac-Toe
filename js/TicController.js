angular
	.module('ticApp')
	.controller("TicController", TicController);

TicController.$inject = ['$firebaseObject'];



function TicController($firebaseObject) {
	self = this;
	self.turns;
	self.game = syncGameWithFirebase()
	self.click = click;
	self.getwinner = getwinner;
	self.resetScore = resetScore;
	self.restart = restart;
	self.message_true = "";
	self.message_false = "";
	self.you;
	self.randomMove = randomMove;



	function syncGameWithFirebase() {
		var ref = new Firebase('https://conradstictactoe.firebaseio.com/');
		var gameObject = $firebaseObject(ref);

		//initialize values in the gameObject once it's loaded
		gameObject.$loaded(function() {

			gameObject.first;
			self.turns = gameObject.first;
			gameObject.first = !gameObject.first;
			gameObject.score = -1;
			gameObject.box = [];
			gameObject.nextmove = "x";
			gameObject.movecount = 0;
			gameObject.gameover = false;
			gameObject.winner = "";
			gameObject.xscore;
			gameObject.oscore;
			gameObject.go = true;
			gameObject.hidebox=Math.floor(Math.random() * 9);
			gameObject.hidden_message = "";


			for (var i = 0; i < 9; i++) {
				gameObject.box.push({
					text: "",
				})
			};

			if (self.turns) {
				self.you = "x"
				self.message_true = "You are player X, it's your turn now"
				self.message_false = "You are player X, waiting for your opponent"
			} else {
				self.you = "o"
				self.message_true = "You are player O, waiting for your opponent"
				self.message_false = "You are player O, it's your turn now"
			}


			gameObject.$save();
		});

		return gameObject;
	}



	function click(t) {
		index = self.game.box.indexOf(t);
		if ((self.game.box[index].text == "") && (self.game.gameover == false) && (self.game.nextmove == self.you)) {
			self.game.box[index].text = self.game.nextmove;
			self.game.movecount++
					if (index==self.game.hidebox) {
				self.randomMove()
			}
				self.getwinner();
			self.game.go = !self.game.go
			if (self.game.nextmove == "x") {
				self.game.nextmove = "o"
			} else {
				self.game.nextmove = "x"
			};
		};

		self.game.$save();

	}

	function getwinner() {

		var xwin=((self.game.box[0].text == "x" && self.game.box[0].text == self.game.box[1].text && self.game.box[1].text == self.game.box[2].text) ||
			(self.game.box[0].text == "x" && self.game.box[0].text == self.game.box[3].text && self.game.box[3].text == self.game.box[6].text) ||
			(self.game.box[0].text == "x" && self.game.box[0].text == self.game.box[4].text && self.game.box[4].text == self.game.box[8].text) ||
			(self.game.box[1].text == "x" && self.game.box[1].text == self.game.box[4].text && self.game.box[4].text == self.game.box[7].text) ||
			(self.game.box[2].text == "x" && self.game.box[2].text == self.game.box[4].text && self.game.box[4].text == self.game.box[6].text) ||
			(self.game.box[2].text == "x" && self.game.box[2].text == self.game.box[5].text && self.game.box[5].text == self.game.box[8].text) ||
			(self.game.box[3].text == "x" && self.game.box[3].text == self.game.box[4].text && self.game.box[4].text == self.game.box[5].text) ||
			(self.game.box[6].text == "x" && self.game.box[6].text == self.game.box[7].text && self.game.box[7].text == self.game.box[8].text)
		);

		var owin=((self.game.box[0].text =="o" && self.game.box[0].text == self.game.box[1].text && self.game.box[1].text == self.game.box[2].text) ||
			(self.game.box[0].text =="o" && self.game.box[0].text == self.game.box[3].text && self.game.box[3].text == self.game.box[6].text) ||
			(self.game.box[0].text =="o" && self.game.box[0].text == self.game.box[4].text && self.game.box[4].text == self.game.box[8].text) ||
			(self.game.box[1].text =="o" && self.game.box[1].text == self.game.box[4].text && self.game.box[4].text == self.game.box[7].text) ||
			(self.game.box[2].text =="o" && self.game.box[2].text == self.game.box[4].text && self.game.box[4].text == self.game.box[6].text) ||
			(self.game.box[2].text =="o" && self.game.box[2].text == self.game.box[5].text && self.game.box[5].text == self.game.box[8].text) ||
			(self.game.box[3].text =="o" && self.game.box[3].text == self.game.box[4].text && self.game.box[4].text == self.game.box[5].text) ||
			(self.game.box[6].text =="o" && self.game.box[6].text == self.game.box[7].text && self.game.box[7].text == self.game.box[8].text)
		);

		if (xwin&&owin){
	self.game.gameover = true;

			self.game.winner = "tie"

}



		else if (xwin) {

			self.game.gameover = true;

			self.game.winner = "x wins!";
			
				self.game.xscore++
			

		} 

		else if (owin) {

			self.game.gameover = true;

			self.game.winner = "o wins!";

				self.game.oscore++
			}

		else if (self.game.movecount == 9) {

			self.game.gameover = true;

			self.game.winner = "tie"

		}


	}

	function restart() {
		for (var i = 0; i < 9; i++) {
			self.game.box[i].text = ""
		};
		self.game.gameover = false;
		self.game.movecount = 0;
		self.game.nextmove = "x";
		self.game.go = true;
		self.game.hidebox=Math.floor(Math.random() * 9);
		self.game.hidden_message=""
		self.game.$save()


	}

	function resetScore() {
		self.game.xscore = 0;
		self.game.oscore = 0;
		self.game.$save()

	}

	Array.prototype.shuffle = function() {
		var arr = this;

		for (var i = arr.length - 1; i >= 0; i--) {
			var randomIndex = Math.floor(Math.random() * (arr.length));
			var randomElement = arr[randomIndex];

			arr[randomIndex] = arr[i];
			arr[i] = randomElement;

		}
		return arr;
	}



	function randomMove() {
    if (confirm("congratulations! you just found a hidden item - 'shuffle', which randomly arrange all the boxes. Click okay to apply the item") == true) {
       	self.game.hidden_message="Player "+ self.game.nextmove + " just applied the hidden item - 'shuffle' at round "+ self.game.movecount+ " !!!!"
       	self.game.box = self.game.box.shuffle();
		self.game.$save()
    } 
    
}


};