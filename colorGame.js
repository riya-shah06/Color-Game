var numSquares = 6;
var colors = generateRandomColors(numSquares);

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var pickedColor = pickColor();
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

for (var i = 0; i < modeButtons.length; i++) {
	modeButtons[i].addEventListener("click", function(){
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");

		//how many squares to display
		if(this.textContent === "Easy"){
			numSquares = 3;
		}else{
			numSquares = 6;
		}

		reset();
	})
}

function reset(){
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick new random color from array
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	//change square colors
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		}else{
			squares[i].style.display = "none";
		}

	}
	//change game title color to the original one
	h1.style.background = "steelblue";
	messageDisplay.textContent = "";
}

// easyBtn.addEventListener("click", function(){
// 	hardBtn.classList.remove("selected");
// 	easyBtn.classList.add("selected");
// 	numSquares = 3;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for(var i=0; i < squares.length; i++){
// 		if(colors[i]){
// 			squares[i].style.background = colors[i];
// 		}else{
// 			squares[i].style.display = "none";
// 		}
// 	}


// })

// hardBtn.addEventListener("click", function(){
// 	easyBtn.classList.remove("selected");
// 	hardBtn.classList.add("selected");
// 	numSquares = 6;

// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for(var i=0; i < squares.length; i++){
// 			squares[i].style.background = colors[i];
// 			squares[i].style.display = "block";
// 	}
// })


resetButton.addEventListener("click", function(){
	reset();
})


colorDisplay.textContent = pickedColor;
for(var i = 0; i < squares.length; i++){
	//change square colors
	squares[i].style.background = colors[i];

	squares[i].addEventListener("click", async function(){
		var clickedColor = this.style.background;

		if(clickedColor === pickedColor){
			//display to user that color is correct
			messageDisplay.textContent = "CORRECT!";
			//reset the game
			// resetButton.textContent = "Play Again?";

			//change all square colors to that color
			changeColors(clickedColor);
			//change game title color to that color
			h1.style.background = clickedColor;

			await new Promise(r => setTimeout(r, 2000));
			reset();
		}else{
			this.style.background = "#232323";
			messageDisplay.textContent = "Try Again";
		}
	})
}

function changeColors(color){
	for(var i = 0; i < squares.length; i++){
		squares[i].style.background = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	var arr = [];

	for(var i=0; i<num; i++){
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	//picks any shades of red
	var r = Math.floor(Math.random() * 256);
	//picks any shades of green
	var g = Math.floor(Math.random() * 256);
	//picks any shades of blue
	var b = Math.floor(Math.random() * 256);
	//final color
	//the space between rgb values is v imp
	return "rgb(" + r + ", " + g +", " + b + ")";
}
