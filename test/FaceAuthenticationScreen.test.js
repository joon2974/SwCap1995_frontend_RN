import React from 'react';
import renderer from 'react-test-renderer';

import FaceAuthenticationScreen from '../Components/HomeScreens/FaceAuthenticationScreen';

jest.useFakeTimers();
describe('<FaceAuthenticationScreen />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<FaceAuthenticationScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});