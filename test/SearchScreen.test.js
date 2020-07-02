import React from 'react';
import renderer from 'react-test-renderer';

import SearchScreen from '../Components/SearchScreens/SearchScreen';

describe('<SearchScreen />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SearchScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});