//In your project, display the current date and time using JavaScript: Tuesday 16:00

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = document.querySelector("#currentDay");
day.innerHTML = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = document.querySelector("#currentMonth");
month.innerHTML = months[now.getMonth()];

let date = document.querySelector("#currentDate");
date.innerHTML = now.getDate();

function formatDate() {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let time = `${hours}:${minutes}`;
  return `${time}`;
}
let time = document.querySelector("#currentTime");
time.innerHTML = formatDate();

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);

  let cityTemp = document.querySelector("#temperature");
  cityTemp.innerHTML = `+${temperature}`;
  let cityName = document.querySelector("h2");
  cityName.innerHTML = `${city}`;
  let cityHumidity = document.querySelector("#humidity");
  cityHumidity.innerHTML = `humidity ${humidity}%`;
  let cityWind = document.querySelector("#wind");
  cityWind.innerHTML = `wind ${wind} km/h`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#cityEnter");
  let cityResult = `${searchInput.value}`;
  let apiStart = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "007e7afd4ee18cc6f655340d91c0677d";
  let unit = "metric";
  let apiUrl = `${apiStart}q=${cityResult}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}
let form = document.querySelector("#searchCity");
form.addEventListener("submit", search);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiStart = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "007e7afd4ee18cc6f655340d91c0677d";
  let unit = "metric";
  let apiUrl = `${apiStart}lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function showLocalPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let input = document.querySelector("#location");
input.addEventListener("click", showLocalPosition);
