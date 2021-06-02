import { shallow } from 'enzyme';
import WeatherWidget from './WeatherWidget';
import WeatherBanner from './WeatherBanner';

describe('Weather Widget Test', ()=>{
    it('renders banner widget', ()=>{
        const wrapper = shallow(<WeatherWidget/>);
        expect(wrapper.exists(WeatherBanner)).toBeTruthy();
    });
});