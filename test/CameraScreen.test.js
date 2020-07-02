import React from 'react';
import renderer from 'react-test-renderer';

import Camera from '../Components/PlanScreens/CameraScreen';

jest.useFakeTimers();
describe('<Camera />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Camera />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});