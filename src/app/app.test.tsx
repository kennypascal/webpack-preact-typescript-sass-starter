import { h } from 'preact';
import { shallow } from 'enzyme';
import App from './app';

describe('App', () => {
  test('should render component correctly', () => {
    const component = shallow(<App />);
    expect(component.text()).toContain('En las montañas codificamos.')
  });
});