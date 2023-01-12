import { useState, useEffect } from 'react'
import {
  getWeatherDataByCity,
  getWeatherData,
  getDailyWeatherData,
} from './api/fetchWeather'
import { FiSend } from 'react-icons/fi'
import { BsDroplet } from 'react-icons/bs'
import { GiKimono, GiWindsock } from 'react-icons/gi'
import {
  convertToWeekday,
  getCurrentWeekday,
  getCurrentDate,
} from './utils/convertToDate'

function App() {
  const [weatherData, setWeatherData] = useState()
  const [dailyForecast, setDailyForecast] = useState()
  //get city name or user location coordinates for search
  const [query, setQuery] = useState('')
  // const query = useRef()

  //fetch weather data based on city name
  const searchLocation = async (e) => {
    const data = await getWeatherDataByCity(query)
    setWeatherData(data)
    if (data.city.coord.lat && data.city.coord.lon) {
      const daily = await getDailyWeatherData(
        data.city.coord.lat,
        data.city.coord.lon
      )
      setDailyForecast(daily.daily)
    }
    setQuery('')
  }

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      searchLocation(e)
    }
  }

  //store longitude and latitude from user location

  //fetch weather data based on geolocation in user's browser
  //!navigator.geolocation does't use GPS to get latitude and longitude.
  //!Mostly the location return by this api is the location of user internet service providers hub/center etc.
  //!Can give low precisely result of user location.
  useEffect(() => {
    let lat, long
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          lat = position.coords.latitude
          long = position.coords.longitude
          if (lat && long) {
            const fetchData = async (e) => {
              const data = await getWeatherData(lat, long)
              setWeatherData(data)
              const daily = await getDailyWeatherData(lat, long)
              setDailyForecast(daily.daily)
            }
            fetchData().catch(console.error)
          }
        },
        () => {},
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      )
    } else {
      alert(
        'Your geolocation is not available. Please type name of the city in search box or enable geolocation in your browser'
      )
    }
  }, [])

  return (
    <div className='app'>
      <div className='container'>
        {weatherData === undefined ? (
          <div className='loader_container'>
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {' '}
            <div className='container_search'>
              <input
                type='text'
                value={query}
                placeholder='Enter location...'
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeypress}
              />
              <FiSend onClick={searchLocation} />
            </div>
            <div className='app_top'>
              <div className='container_city'>
                {weatherData !== undefined && <p>{weatherData.city.name}</p>}
              </div>
              <div>
                <div className='today_forecast'>
                  <p className='today_forecast_p'>Today weather forecast</p>
                </div>
                <span className='today_forecast_span'></span>
                <div className='container_date'>
                  <p>{getCurrentWeekday()}</p>
                  <p>{getCurrentDate()}</p>
                </div>
              </div>
              <div className='container_temp'>
                <div className='container_main_data'>
                  <div className='container_temp_weather'>
                    <div className='container_weather_num'>
                      {weatherData !== undefined && (
                        <h1>{weatherData.list[0].main.temp.toFixed()}</h1>
                      )}
                      <div className='weather_cel'>
                        <span>°C</span>
                      </div>
                    </div>
                    <div className='weather_description'>
                      {weatherData && (
                        <h3>{weatherData.list[0].weather[0].description}</h3>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {weatherData !== undefined && (
              <div className='app_bottom'>
                <div className='container_forecast'>
                  <div className='container_feels'>
                    <div className='container_p'>
                      <p>feeling</p>
                    </div>
                    <GiKimono className='icon' />
                    {weatherData !== undefined && (
                      <p>{weatherData.list[0].main.feels_like.toFixed()}°C</p>
                    )}
                  </div>
                  <div className='container_humidity'>
                    <div className='container_p'>
                      <p>humidity</p>
                    </div>
                    <BsDroplet className='icon' />
                    {weatherData !== undefined && (
                      <p>{weatherData.list[0].main.humidity}%</p>
                    )}
                  </div>
                  <div className='container_wind'>
                    <div className='container_p'>
                      <p>wind</p>
                    </div>
                    <GiWindsock className='icon' />
                    {weatherData !== undefined && (
                      <p>{weatherData.list[0].wind.speed.toFixed()} m/s</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className='daily_forecast_container'>
              <div className='daily_forecast'>
                <p className='today_forecast_p'>5 days weather forecast</p>
              </div>
              <span className='daily_forecast_span'></span>
              <div className='daily_forecast_content_wrapper'>
                {dailyForecast !== undefined &&
                  dailyForecast.slice(1, 6).map((day, idx) => (
                    <div key={idx} className='daily_forecast_content'>
                      <p>{convertToWeekday(day)}</p>
                      <div>Max: {day.temp.max.toFixed()}°C</div>
                      <div>Min: {day.temp.min.toFixed()}°C</div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
