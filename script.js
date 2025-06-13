let startTime = null;
let elapsedTime = 0;
let timerInterval = null;
const display = document.getElementById("display");
const lapsContainer = document.getElementById("laps");



function timeToString(time) {
  let ms = time % 1000;
  time = Math.floor(time / 1000);
  let s = time % 60;
  time = Math.floor(time / 60);
  let m = time % 60;
  let h = Math.floor(time / 60);
  return (
    (h < 10 ? "0" + h : h) + ":" +
    (m < 10 ? "0" + m : m) + ":" +
    (s < 10 ? "0" + s : s) + "." +
    ms.toString().padStart(3, "0")
  );
}

function updateDisplay() {
  display.textContent = timeToString(elapsedTime);
}

function start() {
  if (timerInterval) return;
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 10);
}

function stop() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function reset() {
  stop();
  elapsedTime = 0;
  updateDisplay();
  lapsContainer.innerHTML = "";
}

function lap() {
  const lapTime = timeToString(elapsedTime);
  const li = document.createElement("li");
  li.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
  lapsContainer.appendChild(li);
}

const toggle = document.getElementById("themeToggle");
toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});

window.onload = () => {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
    toggle.checked = true;
  }
};
