<img src="https://user-images.githubusercontent.com/102720711/203282659-4a5e7ae5-2bc6-49b5-ac51-d779fe357d6c.png"/> 

# Weather application (React) :partly_sunny:

## Description: 
:heavy_check_mark: allows the user to get real-time  weather information for current position and for any city of the world</br>
:heavy_check_mark: weather information contains current conditions: temperature, pressure, humidity and wind and also includes forecasts for 5 day outlook with max and min temperature</br>

## Technologies: 
- React.js
- OpenWeather API

## Demo: 
[Here](https://weathering-with-you.onrender.com)

## Usage:
- Allow browser use your location and start to search typing city's name in search box.

### Issues
1. To get current location i use navigator.geolocation API which returns a user geolocation based on the user's browser position. Unfortunately it can be not always precise. 
2. There is delay in API request for daily forecast. Sometimes doesn't update momently.

## How to get started with app?
- Make sure you have own credentials in frontend/.env for REACT_APP_API_KEY (API key for OpenWeather API),  REACT_APP_URL( https://api.openweathermap.org/data/2.5/forecast) and REACT_APP_URL_DAILY_FORECAST (https://api.openweathermap.org/data/2.5/onecall)
1. Clone the repo or download it
2. Open your terminal on frontend folder and run command "npm install"
3. Having terminal open run command "npm start"
