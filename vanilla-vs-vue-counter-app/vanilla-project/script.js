const buttonElement = document.querySelector("button");
const countElement = document.querySelector(".count");

let count = 0;

buttonElement.addEventListener("click", () => {
  count++;
  countElement.textContent = count;
});
