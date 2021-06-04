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
        expect(wrapper.exists('#temperature')).toBeTruthy();

        const temperature = wrapper.find('#temperature').text();
        expect(temperature).not.toHaveLength(0);

        expect(Number(temperature)).not.toBeNaN();
    });

    it('rendres temperature mode elements and links', () => {
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
        expect(wrapper.exists('#w-conditions')).toBeTruthy();

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

    it('tests temperature modes change for Wind', () => {
        // Units => wind (C-> km/h, F-> mph)

        // Initial values
        expect(wrapper.state('mode')).toEqual('C');
        expect(wrapper.state('wind_unit')).toEqual('km/h');

        const anchorF = wrapper.find('a[data-testid="link-f"]');
        expect(anchorF.length).toEqual(1);

        anchorF.simulate('click', {
            preventDefault: () => { },
            stopPropagation: () => { },
            target: { innerText: "F" }
        });
        expect(wrapper.state('mode')).toEqual('F');
        expect(wrapper.state('wind_unit')).toEqual('mph');

        const anchorC = wrapper.find('a[data-testid="link-c"]');
        expect(anchorC.length).toEqual(1);

        anchorC.simulate('click', {
            preventDefault: () => { },
            stopPropagation: () => { },
            target: { innerText: "C" }
        });
        expect(wrapper.state('mode')).toEqual('C');
        expect(wrapper.state('wind_unit')).toEqual('km/h');
    });

    it('tests temperature modes change for Temperature conversions', () => {
        // temp changes
        // Initial values
        expect(wrapper.state('mode')).toEqual('C');
        expect(wrapper.state('temperature')).toEqual(22);

        const anchorF = wrapper.find('a[data-testid="link-f"]');
        expect(anchorF.length).toEqual(1);

        anchorF.simulate('click', {
            preventDefault: () => { },
            stopPropagation: () => { },
            target: { innerText: "F" }
        });
        expect(wrapper.state('mode')).toEqual('F');
        expect(wrapper.state('temperature')).toEqual(71.6);

        const anchorC = wrapper.find('a[data-testid="link-c"]');
        expect(anchorC.length).toEqual(1);

        anchorC.simulate('click', {
            preventDefault: () => { },
            stopPropagation: () => { },
            target: { innerText: "C" }
        });
        expect(wrapper.state('mode')).toEqual('C');
        expect(wrapper.state('temperature')).toEqual(22);
    });

    it('renders weather info board', () => {
        expect(wrapper.exists('div#info')).toBeTruthy();

        expect(wrapper.exists('div#info > div.location')).toBeTruthy();
        const location = wrapper.find('div#info > div.location').text();
        expect(location).toEqual(weatherDetails.title);

        expect(wrapper.exists('div#info > div.daytime')).toBeTruthy();
        const daytime = wrapper.find('div#info > div.daytime').text();
        expect(daytime).toEqual("Thursday 8:08 PM");

        expect(wrapper.exists('div#info > div.weatherStateName')).toBeTruthy();
        const weatherStateName = wrapper.find('div#info > div.weatherStateName').text();
        expect(weatherStateName).toEqual(weatherDetails.weather_state_name);
    });

    it('renders weather status icon', () => {
        expect(wrapper.exists('img#weatherStatusIcon')).toBeTruthy();
        expect(wrapper.find('img#weatherStatusIcon').prop('src')).toEqual(`https://www.metaweather.com/static/img/weather/${weatherDetails.weather_state_abbr}.svg`);
        expect(wrapper.find('img#weatherStatusIcon').prop('alt')).toEqual(weatherDetails.weather_state_name);
    });
});