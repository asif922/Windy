# Windy - Personal Weather Logger

Windy is a modern, responsive web application that allows users to log and track weather data from around the world. Built with Flask backend and Firebase authentication, it provides real-time weather information with a clean, intuitive interface.

## 🌟 Features

### Core Functionality
- **Real-time Weather Fetching**: Get current weather data by city name or automatic location detection
- **Weather Logging**: Automatically save weather readings to a local CSV database
- **User Authentication**: Secure login/signup with email/password, Google, and Microsoft OAuth
- **Interactive Dashboard**: View latest weather readings and temperature trends with charts
- **Searchable Logs**: Browse and search through weather history with filtering capabilities
- **CSV Export**: Download weather logs as CSV files for external analysis

### Technical Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Secure API Integration**: Server-side OpenWeather API calls keep API keys protected
- **Real-time Charts**: Dynamic temperature charts using Chart.js
- **Location Services**: Automatic geolocation for instant weather updates
- **Firebase Authentication**: Robust user management with multiple sign-in options

## 🚀 Quick Start

### Prerequisites
- Python 3.7+
- Node.js (for Firebase dependencies)
- OpenWeather API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Weather_app
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r src/requirements.txt
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the `src/` directory:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```

5. **Run the application**
   ```bash
   cd src
   python app.py
   ```

6. **Open in browser**
   Navigate to `http://localhost:5000`

## 📱 Usage

### Authentication
- Visit `/auth` to sign up or log in
- Choose from email/password authentication or social login (Google/Microsoft)
- Password reset functionality available

### Home Page
- Automatic weather detection using geolocation
- Displays current temperature and humidity
- Requires user authentication

### Dashboard
- Manual weather search by city name
- Latest weather reading display
- Temperature trend chart (last 15 readings)
- CSV download option

### Logs
- Complete weather history in tabular format
- Real-time search and filtering
- Displays timestamp, city, temperature, humidity, pressure, wind speed, and weather description

## 🏗️ Architecture

### Backend (Flask)
- **app.py**: Main application with routes and API endpoints
- **weather_logs.csv**: Local data storage for weather readings
- **requirements.txt**: Python dependencies

### Frontend
- **Templates**: Jinja2 HTML templates for different pages
- **Static Assets**: CSS styling, JavaScript functionality, images
- **Firebase Integration**: Client-side authentication handling

### Key Endpoints
- `GET /`: Home page with live weather
- `GET /auth`: Authentication page
- `GET /dashboard`: Weather dashboard
- `GET /logs`: Weather logs viewer
- `GET /get_weather?city=<city>`: Fetch weather by city
- `GET /get_weather_coords?lat=<lat>&lon=<lon>`: Fetch weather by coordinates
- `GET /get_logs`: Retrieve weather logs as JSON
- `GET /download_csv`: Download logs as CSV file

## 🔧 Configuration

### Environment Variables
- `OPENWEATHER_API_KEY`: Required API key from OpenWeatherMap

### Firebase Configuration
Update `src/static/js/firebaseConfig.js` with your Firebase project credentials:
```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    // ... other config
};
```

## 📊 Data Structure

Weather logs are stored in CSV format with the following fields:
- `timestamp`: UTC timestamp in ISO format
- `city`: City name
- `temp`: Temperature in Celsius
- `humidity`: Humidity percentage
- `pressure`: Atmospheric pressure in hPa
- `wind_speed`: Wind speed in m/s
- `weather`: Weather description

## 🎨 Design

- **Color Scheme**: Blue and white theme with gradient accents
- **Typography**: Poppins font family
- **Background**: Weather-themed background image with blur effect
- **Responsive**: Mobile-first design with breakpoints for tablet and desktop

## 🔒 Security

- API keys stored server-side, never exposed to client
- Firebase authentication for user management
- Input validation and sanitization
- HTTPS recommended for production deployment

## 🚀 Deployment

### Local Development
```bash
cd src
python app.py
```

### Production
Consider using:
- Gunicorn for WSGI server
- Nginx for reverse proxy
- Docker for containerization
- Environment-specific configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenWeatherMap API for weather data
- Firebase for authentication services
- Chart.js for data visualization
- Google Fonts for typography

---

**Windy** - Your personal weather companion, keeping you informed and prepared for any weather condition.
