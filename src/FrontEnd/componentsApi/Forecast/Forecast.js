import React, { useState } from 'react';
import Conditions from '../Conditions/Conditions';
import Logo from '../Logo/Logo';
import {
    textInput,
    Radio,
    Button
} from './Forecast.module.css';

const Forecast = () => {

    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

function getForecast(e) {
    e.preventDefault();

    if (city.length === 0) {
        return setError(true);
    }

    setError(false);
    setResponseObj({});
    
    setLoading(true);
    
    const uriEncodedCity = encodeURIComponent(city);

    fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": '486882f40bmshdbb2a2e55bd4d56p132f40jsn145475e3cdb0'
        }
    })
    .then(response => response.json())
    .then(response => {
        if (response.cod !== 200) {
            throw new Error()
        }

        setResponseObj(response);
        setLoading(false);
    })
    .catch(err => {
        setError(true);
        setLoading(false);
        console.log(err.message);
    });
}

    return (
        <div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '35vh'}}>
    <Logo/>
</div>
            <h2>Find Current Weather Conditions</h2>
            <form onSubmit={getForecast}>
                <input
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    className={textInput}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    />
                <label className={Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Fahrenheit
                </label>
                <label className={Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Celcius
                </label>

                <button className={Button} type="submit">Get Forecast</button>
            </form>
            <Conditions
               responseObj={responseObj}
               error={error}
               loading={loading}
               />
        </div>
    )
}

export default Forecast;