import {mount, shallow} from 'enzyme';
import WeatherWidget from './WeatherWidget';
import WeatherBanner from './WeatherBanner';
import LocationSearch from "./LocationSearch";
import * as api from '../api';

describe('Weather Widget Test', () => {
    it('renders banner widget', () => {
        const wrapper = shallow(<WeatherWidget />);
        expect(wrapper.exists(WeatherBanner)).toBeTruthy();
    });

    it('should render search widget', () => {
        const wrapper = shallow(<WeatherWidget />);
        expect(wrapper.exists(LocationSearch)).toBeTruthy();
    });

    it('should fetch the data for weather banner', (done) =>  {
        jest.spyOn(api, "fetchLocationLatLong") .mockResolvedValue({
            latitude: 1, longitude: 1
        });
        jest.spyOn(api, "fetchLocation").mockResolvedValue(2295420);
        jest.spyOn(api, "fetchWeatherDetails").mockResolvedValue({
            "consolidated_weather": [
                {
                    "id": 6681373675880448,
                    "weather_state_name": "Showers",
                    "weather_state_abbr": "s",
                    "wind_direction_compass": "WSW",
                    "created": "2021-12-09T06:59:02.266613Z",
                    "applicable_date": "2021-12-09",
                    "min_temp": 4.09,
                    "max_temp": 8,
                    "the_temp": 6.63,
                    "wind_speed": 6.982250044086534,
                    "wind_direction": 250.8286704587942,
                    "air_pressure": 1003,
                    "humidity": 73,
                    "visibility": 8.8843653066094,
                    "predictability": 73
                },
                {
                    "id": 5515624190050304,
                    "weather_state_name": "Showers",
                    "weather_state_abbr": "s",
                    "wind_direction_compass": "WNW",
                    "created": "2021-12-09T06:59:01.448756Z",
                    "applicable_date": "2021-12-10",
                    "min_temp": 3.9299999999999997,
                    "max_temp": 7.6,
                    "the_temp": 6.140000000000001,
                    "wind_speed": 9.773156429576607,
                    "wind_direction": 302.173757392195,
                    "air_pressure": 1000,
                    "humidity": 72,
                    "visibility": 12.848402827487472,
                    "predictability": 73
                }
            ],
            "time": "2021-12-09T08:07:40.916156Z",
            "sun_rise": "2021-12-09T07:54:01.824145Z",
            "sun_set": "2021-12-09T15:51:37.864015Z",
            "timezone_name": "LMT",
            "parent": {
                "title": "England",
                "location_type": "Region / State / Province",
                "woeid": 24554868,
                "latt_long": "52.883560,-1.974060"
            },
            "sources": [
                {
                    "title": "BBC",
                    "slug": "bbc",
                    "url": "http://www.bbc.co.uk/weather/",
                    "crawl_rate": 360
                }
            ],
            "title": "London",
            "location_type": "City",
            "woeid": 44418,
            "latt_long": "51.506321,-0.12714",
            "timezone": "Europe/London"
        });

        const wrapper = mount(<WeatherWidget />, { disableLifecycleMethods: true });
        const spyDidMount = jest.spyOn(WeatherWidget.prototype,"componentDidMount");
        const didMount = wrapper.instance().componentDidMount();
        expect(spyDidMount).toHaveBeenCalled();

        didMount.then(() => {
            wrapper.update();

            expect(wrapper.state().weatherDetails).toEqual({
                "air_pressure": 1003,
                "applicable_date": "2021-12-09",
                "created": "2021-12-09T06:59:02.266613Z",
                "humidity": 73,
                "id": 6681373675880448,
                "max_temp": 8,
                "min_temp": 4.09,
                "predictability": 73,
                "sun_rise": "2021-12-09T07:54:01.824145Z",
                "sun_set": "2021-12-09T15:51:37.864015Z",
                "the_temp": 6.63,
                "time": "2021-12-09T08:07:40.916156Z",
                "title": "London",
                "visibility": 8.9,
                "weather_state_abbr": "s",
                "weather_state_name": "Showers",
                "wind_direction": 250.8286704587942,
                "wind_direction_compass": "WSW",
                "wind_speed": 6.982250044086534
            });

            spyDidMount.mockRestore();
            wrapper.unmount();
            done();
        });

    });
});