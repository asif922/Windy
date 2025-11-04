import os
import csv
import requests
from datetime import datetime
from flask import Flask, render_template, request, jsonify, send_file
from dotenv import load_dotenv

load_dotenv()  # loads .env if present

app = Flask(__name__)

API_KEY = os.environ.get("OPENWEATHER_API_KEY")
if not API_KEY:
    raise RuntimeError("Set OPENWEATHER_API_KEY env var or put it in .env")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_FILE = os.path.join(BASE_DIR, "weather_logs.csv")
FIELDNAMES = ["timestamp", "city", "temp", "humidity", "pressure", "wind_speed", "weather"]

# Ensure CSV file exists with header. If the file already exists but is missing
# the header (e.g. came from an export without headers), prepend the header
# so csv.DictReader works as expected.
if not os.path.exists(CSV_FILE) or os.path.getsize(CSV_FILE) == 0:
    with open(CSV_FILE, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDNAMES)
        writer.writeheader()
else:
    # Check first line to see if it contains the expected header
    with open(CSV_FILE, mode="r", encoding="utf-8") as f:
        first_line = f.readline()

    needs_header = False
    if not first_line:
        needs_header = True
    else:
        # crude but effective check: see if the first field name appears in the first line
        if FIELDNAMES[0] not in first_line:
            needs_header = True

    if needs_header:
        # Read existing content and rewrite file with header followed by old content
        with open(CSV_FILE, mode="r", encoding="utf-8") as f:
            existing = f.read()
        with open(CSV_FILE, mode="w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=FIELDNAMES)
            writer.writeheader()
            # If the existing content does not end with a newline, ensure one so rows remain valid
            if existing and not existing.endswith("\n"):
                existing = existing + "\n"
            f.write(existing)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/logs")
def logs():
    return render_template("logs.html")

# Fetch weather for a city, save to CSV, and return JSON
@app.route("/get_weather", methods=["GET"])
def get_weather():
    city = request.args.get("city", "").strip()
    if not city:
        return jsonify({"status": "error", "message": "City is required"}), 400

    url = f"https://api.openweathermap.org/data/2.5/weather"
    params = {"q": city, "appid": API_KEY, "units": "metric"}
    resp = requests.get(url, params=params, timeout=10)
    data = resp.json()

    if resp.status_code != 200:
        return jsonify({"status": "error", "message": data.get("message", "Could not fetch")}), 400

    log = {
        "timestamp": datetime.utcnow().isoformat(),
        "city": data.get("name", city),
        "temp": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "pressure": data["main"]["pressure"],
        "wind_speed": data.get("wind", {}).get("speed", ""),
        "weather": data["weather"][0]["description"] if data.get("weather") else ""
    }

    # Append to CSV
    with open(CSV_FILE, mode="a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDNAMES)
        writer.writerow(log)

    return jsonify({"status": "success", "data": log})

# Read logs from CSV and return JSON (most recent first)
@app.route("/get_logs", methods=["GET"])
def get_logs():
    logs = []
    with open(CSV_FILE, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            logs.append(row)
    # sort descending by timestamp and return up to N (optional)
    logs_sorted = sorted(logs, key=lambda x: x["timestamp"], reverse=True)
    # convert numeric fields to numbers for convenience (optional)
    for row in logs_sorted:
        try:
            row["temp"] = float(row["temp"])
            row["humidity"] = int(float(row["humidity"]))
            row["pressure"] = int(float(row["pressure"]))
            row["wind_speed"] = float(row["wind_speed"]) if row["wind_speed"] != "" else 0
        except Exception:
            pass
    return jsonify(logs_sorted)

# Download CSV file
@app.route("/download_csv", methods=["GET"])
def download_csv():
    return send_file(CSV_FILE, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
