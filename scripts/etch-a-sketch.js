let gridSize = 80;
let borderSize = 1;
let eraseBrush = false;
let rainbowBrush = false;

let lastX = -1;
let lastY = -1;
let xRotation = 0;
let yRotation = 0;
let rotateDegrees = 15;

let mouseDown = 0;
document.body.onmousedown = () => mouseDown = 1;
document.body.onmouseup = () => mouseDown = 0;

function initializeGrid(gridSize) {
  const etchScreen = document.querySelector("#etchScreen");
  const screenWidth = etchScreen.clientWidth;
  const screenHeight = etchScreen.clientHeight;

  const cellWidth = ((screenWidth * 1.0) / gridSize);
  const cellHeight = ((screenHeight * 1.0) / gridSize);

  for (let i = 1; i <= gridSize; i++){
    for(let j = 1; j <= gridSize; j++){
      let etchCell = document.createElement("div");
      etchCell.className = "etch-cell";
      etchCell.setAttribute("x-coord", j);
      etchCell.setAttribute("y-coord", i);
      etchCell.style.width = (cellWidth - (borderSize * 2)) + "px";
      etchCell.style.height = (cellHeight - (borderSize * 2)) + "px";

      etchCell.addEventListener("mouseover", function(){
        if(mouseDown){
          etchCell.style.backgroundColor = paintCell();
          let xCoord = Number(etchCell.getAttribute("x-coord"));
          let yCoord = Number(etchCell.getAttribute("y-coord"));

          rotateKnobs(xCoord, yCoord);
        }
      });

      etchScreen.appendChild(etchCell);
    }
  }
}

function getRandomColor() {
  let red = String(Math.floor(Math.random() * 255));
  let green = String(Math.floor(Math.random() * 255));
  let blue = String(Math.floor(Math.random() * 255));

  return `rgb(${red}, ${green}, ${blue})`;
}

function paintCell(){
  let color = "black"

  if (eraseBrush) {
    color = "gray";
  } else if(rainbowBrush){
    color = getRandomColor();
  }

  return color;
}

function rotateKnobs(x, y){
  const leftKnob = document.querySelector("#leftKnob");

  if(x > lastX) {
    xRotation += rotateDegrees;
    leftKnob.style.transform = `rotate(${xRotation}deg)`;
  } else if (x < lastX) {
    xRotation -= rotateDegrees;
    leftKnob.style.transform = `rotate(${xRotation}deg)`;
  }

  lastX = x;

  const rightKnob = document.querySelector("#rightKnob");

  if(y > lastY){
    yRotation += rotateDegrees;
    rightKnob.style.transform = `rotate(${yRotation}deg)`;
  } else if (y < lastY){
    yRotation -= rotateDegrees;
    rightKnob.style.transform = `rotate(${yRotation}deg)`;
  }

  lastY = y;
}

initializeGrid(gridSize);
getRandomColor();