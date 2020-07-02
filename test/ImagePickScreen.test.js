import React from 'react';
import renderer from 'react-test-renderer';

import ImagePickScreen from '../Components/PlanScreens/ImagePickScreen';

describe('<ImagePickScreen />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ImagePickScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});