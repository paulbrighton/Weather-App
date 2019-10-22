const appId = '6d3a2873ef9d1773bbd9762e5f0d2b17'
const units = 'metric'
let searchMethod

function getSearchMethod (searchTerm) {
  if (searchTerm === 5 & Number.parseInt(searchTerm) + '' === searchTerm) {
    searchMethod = 'zip'
  } else {
    searchMethod = 'q'
  }
}

function searchWeather (searchTerm) {
  getSearchMethod(searchTerm)
  fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
    .then(result => {
      return result.json()
    })
    .then(result => {
      init(result)
    })
}

function init (resultFromServer) {
  console.log(resultFromServer)
  switch (resultFromServer.weather[0].main) {
    case 'Clear':
      document.body.style.backgroundImage = 'url("clear.jpg")'
      break

    case 'Clouds':
      document.body.style.backgroundImage = 'url("cloudy.jpg")'
      break

    case 'Rain':
    case 'Drizzle':
    case 'Mist':
      document.body.style.backgroundImage = 'url("rain.jpg")'
      break

    case 'Thunderstorm':
      document.body.style.backgroundImage = 'url("stormy.jpg")'
      break

    case 'Snow':
      document.body.style.backgroundImage = 'url("snow.jpg")'
      break

    default:
      document.body.style.backgroundImage = 'url("default.jpg")'
      break
  }

  let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader')
  let temperatureElement = document.getElementById('temperature')
  let cityHeader = document.getElementById('cityHeader')
  let windSpeedElement = document.getElementById('windSpeed')
  let humidityElement = document.getElementById('humidity')
  let weatherIcon = document.getElementById('documentIconImg')

  weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png'

  let resultDescription = resultFromServer.weather[0].description
  weatherDescriptionHeader.innerHTML = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1)

  temperatureElement.innerHTML = Math.round(resultFromServer.main.temp) + '&#176'
  windSpeedElement.innerHTML = 'Wind is ' + Math.floor(resultFromServer.wind.speed) + ' m/s'
  cityHeader.innerHTML = resultFromServer.name
  humidityElement.innerHTML = 'Humidity level is ' + resultFromServer.main.humidity + '%'
}

document.getElementById('searchBtn').addEventListener('click', () => {
  let searchTerm = document.getElementById('searchInput').value
  if (searchTerm) {
    searchWeather(searchTerm)
  }
})
