let gridSize = 20;
let borderSize = 1;
let eraseBrush = false;
let rainbowBrush = false;

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

initializeGrid(gridSize);
getRandomColor();