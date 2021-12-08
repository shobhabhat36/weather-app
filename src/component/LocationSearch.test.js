import {shallow} from "enzyme";
import LocationSearch from "./LocationSearch";

describe('Location search widget', () => {
  it('should contain text input and search button', function () {
    const wrapper = shallow(<LocationSearch/>);

    const searchInput = wrapper.find('input.search-input')
    expect(searchInput.length).toEqual(1);

    const searchButton = wrapper.find('button');
    expect(searchButton.length).toEqual(1);
  });
});