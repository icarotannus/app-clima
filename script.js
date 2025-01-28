const apiKey = "0f337b0149a928dbcb769fbe6e3491cb";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const seachBox = document.querySelector(".pesquisa input");
const seachBtn = document.querySelector(".pesquisa button");
const weatherIcon = document.querySelector(".icone-clima");
const climaContainer = document.querySelector(".clima");

const weatherIcons = {
  Clear: "assets/Icon/icone-ensolarado.png",
  Clouds: "assets/Icon/icone-nublado.png",
  Rain: "assets/Icon/icone-chuva.png",
  Drizzle: "assets/Icon/icone-garoa.png",
  Thunderstorm: "assets/Icon/icone-tempestade.png",
  Snow: "assets/Icon/icone-neve.png",
  Mist: "assets/Icon/icone-nevoa.png",
};

async function checkWeather(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

    if (!response.ok) {
      throw new Error("Cidade não encontrada!");
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const weatherType = data.weather[0].main;
    const iconSrc = weatherIcons[weatherType] || "icons/default.png";
    weatherIcon.src = iconSrc;

    climaContainer.classList.remove("oculto");
  } catch (error) {
    console.error(error);
    alert("Erro: " + error.message);
  }
}

function handleSearch() {
  const city = seachBox.value.trim();
  if (city) {
    checkWeather(city);
  }
}

// Adiciona o evento ao botão de pesquisa
seachBtn.addEventListener("click", handleSearch);

// Adiciona o evento ao pressionar a tecla "Enter"
seachBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});
