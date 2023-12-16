import { getWeather } from "./weather";
import { getLocation } from "./location";
import { ICON_MAP } from "./iconMap";

navigator.geolocation.getCurrentPosition(positionSuccess, positionError);

function positionSuccess({ coords }) {
  getWeather(
    coords.latitude,
    coords.longitude,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
    .then(renderWeather)
    .catch((e) => {
      console.error(e);
      alert("Error getting weather");
    });

  getLocation(coords.latitude, coords.longitude).then((location) => {
    document.getElementById("header-current-city").textContent = location;
  });
}

function positionError() {
  alert("Error getting location. Please allow location access.");
}

function renderWeather({ current, daily, hourly }) {
  renderCurrentWeather(current);
  renderDailyWeather(daily);
  renderHourlyWeather(hourly);
  document.body.classList.remove("blurred");
}

function setValue(selector, value, { parent = document } = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value;
}

function getIconUrl(iconCode) {
  return `icons/${ICON_MAP.get(iconCode)}.svg`;
}

const currentIcon = document.querySelector("[data-current-icon]");
function renderCurrentWeather(current) {
  const {
    currentTemp,
    highTemp,
    lowTemp,
    highFeelsLike,
    lowFeelsLike,
    windSpeed,
    precip,
    iconCode,
  } = current;

  currentIcon.src = getIconUrl(iconCode);
  setValue("current-temp", currentTemp);
  setValue("current-high", highTemp);
  setValue("current-low", lowTemp);
  setValue("current-fl-high", highFeelsLike);
  setValue("current-fl-low", lowFeelsLike);
  setValue("current-wind", windSpeed);
  setValue("current-precip", precip);
}

const DAY_FORMATTER = new Intl.DateTimeFormat("en-US", { weekday: "long" });
const dailySection = document.querySelector("[data-day-section]");
const dayCardTemplate = document.getElementById("day-card-template");
function renderDailyWeather(daily) {
  dailySection.innerHTML = "";
  daily.forEach((day) => {
    const element = dayCardTemplate.content.cloneNode(true);
    setValue("temp", day.maxTemp, { parent: element });
    setValue("day", DAY_FORMATTER.format(day.timestamp), { parent: element });
    element.querySelector("[data-icon]").src = getIconUrl(day.iconCode);
    dailySection.appendChild(element);
  });
}

const HOUR_FORMATTER = new Intl.DateTimeFormat("en-US", { hour: "numeric" });
const hourSection = document.querySelector("[data-hour-section]");
const hourRowTemplate = document.getElementById("hour-row-template");
function renderHourlyWeather(hourly) {
  hourSection.innerHTML = "";
  hourly.forEach((hour) => {
    const element = hourRowTemplate.content.cloneNode(true);
    setValue("day", DAY_FORMATTER.format(hour.timestamp), { parent: element });
    setValue("time", HOUR_FORMATTER.format(hour.timestamp), {
      parent: element,
    });
    setValue("temp", hour.temp, { parent: element });
    setValue("fl-temp", hour.feelsLike, { parent: element });
    setValue("wind", hour.windSpeed, { parent: element });
    setValue("precip", hour.precip, { parent: element });
    element.querySelector("[data-icon]").src = getIconUrl(hour.iconCode);
    hourSection.appendChild(element);
  });
}
