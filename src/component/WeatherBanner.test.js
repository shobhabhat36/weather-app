import { shallow } from "enzyme";
import WeatherBanner from "./WeatherBanner"

describe('Weather Banner Test', () => {
    it('', () => {
        const wrapper = shallow(<WeatherBanner />);
        expect(wrapper.exists('#temperature')).toBeTruthy();

        const temperature = wrapper.find('#temperature').text();
        expect(temperature).not.toBeNull();
    });
});