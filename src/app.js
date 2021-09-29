function displayTemprature(response) {
  console.log(response.data.main.temp);
  let tempratureElement = document.querySelector("#temprature");
  let cityElement = document.querySelector("#city");
  let descriptionElemnt = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  tempratureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElemnt.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  console.log(response.data);
}

let apiKey = "73e732d25bae3e4404f4d1aa421272a7";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemprature);
