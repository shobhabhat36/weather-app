import { mount, shallow } from "enzyme";
import WeatherBanner from "./WeatherBanner"

describe('Weather Banner Test', () => {
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

    let wrapper;
    beforeAll(() => {
        wrapper = shallow(<WeatherBanner weather={weatherDetails} />);
    })

    it('renders temperature div with numeric value', () => {
        // const wrapper = shallow(<WeatherBanner weather={{}} />);
        expect(wrapper.exists('#temperature')).toBeTruthy();

        const temperature = wrapper.find('#temperature').text();
        expect(temperature).not.toHaveLength(0);

        expect(Number(temperature)).not.toBeNaN();
    });

    it('rendres temperature mode elements and links', () => {
        // const wrapper = mount(<WeatherBanner weather={{}} />);
        expect(wrapper.exists('#temperature-mode')).toBeTruthy();

        const tempModeDiv = wrapper.find('#temperature-mode');
        //children validations degree simbol, link to C and F mode
        expect(tempModeDiv.children().length).toBeGreaterThan(0);

        expect(tempModeDiv.childAt(0).text()).toEqual('°');
        expect(tempModeDiv.childAt(2).text()).toEqual('|');

        expect(tempModeDiv.childAt(1).name()).toEqual('a');
        expect(tempModeDiv.childAt(1).text()).toEqual('C');

        expect(tempModeDiv.childAt(3).name()).toEqual('a');
        expect(tempModeDiv.childAt(3).text()).toEqual('F');
    });

    it('renders weather conditions Visibility, Humidity, and Wind', () => {
        // const wrapper = shallow(<WeatherBanner weather={weatherDetails} />);
        expect(wrapper.exists('#w-conditions')).toBeTruthy();

        //Visibility, Humidity, Wind
        // Units => wind (C-> km/h, F-> mph)
        const weatherConditionDiv = wrapper.find('#w-conditions');
        expect(weatherConditionDiv.children().length).toEqual(3);

        expect(weatherConditionDiv.childAt(0).name()).toEqual('div');
        expect(weatherConditionDiv.childAt(0).text()).toEqual(`Visibility: ${weatherDetails.visibility}%`);

        expect(weatherConditionDiv.childAt(1).name()).toEqual('div');
        expect(weatherConditionDiv.childAt(1).text()).toEqual(`Humidity: ${weatherDetails.humidity}%`);

        expect(weatherConditionDiv.childAt(2).name()).toEqual('div');
        expect(weatherConditionDiv.childAt(2).text())
            .toEqual(`Wind: ${wrapper.state('wind_value')} ${wrapper.state('wind_unit')}`);
    });
});