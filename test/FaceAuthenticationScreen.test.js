import React from 'react';
import renderer from 'react-test-renderer';

import FaceAuthenticationScreen from '../Components/HomeScreens/FaceAuthenticationScreen';

describe('<FaceAuthenticationScreen />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<FaceAuthenticationScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});