async function fetchAndRenderLogs() {
  const res = await fetch("/get_logs");
  const logs = await res.json();
  // Show only the latest 10 logs initially
  const latestLogs = logs.slice(0, 10);
  renderLogs(latestLogs);

  // search filter
  document.getElementById("search").addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase();
    if (q === "") {
      // If no search query, show latest 10
      renderLogs(latestLogs);
    } else {
      // Filter all logs and show only the latest 10 that match
      const filteredLogs = logs.filter(log => {
        const logText = `${new Date(log.timestamp).toLocaleString()} ${log.city} ${log.temp} ${log.humidity} ${log.pressure} ${log.wind_speed} ${log.weather}`.toLowerCase();
        return logText.includes(q);
      });
      const logsToShow = filteredLogs.slice(0, 10);
      renderLogs(logsToShow);
    }
  });
}

function renderLogs(logsToShow) {
  const container = document.getElementById("logsTable");
  container.innerHTML = "";

  const table = document.createElement("table");
  table.className = "logs-table";
  const thead = document.createElement("thead");
  thead.innerHTML = "<tr><th>Timestamp (UTC)</th><th>City</th><th>Temp °C</th><th>Humidity</th><th>Pressure</th><th>Wind m/s</th><th>Weather</th></tr>";
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  logsToShow.forEach(log => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${new Date(log.timestamp).toLocaleString()}</td>
      <td>${log.city}</td>
      <td>${log.temp}</td>
      <td>${log.humidity}</td>
      <td>${log.pressure}</td>
      <td>${log.wind_speed}</td>
      <td>${log.weather}</td>
    `;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.appendChild(table);
}

fetchAndRenderLogs();