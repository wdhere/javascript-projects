const [hour, minute, second] = document.querySelectorAll(".container-segment");
let lastSeconds, lastMinutes, lastHours;

function setTime() {
  const time = new Date();
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  if (seconds !== lastSeconds) {
    flipSection(second, seconds);
    lastSeconds = seconds;
  }
  if (minutes !== lastMinutes) {
    flipSection(minute, minutes);
    lastMinutes = minutes;
  }
  if (hours !== lastHours) {
    flipSection(hour, hours);
    lastHours = hours;
  }
}

function flipSection(section, number) {
  const number1 = parseInt(number / 10);
  const number2 = number % 10;
  const [card1, card2] = section.querySelectorAll(".flip-card");
  flip(card1, number1);
  flip(card2, number2);
}

function flip(flipCard, nextNumber) {
  const topNum = flipCard.querySelector(".top");
  const startNumber = parseInt(topNum.textContent);
  if (nextNumber === startNumber) return;

  const bottomNum = flipCard.querySelector(".bottom");
  const topFlip = document.createElement("div");
  const bottomFlip = document.createElement("div");
  topFlip.classList.add("top-flip");
  bottomFlip.classList.add("bottom-flip");
  topFlip.textContent = startNumber;
  bottomFlip.textContent = nextNumber;

  topFlip.addEventListener("animationstart", (e) => {
    topNum.textContent = nextNumber;
  });
  topFlip.addEventListener("animationend", (e) => {
    topFlip.remove();
  });
  bottomFlip.addEventListener("animationend", (e) => {
    bottomNum.textContent = nextNumber;
    bottomFlip.remove();
  });

  flipCard.appendChild(topFlip);
  flipCard.appendChild(bottomFlip);
}

setInterval(setTime, 250);
