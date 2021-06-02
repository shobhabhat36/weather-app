import { shallow } from 'enzyme';
import App from './App';
import WeatherWidget from './component/WeatherWidget';

describe('App Test', () => {
  it('renders App', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).not.toBeNull();
  });

  it('renders weather component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists(WeatherWidget)).toBeTruthy();
  });

});
