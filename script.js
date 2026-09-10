// ======================================
// CONFIGURACIÓN
// ======================================

// Coloca aquí tu API Key de WeatherAPI
const API_KEY = "43af6c86056b453eb54232323261009";


// ======================================
// ELEMENTOS HTML
// ======================================

const cityInput = document.getElementById("cityInput");

const searchButton = document.getElementById("searchButton");

const message = document.getElementById("message");

const weatherInfo = document.getElementById("weatherInfo");

const conditionText = document.getElementById("conditionText");

const weatherIcon = document.getElementById("weatherIcon");

const temperature = document.getElementById("temperature");

const cityName = document.getElementById("cityName");

const humidity = document.getElementById("humidity");

const wind = document.getElementById("wind");


// ======================================
// FUNCIÓN PARA BUSCAR EL CLIMA
// ======================================

async function searchWeather() {

    // Obtener ciudad escrita por el usuario
    const city = cityInput.value.trim();


    // Comprobar que haya una ciudad
    if (city === "") {

        message.textContent =
            "Por favor, escribe una ciudad.";

        return;
    }


    // Mostrar mensaje mientras buscamos
    message.textContent =
        "Buscando información del clima...";


    try {

        // Crear URL de WeatherAPI
        const url =
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&lang=es`;


        // Realizar petición
        const response = await fetch(url);


        // Convertir respuesta a JSON
        const data = await response.json();


        // Comprobar errores
        if (!response.ok) {

            throw new Error(
                data.error?.message ||
                "No se pudo obtener el clima."
            );
        }


        // ======================================
        // MOSTRAR INFORMACIÓN
        // ======================================

        cityName.textContent =
            data.location.name;


        temperature.textContent =
            `${Math.round(data.current.temp_c)}°C`;


        conditionText.textContent =
            data.current.condition.text;


        humidity.textContent =
            `${data.current.humidity}%`;


        wind.textContent =
            `${data.current.wind_kph} km/h`;


        // Imagen del clima
        weatherIcon.src =
            "https:" + data.current.condition.icon;


        weatherIcon.alt =
            data.current.condition.text;


        // Quitar mensaje
        message.textContent = "";

    }


    catch (error) {

        console.error(error);

        message.textContent =
            "No encontramos esa ciudad. Intenta nuevamente.";

    }

}


// ======================================
// BOTÓN DE BÚSQUEDA
// ======================================

searchButton.addEventListener(
    "click",
    searchWeather
);


// ======================================
// ENTER EN EL CAMPO DE TEXTO
// ======================================

cityInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            searchWeather();

        }

    }
);
