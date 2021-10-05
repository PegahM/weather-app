function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = date.getDay();
  return `${days[day]} ${hours}:${minutes}`;
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (i) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="wather-forecast-date">${i}</div>

                <img
                  src="http://openweathermap.org/img/wn/50d@2x.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forecst-temprature">
                  <span class="weather-forecast-temprature-max"> 18° </span>
                  <span class="weather-forecast-temprature-min"> 12° </span>
                </div>
              </div>
            `;
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
function displayTemprature(response) {
  let tempratureElement = document.querySelector("#temprature");
  let cityElement = document.querySelector("#city");
  let descriptionElemnt = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElemnt = document.querySelector("#icon");
  celciousTemp = response.data.main.temp;
  tempratureElement.innerHTML = Math.round(celciousTemp);
  cityElement.innerHTML = response.data.name;
  descriptionElemnt.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElemnt.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElemnt.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "73e732d25bae3e4404f4d1aa421272a7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemprature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();

  let tempElement = document.querySelector("#temprature");
  celciousLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let farenTemp = (celciousTemp * 9) / 5 + 32;

  tempElement.innerHTML = Math.round(farenTemp);
}
function displayCelciousTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temprature");
  celciousLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  tempElement.innerHTML = Math.round(celciousTemp);
}

let celciousTemp = null;

let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celciousLink = document.querySelector("#celcious-link");
celciousLink.addEventListener("click", displayCelciousTemp);

search("new york");
displayForecast();
