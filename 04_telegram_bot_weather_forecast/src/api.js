import axios from 'axios';

const APP_ID = process.env.APP_ID;
const DAY = 24;
const DEFAULT_PERIOD = 3;
const URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${APP_ID}&q=Hadiach&units=metric`;

const forecastToString = (list, period) => {
  const interval = period / DEFAULT_PERIOD;
  const dayForecast = DAY / DEFAULT_PERIOD;

  let forecast = '<em><b>Forecast in Hadiach</b></em>\n\n';
  for (let i = 0; i < dayForecast; i += interval) {
    const item = list[i];
    forecast += `<b>${item.dt_txt}</b>\n\n` +
      `Temperature: ${Math.round(item.main.temp)}°C (feels like ${Math.round(item.main.feels_like)}°C)\n` +
      `Pressure: ${item.main.pressure}hPa\n` +
      `Humidity: ${item.main.humidity}%\n` +
      `Wind Speed: ${item.wind.speed}m/s\n` +
      `Visibility: ${item.visibility / 1000}km\n` +
      `Description: ${item.weather[0].description}\n\n`;
  }
  return forecast;
}

export const getForecast = async (period) => {
  const { data } = await axios.get(URL);
  return forecastToString(data.list, period);
}