async function fetchAndRenderLogs() {
  const res = await fetch("/get_logs");
  const logs = await res.json();
  const container = document.getElementById("logsTable");
  container.innerHTML = "";

  const table = document.createElement("table");
  table.className = "logs-table";
  const thead = document.createElement("thead");
  thead.innerHTML = "<tr><th>Timestamp (UTC)</th><th>City</th><th>Temp °C</th><th>Humidity</th><th>Pressure</th><th>Wind m/s</th><th>Weather</th></tr>";
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  logs.forEach(log => {
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

  // search filter
  document.getElementById("search").addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase();
    Array.from(tbody.querySelectorAll("tr")).forEach(row => {
      row.style.display = row.innerText.toLowerCase().includes(q) ? "" : "none";
    });
  });
}

fetchAndRenderLogs();
