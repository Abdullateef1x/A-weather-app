import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import Search_Icon from '../Assets/search.png'
import cloud_Icon from '../Assets/cloud.png'
import drizzle_Icon from '../Assets/drizzle.png'
import humidity_Icon from '../Assets/humidity.png'
import rain_Icon from '../Assets/rain.png'
import snow_Icon from '../Assets/snow.png'
import wind_Icon from '../Assets/wind.png'
import clear_Icon from '../Assets/clear.png'

const Weather = () => {

  const inputRef = useRef()
  
  const [weatherData, setWeatherData] = useState(false)

  const myIcons = {
    "01d": clear_Icon,
    "01n": clear_Icon,
    "02d": cloud_Icon,
    "02n": cloud_Icon,
    "03d": cloud_Icon,
    "03n": cloud_Icon,
     "04d": drizzle_Icon,
    "04n": drizzle_Icon,
    "09d": rain_Icon,
    "09n":  rain_Icon,
    "010d": rain_Icon, 
    "010n": rain_Icon,
    "013d": snow_Icon,
    "013n": snow_Icon,

  }

  const search = async (city) => {

    if (city === "") {
      alert("Please enter city name")
      return;      
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

      const response = await fetch(url)
      const data = await response.json()

      if(!response.ok){
        alert(data.message)
        return;
      }

      console.log(data)
      const icon = myIcons[data.weather[0].icon] || clear_Icon


      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon
      })


    } catch (error) {
      setWeatherData(false)
      console.error("Error in fetching weather data")
    }
  }

  useEffect(()=>{
    search("Abuja")
  }, [])

  return (
    <div className='weather'>
      <div className='search-menu'>
        <input ref={inputRef} type='text' placeholder='Search' />
        <img src={Search_Icon} alt='' onClick={()=>search(inputRef.current.value)} />
      </div>
      {weatherData?<>
        <img src={weatherData.icon} alt='' />
      <p className='temp_degree'>{weatherData.temperature}°C</p>
      <p className='location'>{weatherData.location}</p>
      <div className='bottom'>
        <div  className='class_icons' >
              <img src={humidity_Icon} alt=''/>
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
                </div>
                </div>
                <div  className='class_icons' >
              <img src={wind_Icon} alt='' />
              
              <div>
                <p>{weatherData.windSpeed}km/h</p>
                <span>Wind speed</span>
                </div>
                </div>
        </div>
      
      </>:<></>}
      
      
    </div>
  )
}

export default Weather
