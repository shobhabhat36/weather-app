import React, { Component } from 'react'
import WeatherBanner from './WeatherBanner';
import LocationSearch from "./LocationSearch";

export default class WeatherWidget extends Component {
    render() {
        const weatherDetails = {
            title: 'London',
            time: "2021-06-03T15:38:47.548513+01:00",
            sun_rise: "2021-06-03T04:47:26.942856+01:00",
            sun_set: "2021-06-03T21:10:34.736411+01:00",
            weather_state_name: "Heavy Cloud",
            weather_state_abbr: "hc",
            wind_direction_compass: "SW",
            created: "2021-06-03T12:32:01.665334Z",
            applicable_date: "2021-06-03",
            min_temp: 15,
            max_temp: 25,
            the_temp: 22,
            wind_speed: 4.884203890977641,
            wind_direction: 229.3329905781327,
            air_pressure: 1019,
            humidity: 59,
            visibility: 10,
            predictability: 71
        };
        return (
            <div>
                <LocationSearch />
                <WeatherBanner weather={weatherDetails} />
            </div>
        )
    }
}