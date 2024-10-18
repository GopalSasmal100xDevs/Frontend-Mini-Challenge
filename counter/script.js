const input = document.querySelector("#input-value");
const count = document.querySelector("#count");

const incrementBtn = document.querySelector("#increment");
const decrementBtn = document.querySelector("#decrement");

incrementBtn.addEventListener("click", () => {
  count.innerText = parseInt(count.innerText || 0) + parseInt(input.value || 0);
});

decrementBtn.addEventListener("click", () => {
  if (parseInt(count.innerText) <= 0) {
    return;
  }
  count.innerText = parseInt(count.innerText || 0) - parseInt(input.value || 0);
});

const resetBtn = document.querySelector("#reset-btn");
resetBtn.addEventListener("click", () => {
  count.innerText = 0;
});
