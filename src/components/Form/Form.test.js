import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Form from './Form';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() });
describe('Form', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Form/>)
  });
  it('should render form currectly', () => {

  });
});