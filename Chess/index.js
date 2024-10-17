const boardContainer = document.querySelector("#container");

const boardSize = 8;
const moves = "bishop";

const board = getBoard(boardSize);
function onClick(e) {
  resetBoardColor(boardContainer);

  if (e.target?.classList?.contains("box")) {
    const element = e.target;
    console.log(element);
    switch (moves) {
      case "bishop": {
        const x = element.dataset?.x;
        const y = element.dataset?.y;

        movesBishop(boardContainer, x, y, boardSize);
        break;
      }
    }
  }
}

function setColor(element) {
  if (element) {
    element.classList.add("selected");
  }
}

function resetBoardColor(board) {
  const selectedElements = board.getElementsByClassName("selected");
  while (selectedElements && selectedElements.length > 0) {
    selectedElements[0].classList.remove("selected");
  }
}

function getCell(board, x, y) {
  return board.querySelector(`[data-x='${x}'][data-y='${y}']`);
}

function movesBishop(board, x, y, boardSize) {
  const cell = getCell(board, x, y);
  setColor(cell);
  // to top left corner
  for (let i = x, j = y; i >= 0 && j >= 0; i--, j--) {
    setColor(board.querySelector(`[data-x='${i}'][data-y='${j}']`));
  }

  // to top right corner
  for (let i = x, j = y; i >= 0 && j < boardSize; i--, j++) {
    setColor(board.querySelector(`[data-x='${i}'][data-y='${j}']`));
  }

  //   to bottom left corner
  for (let i = x, j = y; i < boardSize && j >= 0; i++, j--) {
    setColor(board.querySelector(`[data-x='${i}'][data-y='${j}']`));
  }

  // to bottom right corner
  for (let i = x, j = y; i < boardSize && j < boardSize; i++, j++) {
    setColor(board.querySelector(`[data-x='${i}'][data-y='${j}']`));
  }
}

function getBoard(size) {
  const board = document.createDocumentFragment();

  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    for (let j = 0; j < size; j++) {
      const col = document.createElement("button");
      col.classList.add("box");
      col.dataset.x = String(i);
      col.dataset.y = String(j);

      row.appendChild(col);
    }
    board.appendChild(row);
  }
  return board;
}

boardContainer.appendChild(board);

document.addEventListener("click", onClick);
