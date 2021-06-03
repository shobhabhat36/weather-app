import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class WeatherBanner extends Component {
    static propTypes = {
        weather: PropTypes.object.isRequired
    }
    state = {
        mode: 'C'
    }
    componentDidMount() {
        let wind_value = this.props.weather.wind_speed;
        let wind_unit = 'knots';
        if (this.state.mode === 'C') {
            wind_value *= 1.852;
            wind_unit = 'km/h';
        } else {
            wind_value *= 1.150779;
            wind_unit = 'mph';
        }

        this.setState({
            wind_value: wind_value.toFixed(0),
            wind_unit
        });
    }
    render() {
        let url = '';
        return (
            <>
                <div id="temperature" className="temperature">{this.props.weather.the_temp}</div>
                <div id="temperature-mode" className="temperature-mode">
                    <span>&deg;</span>
                    <a href={url}>C</a>
                    <span>|</span>
                    <a href={url}>F</a>
                </div>
                <div id="w-conditions" className="w-conditions">
                    <div>Visibility: {this.props.weather.visibility}%</div>
                    <div>Humidity: {this.props.weather.humidity}%</div>
                    <div>Wind: {this.state.wind_value} {this.state.wind_unit}</div>
                </div>
            </>
        )
    }
};