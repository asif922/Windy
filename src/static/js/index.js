// index.js - client entry
// - Loads Firebase auth dynamically if logout button exists
// - Fetches weather via server endpoint `/get_weather_coords` (server keeps API key secret)
// - Shows in-page messages and a live location watcher

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  import('./firebaseConfig.js')
    .then(({ auth, onAuthStateChanged, signOut }) => {
      onAuthStateChanged(auth, (user) => {
        if (user) logoutBtn.style.display = 'inline-block';
        else {
          logoutBtn.style.display = 'none';
          window.location.href = '/auth';
        }
      });

      logoutBtn.addEventListener('click', async () => {
        try {
          await signOut(auth);
          window.location.href = '/auth';
        } catch (err) {
          console.error('Logout error:', err);
        }
      });
    })
    .catch(err => console.error('Could not load firebaseConfig:', err));
}

async function getWeather(lat, lon) {
  const url = `/get_weather_coords?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
  try {
    const resp = await fetch(url);
    const json = await resp.json().catch(() => null);
    if (!resp.ok || !json || json.status !== 'success') {
      const msgText = (json && json.message) ? json.message : (resp.statusText || `Error ${resp.status}`);
      showWeatherMessage(resp.status === 404 ? 'The requested URL was not found on the server.' : msgText);
      return;
    }

    const data = json.data;
    const tempEl = document.getElementById('temperature');
    const humEl = document.getElementById('humidity');
    
    if (tempEl) tempEl.textContent = `${data.temp} °C`;
    if (humEl) humEl.textContent = `${data.humidity} %`;
    showWeatherMessage('');
  } catch (err) {
    console.error('Weather fetch error:', err);
    showWeatherMessage(err.message || 'Weather fetch error');
  }
}

function showWeatherMessage(text) {
  const info = document.querySelector('.weather-info');
  let msg = document.getElementById('weatherMessage');
  if (!msg) {
    msg = document.createElement('div');
    msg.id = 'weatherMessage';
    msg.style.color = '#b00020';
    msg.style.marginTop = '8px';
    if (info) info.appendChild(msg); else document.body.appendChild(msg);
  }
  msg.textContent = text || '';
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => getWeather(pos.coords.latitude, pos.coords.longitude),
      err => {
        console.error('Location error:', err);
        showWeatherMessage('Location unavailable. Enter a city in the fallback input (if present).');
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  } else {
    showWeatherMessage('Geolocation is not supported by this browser.');
  }
}

function startLiveLocation() {
  // Location is now fetched from weather API data
  return;
}

window.addEventListener('DOMContentLoaded', () => {
  getLocation();
});
