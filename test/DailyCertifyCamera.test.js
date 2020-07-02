import React from 'react';
import renderer from 'react-test-renderer';

import DailyCertifyCamera from '../Components/HomeScreens/DailyCertifyCamera';

describe('<DailyCertifyCamera />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<DailyCertifyCamera />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});