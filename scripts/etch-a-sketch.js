let gridSize = 50;
let borderSize = 1;

let lastX = -1;
let lastY = -1;
let xRotation = 0;
let yRotation = 0;
let rotateDegrees = 15;
let paintColor = "black";

let mouseDown = 0;
document.body.onmousedown = () => mouseDown = 1;
document.body.onmouseup = () => mouseDown = 0;

function initializeGrid(gridSize) {
  const etchScreen = document.querySelector("#etchScreen");
  etchScreen.textContent = '';
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

      // etchCell.style.width = (cellWidth) + "px";
      // etchCell.style.height = (cellHeight) + "px";

      etchCell.addEventListener("mouseover", function(){
        if(mouseDown){
          etchCell.style.backgroundColor = getPaintColor();
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

function getPaintColor(){
  let color = paintColor

  if (color !== "black" && color !== "gray") {
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

function initializeButtonEvents(){
  const clearButton = document.querySelector("#clearButton");
  clearButton.addEventListener("click", () => initializeGrid(gridSize));

  const resizeButton = document.querySelector("#resizeButton");
  resizeButton.addEventListener("click", getNewGridSize);

  const blackButton = document.querySelector("#blackButton");
  blackButton.addEventListener("click", () => {

    if(paintColor !== "black"){
      const oldColor = paintColor;
      paintColor = "black";
      blackButton.classList.toggle("control-button-inactive");

      if(oldColor === "gray"){
        const eraserButton = document.querySelector("#eraserButton");
        eraserButton.classList.toggle("control-button-inactive");
      } else {
        const rainbowButton = document.querySelector("#rainbowButton");
        rainbowButton.classList.toggle("control-button-inactive");
      }
    }
  });

  const rainbowButton = document.querySelector("#rainbowButton");
  rainbowButton.addEventListener("click", () => {

    if(paintColor === "black" || paintColor === "gray"){
      const oldColor = paintColor;
      paintColor = getRandomColor();
      rainbowButton.classList.toggle("control-button-inactive");
      rainbowButton.style.

      if(oldColor === "black"){
        const blackButton = document.querySelector("#blackButton");
        blackButton.classList.toggle("control-button-inactive");
      } else {
        const eraserButton = document.querySelector("#eraserButton");
        eraserButton.classList.toggle("control-button-inactive");
      }
    }
  });

  const eraseButton = document.querySelector("#eraserButton");
  eraseButton.addEventListener("click", () => {

    if(paintColor !== "gray"){
      const oldColor = paintColor;
      paintColor = "gray";
      eraseButton.classList.toggle("control-button-inactive");

      if(oldColor === "black"){
        const blackButton = document.querySelector("#blackButton");
        blackButton.classList.toggle("control-button-inactive");
      } else {
        const rainbowButton = document.querySelector("#rainbowButton");
        rainbowButton.classList.toggle("control-button-inactive");
      }
    }
  });
}

function getNewGridSize(){
  let validInput = false;

  while(validInput === false){
    let newSize = prompt("Enter a new grid size between 10 and 100 units:");

    if(newSize === null){
      return;
    }
    else if(newSize && !isNaN(newSize)){
      newSize = Number(newSize);

      if(newSize >= 10 && newSize <= 100){
        gridSize = newSize;
        validInput = true;
      }
    }
  }

  initializeGrid(gridSize);
}

initializeButtonEvents();
initializeGrid(gridSize);