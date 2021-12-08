import { shallow } from 'enzyme';
import WeatherWidget from './WeatherWidget';
import WeatherBanner from './WeatherBanner';
import LocationSearch from "./LocationSearch";

describe('Weather Widget Test', () => {
    it('renders banner widget', () => {
        const wrapper = shallow(<WeatherWidget />);
        expect(wrapper.exists(WeatherBanner)).toBeTruthy();
    });

    it('should render search widget', () => {
        const wrapper = shallow(<WeatherWidget />);
        expect(wrapper.exists(LocationSearch)).toBeTruthy();
    });
});