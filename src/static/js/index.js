// static/js/weather.js

async function getWeather(lat, lon) {
  const apiKey = "d22a9ae4e8b720c6deddcb2df34a4bd6";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data); // <-- Add this line

    document.getElementById("temperature").textContent = data.main.temp + " °C";
    document.getElementById("humidity").textContent = data.main.humidity + " %";
  } catch (error) {
    console.error("Weather fetch error:", error);
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => getWeather(pos.coords.latitude, pos.coords.longitude),
      err => console.error("Location error:", err)
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Run when page loads
window.onload = getLocation;
