import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class WeatherBanner extends Component {
    static propTypes = {
        weather: PropTypes.object.isRequired
    }
    state = {
        mode: null,
        wind_value: this.props.weather.wind_speed,
        wind_unit: null
    }
    componentDidMount() {
        this.changeModeTo('C');
    }
    changeModeTo = (modeToChange) => {
        let wind_value = this.props.weather.wind_speed;
        let wind_unit = 'knots';

        if (!this.state.mode || (this.state.mode && modeToChange !== this.state.mode)) {
            if (modeToChange === 'C') {
                wind_value *= 1.852;
                wind_unit = 'km/h';
            } else {
                wind_value *= 1.150779;
                wind_unit = 'mph';
            }

            this.setState({
                mode: modeToChange,
                wind_value: wind_value.toFixed(0),
                wind_unit
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
        return (
            <>
                <div id="temperature" className="temperature">{this.props.weather.the_temp}</div>
                <div id="temperature-mode" className="temperature-mode">
                    <span>&deg;</span>
                    <a href={url} data-testid='link-c' onClick={this.handleModeChange}>C</a>
                    <span>|</span>
                    <a href={url} data-testid='link-f' onClick={this.handleModeChange}>F</a>
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