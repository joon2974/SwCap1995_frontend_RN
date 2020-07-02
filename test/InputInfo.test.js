import React from 'react';
import renderer from 'react-test-renderer';

import InputInfo from '../Components/LoginScreens/InputInfo';

describe('<InputInfo />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<InputInfo />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});