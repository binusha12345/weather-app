const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    const APIKey = '7bba2d2eb5bc7c9cf84b6d7b178e2439';
    const city = document.querySelector('.search-box input').value;

    if (city === '') {
        return;
    }

    // Change background based on city
    changeBackground(city);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (cityHide.textContent == city) {
                return;
            } else {
                cityHide.textContent = city;

                container.style.height = '555px';
                container.classList.add('active');
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');

                setTimeout(() => {
                    container.classList.remove('active');
                }, 2500);

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'images/clear.png';
                        break;
                    case 'Rain':
                        image.src = 'images/rain.png';
                        break;
                    case 'Snow':
                        image.src = 'images/snow.png';
                        break;
                    case 'Clouds':
                        image.src = 'images/cloud.png';
                        break;
                    case 'Mist':
                        image.src = 'images/mist.png';
                        break;
                    case 'Haze':
                        image.src = 'images/haze.png';
                        break;
                    default:
                        image.src = 'images/cloud.png';
                }

                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

                const infoWeather = document.querySelector('.info-weather');
                const infoHumidity = document.querySelector('.info-humidity');
                const infoWind = document.querySelector('.info-wind');

                const elCloneInfoWeather = infoWeather.cloneNode(true);
                const elCloneInfoHumidity = infoHumidity.cloneNode(true);
                const elCloneInfoWind = infoWind.cloneNode(true);

                elCloneInfoWeather.id = 'clone-info-weather';
                elCloneInfoWeather.classList.add('active-clone');

                elCloneInfoHumidity.id = 'clone-info-humidity';
                elCloneInfoHumidity.classList.add('active-clone');

                elCloneInfoWind.id = 'clone-info-wind';
                elCloneInfoWind.classList.add('active-clone');

                setTimeout(() => {
                    infoWeather.insertAdjacentElement('afterend', elCloneInfoWeather);
                    infoHumidity.insertAdjacentElement('afterend', elCloneInfoHumidity);
                    infoWind.insertAdjacentElement('afterend', elCloneInfoWind);
                }, 2200);

                const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
                const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
                const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');

                if (cloneInfoWeather.length > 0) {
                    const cloneInfoWeatherFirst = cloneInfoWeather[0];
                    const cloneInfoHumidityFirst = cloneInfoHumidity[0];
                    const cloneInfoWindFirst = cloneInfoWind[0];

                    cloneInfoWeatherFirst.classList.remove('active-clone');
                    cloneInfoHumidityFirst.classList.remove('active-clone');
                    cloneInfoWindFirst.classList.remove('active-clone');

                    setTimeout(() => {
                        cloneInfoWeatherFirst.remove();
                        cloneInfoHumidityFirst.remove();
                        cloneInfoWindFirst.remove();
                    }, 2200);
                }
            }
        });
});

function changeBackground(city) {
    const pexelsAPIKey = 'GcPuVYs9Tr27XumfErzjzlumISczPBHt2lOVtsCFqDGEHMgMSxoEpnEY';

    fetch(`https://api.pexels.com/v1/search?query=${city} city landscape&per_page=1&orientation=landscape`, {
        headers: {
            Authorization: pexelsAPIKey
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.photos && data.photos.length > 0) {
                const imageUrl = data.photos[0].src.large2x;
                document.body.style.backgroundImage = `url('${imageUrl}')`;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundPosition = 'center center';
                document.body.style.backgroundRepeat = 'no-repeat';
                document.body.style.backgroundAttachment = 'fixed';
                document.body.style.transition = 'background-image 1s ease-in-out';
            } else {
                document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                document.body.style.transition = 'background 1s ease-in-out';
            }
        })
        .catch(error => {
            console.log('Background image not found, using default gradient');
            document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            document.body.style.transition = 'background 1s ease-in-out';
        });
}