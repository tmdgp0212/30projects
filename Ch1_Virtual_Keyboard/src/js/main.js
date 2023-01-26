import "../css/style.css";

const keyboardEl = document.querySelector(".keyboard");
const inputEl = document.querySelector(".text > p");
const resetEl = document.querySelector(".reset");
const darkModeEl = document.querySelector("input[type=checkbox]");

let keydown = false;
// eslint-disable-next-line no-unused-vars
let curKey = "";

window.addEventListener("keydown", (e) => {
  console.log(e);
  if (!keydown) {
    curKey = document.querySelector(`.key[data-code=${e.code}]`);
    Print();
  }
  keydown = true;
});

window.addEventListener("keyup", () => {
  keyUp();
});

keyboardEl.addEventListener("mousedown", (e) => {
  if (!keydown) {
    curKey = e.target.closest("div.key");
    Print();
  }
  keydown = true;
});

keyboardEl.addEventListener("mouseup", () => {
  keyUp();
});

resetEl.addEventListener("click", () => {
  inputEl.textContent = "";
});

const Print = () => {
  curKey?.classList.add("active");
  let keyVal = curKey?.dataset.val;

  if (keyVal && keyVal === "backspace") {
    inputEl.textContent = inputEl.textContent.slice(0, -1);
  } else if (keyVal) {
    inputEl.textContent = inputEl.textContent + keyVal;
  }
};

const keyUp = () => {
  curKey?.classList.remove("active");
  keydown = false;
};

darkModeEl.addEventListener("change", (e) => {
  document.documentElement.setAttribute(
    "theme",
    e.target.checked ? "dark" : ""
  );
});
