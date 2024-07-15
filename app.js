document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const location = document.getElementById('location').value;
    getWeather(location);
});

function getWeather(location) {
    const apiKey = 'e12e629551475db72a215c79515b9008';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === '404') {
                document.getElementById('weather-info').innerHTML = '<p>Location not found</p>';
                document.getElementById('forecast-info').innerHTML = '';
            } else {
                displayWeather(data);
                //getForecast(data.coord.lat, data.coord.lon);
            }
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            document.getElementById('weather-info').innerHTML = `<p>${error.message}</p>`;
            document.getElementById('forecast-info').innerHTML = '';
        });
}

function displayWeather(data) {
    const weatherInfo = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    document.getElementById('weather-info').innerHTML = weatherInfo;
}

