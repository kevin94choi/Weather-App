const searchBox = document.querySelector(".searchInput");
const searchBtn = document.querySelector(".searchBtn");

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=current%2Cdays&key=J98EAPWVG676H6ET3TYFFLZPK&contentType=json`,
      { mode: "cors" }
    );
    if (!response.ok) {
      throw new Error("Network response failed.");
    }
    const weatherData = await response.json();
    console.log(weatherData);

    document.querySelector(".city").innerHTML = capitalizedWords(
      weatherData.address
    );
    document.querySelector(".temp").innerHTML =
      Math.round(weatherData.currentConditions.temp) + "°C";
    document.querySelector(".humidity").innerHTML =
      weatherData.currentConditions.humidity + "%";
    document.querySelector(".wind").innerHTML =
      weatherData.currentConditions.windspeed + " km/hr";
    document.querySelector(".weather-condition").innerHTML = capitalizedWords(
      weatherData.currentConditions.conditions
    );

    const weatherIcon = document.querySelector(".weather-icon");
    const condition = weatherData.currentConditions.conditions;

    if (condition === "Clear") {
      weatherIcon.src = "Icons/sun.png";
    } else if (condition.toLowerCase().includes("rain")) {
      weatherIcon.src = "Icons/rain.png";
    } else if (condition.toLowerCase().includes("cloudy")) {
      weatherIcon.src = "Icons/clouds.png";
    } else if (condition.toLowerCase().includes("snow")) {
      weatherIcon.src = "Icons/snow.png";
    } else if (condition.toLowerCase().includes("storm")) {
      weatherIcon.src = "Icons/storm.png";
    }

    searchBox.value = "";
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    document.querySelector(".city").innerHTML = "Can't find city. Try again!";
    searchBox.value = "";
  }
}

const capitalizedWords = (word) => {
  return word
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

searchBtn.addEventListener("click", () => {
  getWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    getWeather(searchBox.value);
  }
});
