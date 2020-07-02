import React from 'react';
import renderer from 'react-test-renderer';

import PlanList from '../Components/SearchScreens/PlanList';

describe('<PlanList />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<PlanList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});