import { h } from 'preact';
import { mount } from 'enzyme';
import Counter from './counter';

let wrapper;

beforeEach(() => {
  wrapper = mount(<Counter initialCount={5} />);
});

describe('Counter', () => {
  
  it('should display initial count', () => {
    // const wrapper = mount(<Counter initialCount={5} />);
    expect(wrapper.text()).toContain('Current value: 5');
  });

  it('should increment after "Increment" button is clicked', () => {
    // const wrapper = mount(<Counter initialCount={5} />);
    wrapper.find('button').simulate('click');
    expect(wrapper.text()).toContain('Current value: 6');
  });
});