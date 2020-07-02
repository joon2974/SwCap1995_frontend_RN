import React from 'react';
import renderer from 'react-test-renderer';

import LoginScreen from '../Components/LoginScreens/LoginScreen';

jest.useFakeTimers();
describe('<LoginScreen />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});