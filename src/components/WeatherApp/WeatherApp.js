import React, { useState } from 'react';
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';


const WeatherApp = () => {
    const api_key = "27d6714a4d706b7cc9732e25727099d1";
    const [weatherData, setWeatherData] = useState({
        humidity: '',
        windSpeed: '',
        temperature: '',
        location: '',
        condition: 'cloud', // Default condition
    });

    const weatherIcons = {
        search: search_icon,
        clear: clear_icon,
        cloud: cloud_icon,
        drizzle: drizzle_icon,
        rain: rain_icon,
        snow: snow_icon,
        wind: wind_icon,
        humidity: humidity_icon,
    };

    const getWeatherIcon = (condition) => {
        return weatherIcons[condition] || cloud_icon; // Default to cloud icon if condition not found
    };

    const search = async () => {
        try {
            const element = document.getElementsByClassName("cityInput")[0];

            if (element.value === "") {
                return;
            }

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=metric&appid=${api_key}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Weather data request failed with status ${response.status}`);
            }

            const data = await response.json();

            setWeatherData({
                humidity: `${data.main.humidity}%`,
                windSpeed: `${data.wind.speed} km/h`,
                temperature: `${data.main.temp}°C`,
                location: data.name,
                condition: data.weather[0].main.toLowerCase(), // Use the actual weather condition
            });
        } catch (error) {
            console.error("An error occurred:", error);
            // You may want to add user-friendly error handling here
            // For example, set an error state or display a notification
        }
    };

    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder="search" />
                <div className="search-icon" onClick={() => { search() }}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className='weather-image'>
                <img src={getWeatherIcon(weatherData.condition)} alt="" />
            </div>
            <div className='weather-temp'>{weatherData.temperature}</div>
            <div className='weather-location'>{weatherData.location}</div>
            <div className='data-container'>
                <div className='element'>
                    <img src={humidity_icon} alt="" className='icon' />
                    <div className='data'>
                        <div className='humidity-percent'>{weatherData.humidity}</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>

                <div className='element'>
                    <img src={wind_icon} alt="" className='icon' />
                    <div className='data'>
                        <div className='wind-rate'>{weatherData.windSpeed}</div>
                        <div className='text'>Wind speed</div>
                    </div>
                </div>
            </div>
            <div className="link">
        <p className='link-text'>Created by Vincent Otis <a href="https://otis-ke.github.io/otiswebsite.github.io/" target="_blank" rel="noopener noreferrer"> @otis ke</a></p>
         
      </div>
        </div>
    );
};

export default WeatherApp;


