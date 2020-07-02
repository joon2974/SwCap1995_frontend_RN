import React from 'react';
import renderer from 'react-test-renderer';

import NavigateScreen from '../Components/NavigateScreen';

describe('<NavigateScreen />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<NavigateScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});