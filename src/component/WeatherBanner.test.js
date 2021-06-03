import { mount, shallow } from "enzyme";
import WeatherBanner from "./WeatherBanner"

describe('Weather Banner Test', () => {
    it('renders temperature div with numeric value', () => {
        const wrapper = shallow(<WeatherBanner />);
        expect(wrapper.exists('#temperature')).toBeTruthy();

        const temperature = wrapper.find('#temperature').text();
        expect(temperature).not.toHaveLength(0);

        expect(Number(temperature)).not.toBeNaN();
    });

    it('rendres temperature mode elements and links', () => {
        const wrapper = mount(<WeatherBanner />);
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
});