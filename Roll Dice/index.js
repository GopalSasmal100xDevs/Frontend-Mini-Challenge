const diceContainer = document.querySelector("#dices");
const button = document.querySelector("button");

function getRandomNumber() {
  return Math.floor(Math.random() * 6) + 1;
}

function getDiceElement(random) {
  const dice = document.createElement("div");
  dice.classList.add("box");
  dice.classList.add(getDiceCircle(random));

  for (let index = 0; index < random; index++) {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    dice.appendChild(circle);
  }
  return dice;
}

function getDiceCircle(random) {
  switch (random) {
    case 1:
      return "one";
    case 2:
      return "two";
    case 3:
      return "three";
    case 4:
      return "four";
    case 5:
      return "five";
    case 6:
      return "six";
    default:
      return "";
  }
}

button.addEventListener("click", (e) => {
  diceContainer.innerHTML = "";
  for (let index = 0; index < 3; index++) {
    const random = getRandomNumber();
    const element = getDiceElement(random);
    diceContainer.appendChild(element);
  }
});
