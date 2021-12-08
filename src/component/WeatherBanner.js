import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';

export default class WeatherBanner extends Component {
    static propTypes = {
        weather: PropTypes.object.isRequired
    }
    state = {
        mode: null,
        wind_value: this.props.weather.wind_speed,
        wind_unit: null,
        temperature: this.props.weather.the_temp
    }
    componentDidMount() {
        this.changeModeTo('C');
    }
    celsiusToFahrenheit = () => {
        return (this.props.weather.the_temp * (9 / 5)) + 32;
    }
    changeModeTo = (modeToChange) => {
        let wind_value = this.props.weather.wind_speed;
        let wind_unit = 'knots';
        let temperature = this.props.weather.the_temp;

        if (!this.state.mode || (this.state.mode && modeToChange !== this.state.mode)) {
            if (modeToChange === 'C') {
                wind_value *= 1.852;
                wind_unit = 'km/h';
            } else {
                wind_value *= 1.150779;
                wind_unit = 'mph';
                temperature = this.celsiusToFahrenheit();
            }

            this.setState({
                mode: modeToChange,
                wind_value: wind_value.toFixed(0),
                wind_unit,
                temperature
            });
        }
    }
    handleModeChange = (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.changeModeTo(event.target.innerText);
    }
    render() {
        const url = '';
        const date = new Date(Date.parse(this.props.weather.time));

        return (
            <div className="weather-banner">
                <div>
                    <img className="weatherStatusIcon" src={api.fetchIconUrl(this.props.weather.weather_state_abbr)}
                        alt={this.props.weather.weather_state_name} />
                </div>
                <div id="temperature" className="temperature">{this.state.temperature}</div>
                <div id="temperature-mode" className="temperature-mode">
                    <span className="degree-icon">&deg;</span>
                    <a href={url} data-testid='link-c' onClick={this.handleModeChange}>C</a>
                    <span>|</span>
                    <a href={url} data-testid='link-f' onClick={this.handleModeChange}>F</a>
                </div>
                <div id="w-conditions" className="w-conditions">
                    <div>Visibility: {this.props.weather.visibility}%</div>
                    <div>Humidity: {this.props.weather.humidity}%</div>
                    <div>Wind: {this.state.wind_value} {this.state.wind_unit}</div>
                </div>
                <div className="info" id="info">
                    <div className="location">{this.props.weather.title}</div>
                    <div className="daytime">
                        {date.toLocaleString('en-US', { weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true })}
                    </div>
                    <div className="weatherStateName">{this.props.weather.weather_state_name}</div>
                </div>
            </div>
        )
    }
};