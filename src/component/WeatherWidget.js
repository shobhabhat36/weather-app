import React, { Component } from 'react'
import WeatherBanner from './WeatherBanner';
import LocationSearch from "./LocationSearch";
import * as api from "../api";
import {round} from "lodash";

export default class WeatherWidget extends Component {
    state = {
        weatherDetails: {
            title: "Bangalore",
            time: "2021-12-09T13:21:15.154844+05:30",
            sun_rise: "2021-12-09T06:30:14.097866+05:30",
            sun_set: "2021-12-09T17:53:24.748508+05:30",
            weather_state_name: "Showers",
            weather_state_abbr: "s",
            wind_direction_compass: "E",
            created: "2021-12-09T07:41:07.767771Z",
            applicable_date: "2021-12-09",
            min_temp: 19.285,
            max_temp: 27.075000000000003,
            the_temp: 25.445,
            wind_speed: 4.569322094117023,
            wind_direction: 89.33363440402731,
            air_pressure: 1015.5,
            humidity: 73,
            visibility: 11.222585102998488,
            predictability: 77
        }
    }
    async componentDidMount() {
        const location = await api.fetchLocationLatLong();
        const woeid = await api.fetchLocation(location.latitude, location.longitude);
        const weatherComplete = await api.fetchWeatherDetails(woeid);
        this.transform(weatherComplete);
    }

    transform = (weatherComplete) => {
        const consolidatedWeather = weatherComplete['consolidated_weather'];
        const current = new Date(weatherComplete.time).toISOString().slice(0, 10);
        const currentWeather = consolidatedWeather.find(({applicable_date}) => applicable_date === current);
        const weatherDetails = {
            title: weatherComplete.title,
            time: weatherComplete.time,
            sun_rise: weatherComplete.sun_rise,
            sun_set: weatherComplete.sun_set,
            ...currentWeather,
            visibility: round(currentWeather.visibility, 1)
        };
        this.setState({ weatherDetails });
    }

    render() {
        return (
            <div>
                <LocationSearch />
                <WeatherBanner weather={this.state.weatherDetails} />
            </div>
        )
    }
}