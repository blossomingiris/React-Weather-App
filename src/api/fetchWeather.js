import axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY
const URL = process.env.REACT_APP_URL
const URL_DAILY = process.env.REACT_APP_URL_DAILY_FORECAST

//API request for current weather forecast based on city
export const getWeatherDataByCity = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      units: 'metric',
      appid: API_KEY,
    },
  })
  return data
}

//API request for current weather forecast based on longitude and latitude
export const getWeatherData = async (latitude, longitude) => {
  const { data } = await axios.get(URL, {
    params: {
      lat: latitude,
      lon: longitude,
      units: 'metric',
      appid: API_KEY,
    },
  })
  return data
}

//API request for daily weather forecast
export const getDailyWeatherData = async (latitude, longitude) => {
  const { data } = await axios.get(URL_DAILY, {
    params: {
      lat: latitude,
      lon: longitude,
      units: 'metric',
      appid: API_KEY,
    },
  })
  return data
}
