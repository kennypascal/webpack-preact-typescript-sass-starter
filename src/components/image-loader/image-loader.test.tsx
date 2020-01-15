import { h } from 'preact';
import { shallow } from 'enzyme';
import ImageLoader, { DURATION } from './image-loader';

const mockSrc = 'https://picsum.photos/seed/picsum/200/300'
const mockAlt = 'A happy test.'

let wrapper;

beforeEach(() => {
  jest.useFakeTimers();
  wrapper = shallow(<ImageLoader src={mockSrc} alt={mockAlt} />);
});


describe('ImageLoader', () => {
  it('should correctly render image-loader component when loading', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should correctly render image-loader component when loaded', () => {
    wrapper.find('img').props().onLoad();
    wrapper.update();
    expect(wrapper.state().status).toBe('loaded');
    expect(wrapper.state().isReady).toBeFalsy();
    expect(wrapper).toMatchSnapshot();
  });

  it('should correctly render image-loader component when loaded and ready', () => {
    wrapper.find('img').props().onLoad();
    wrapper.update();
    jest.advanceTimersByTime(DURATION * 2);
    expect(wrapper.state().isReady).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it('should correctly render image-loader component when error', () => {
    wrapper.find('img').props().onError();
    wrapper.update();
    expect(wrapper.state().status).toBe('error');
    expect(wrapper.state().isReady).toBeFalsy();
    expect(wrapper).toMatchSnapshot();
  });

  it('should correctly render image-loader component when error and ready', () => {
    wrapper.find('img').props().onError();
    wrapper.update();
    jest.advanceTimersByTime(DURATION * 2);
    expect(wrapper.state().isReady).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});