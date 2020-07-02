import React from 'react';
import renderer from 'react-test-renderer';

import FriendScreen from '../Components/FriendScreens/FriendScreen';

describe('<FriendScreen />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<FriendScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});