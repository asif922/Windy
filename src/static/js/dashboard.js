async function fetchLogs() {
  const res = await fetch("/get_logs");
  const logs = await res.json();
  return logs;
}

function renderLatest(log) {
  if (!log) return;
  document.getElementById("city").innerText = log.city;
  document.getElementById("temp").innerText = log.temp;
  document.getElementById("humidity").innerText = log.humidity;
  document.getElementById("pressure").innerText = log.pressure;
  document.getElementById("wind").innerText = log.wind_speed;
  document.getElementById("weather").innerText = log.weather;
}

let chartInstance = null;
function renderChart(logs) {
  const labels = logs.map(l => new Date(l.timestamp).toLocaleString());
  const data = logs.map(l => Number(l.temp));
  const ctx = document.getElementById("tempChart").getContext("2d");

  if (chartInstance) {
    chartInstance.data.labels = labels;
    chartInstance.data.datasets[0].data = data;
    chartInstance.update();
    return;
  }

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Temperature (°C)",
        data,
        borderWidth: 2,
        fill: false
      }]
    },
    options: { responsive: true }
  });
}

async function refreshUI() {
  const logs = await fetchLogs();
  if (logs.length > 0) {
    renderLatest(logs[0]);
  }
  // Show only the latest 10 logs
  renderChart(logs.slice(0, 15).reverse());
}

document.getElementById("fetchBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) { alert("Enter city"); return; }
  const res = await fetch(`/get_weather?city=${encodeURIComponent(city)}`);
  const data = await res.json();
  if (data.status === "error") {
    alert("Error: " + (data.message || "Could not fetch"));
    return;
  }
  // show saved log instantly
  renderLatest(data.data);
  refreshUI();
});

refreshUI();
