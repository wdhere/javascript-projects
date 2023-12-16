const clock = document.querySelector(".clock");
const div = document.createElement("div");
for (let i = 0; i < 60; i++) {
  const tick = document.createElement("div");
  tick.classList.add("tick");
  tick.style.transform = `rotate(${i * 6}deg)`;
  div.appendChild(tick);
}
clock.appendChild(div);

const hourHand = document.querySelector("[data-hour-hand]");
const minuteHand = document.querySelector("[data-minute-hand]");
const secondHand = document.querySelector("[data-second-hand]");

function setClock() {
  const time = new Date();
  const secondsRatio = (time.getSeconds() + time.getMilliseconds() / 1000) / 60;
  const minutesRatio = (secondsRatio + time.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + time.getHours()) / 12;

  setRotation(secondHand, secondsRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hoursRatio);

  requestAnimationFrame(setClock);
}

function setRotation(element, rotationRatio) {
  element.style.setProperty("--rotation", rotationRatio * 360);
}

setClock();
