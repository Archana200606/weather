function getWeather() {
  let city = document.getElementById("cityInput").value.trim();
  let resultBox = document.getElementById("Result");

  if (city === "") {
    resultBox.style.display = "block";
    resultBox.innerHTML = "⚠️ Please enter a city name!";
    return;
  }

  let apiKey = "a09ba599e1d972db7c3278383f13d78f"; 
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        resultBox.style.display = "block";
        resultBox.innerHTML = "❌ City not found!";
      } else {
        let mainCondition = data.weather[0].main.toLowerCase();
        let suggestion = "";

        // Simple weather suggestions
        if (mainCondition.includes("rain")) suggestion = "🌂 Carry an umbrella!";
        else if (mainCondition.includes("cloud")) suggestion = "☁ It might be cloudy, dress comfortably.";
        else if (mainCondition.includes("clear")) suggestion = "☀️ It's sunny! Wear sunglasses.";
        else if (mainCondition.includes("snow")) suggestion = "❄️ Wear warm clothes!";
        else if (mainCondition.includes("wind")) suggestion = "💨 It’s windy, wear a jacket!";
        else if (mainCondition.includes("storm") || mainCondition.includes("thunder")) suggestion = "⚡ Stay indoors if possible!";
        else suggestion = "🌤 Have a nice day!";

        // Temperature suggestions
        if (data.main.temp > 30) suggestion += " 🥵 Stay hydrated!";
        else if (data.main.temp < 10) suggestion += " 🧣 Wear warm clothes!";

        let icon = data.weather[0].icon;
        let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        resultBox.style.display = "block";
        resultBox.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <img src="${iconUrl}" alt="Weather icon">
          <p>🌡 Temperature: ${data.main.temp} °C</p>
          <p>☁ Condition: ${data.weather[0].description}</p>
          <p>💨 Wind: ${data.wind.speed} m/s</p>
          <p>💧 Humidity: ${data.main.humidity}%</p>
          <p style="margin-top:10px; font-weight:bold; color:red; font-size:20px;">${suggestion}</p>
        `;
      }
    })
    .catch(error => {
      resultBox.style.display = "block";
      resultBox.innerHTML = "⚠️ Error fetching data!";
      console.error(error);
    });
}

document.getElementById("cityInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); 
    getWeather();
  }
});
