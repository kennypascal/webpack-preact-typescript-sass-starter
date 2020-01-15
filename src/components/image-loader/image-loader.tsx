import './image-loader.scss';
import { Component, h } from 'preact';
// import ContentInterface from '../prop-types/content-interface';
// import CeError from '../loading/ce-error';
// import CeLoading from '../loading/ce-loading';
import elementIsInview from '../../utilities/element-is-in-view';
import toHyphenCase from '../../utilities/to-hyphen-case';
// import { CE_IMAGE_LOADER } from '../../constants/ce-component';
// import { DURATION } from '../../constants/global';

export const DURATION = 800;
export const DISPLAY_NAME = 'ImageLoader';
export const CLASS_NAME = toHyphenCase(DISPLAY_NAME);
export const IMAGE_CLASS_NAME = 'image';
export const STATUS_STATE = { loading: 'loading', loaded: 'loaded', error: 'error' };

export interface ImageLoaderProps {
  /** Defines the URL of an image. */
  src: string;
  /** Defines the alternate text for an image. */
  alt?: string;
  /** Defines whether the image should lazy load. Default value is false. */
  lazy?: boolean;
  /** Defines class name for component. */
  className?: string;
  /** Defines a custom on load function. */
  onLoaded?: Function;
  /** Defines a custom on error function. */
  onError?: Function;
}

export interface ImageLoaderState {
  /** Defines the status of the component. */
  status: string;
  /** Defines whether the component is within the viewport. */
  isInview: boolean;
  /** Defines whether the component is ready (image is complete). */
  isReady: boolean;
}

/**
 * A component that renders an image with lazy loading.
 * While loading the component will display the loading component {@link CeLoading}.
 * When successfully loaded the image will transition in via css.
 * If the image fails to load then the error component {@link CeError} will be displayed with alt text (if any).
 * After loading is complete (successful or not) the loading component {@link CeLoading} will be removed.
 */
export default class ImageLoader extends Component<ImageLoaderProps, ImageLoaderState> {
  /** A reference to the DOM element. */
  private refDom: HTMLElement;

  public constructor(props: ImageLoaderProps) {
    super(props);
    this.setInitialState();
  }

  /**
   * Set the intial state of the component.
   */
  private setInitialState = (): void => {
    this.state = { isInview: false, isReady: false, status: STATUS_STATE.loading };
  };

  /** Set the isInview state of the component to true if it is in view. */
  private onScroll = (): void => {
    if (this.getComponentIsInview()) {
      this.setState({ isInview: true });
    }
  };

  /** Set the status state to loaded and isReady to true. */
  private onLoaded = (): void => {
    const { onLoaded } = this.props;
    if (onLoaded) {
      onLoaded();
    }
    this.setState({ status: STATUS_STATE.loaded });
    this.setToReady();
  };

  /** Set the status state to error and isReady to true. */
  private onError = (): void => {
    const { onError } = this.props;
    if (onError) {
      onError();
    }
    this.setState({ status: STATUS_STATE.error });
    this.setToReady();
  };

  /** Set the isReady state to true with a delay so the image has time to transition in. */
  private setToReady = (): void => {
    setTimeout((): void => this.setState({ isReady: true }), DURATION * 2);
  };

  /** Enable scroll listener.  */
  private enableListeners = (): void => {
    window.addEventListener('scroll', this.onScroll);
    /** Delay to account for layout reflow. */
    setTimeout((): void => {
      const { isInview } = this.state;
      if (!isInview) {
        this.onScroll();
      }
    }, DURATION * 2);
  };

  /** Disable scroll listener.  */
  private disableListeners = (): void => {
    window.removeEventListener('scroll', this.onScroll);
  };

  /** Return the image source if the component is ready to load. */
  private getImageSrcReady = (): { src: string } | null => {
    const { isReady, isInview, status } = this.state;
    const { lazy, src } = this.props;
    if (lazy && !isReady && isInview && STATUS_STATE.loading) return { src };
    if (lazy && !isInview && status === STATUS_STATE.loading) return null;
    return { src };
  };

  /** Determine if the component is in view. */
  private getComponentIsInview = (): boolean => {
    const { isReady, status } = this.state;
    return !isReady && status === STATUS_STATE.loading && this.refDom && elementIsInview(this.refDom, 0);
  };

  /**
   * Enabled the component listeners or set the state to isInview.
   * If the component is lazy and not in view then watch for when
   * it is scrolled into view. Else, set the isInview state to true to
   * begin loading the image.
   * @category Lifecycle
   */
  public componentDidMount = (): void => {
    const { lazy } = this.props;
    if (lazy && !elementIsInview(this.refDom)) {
      this.enableListeners();
    } else {
      this.setState({ isInview: true });
    }
  };

  /**
   * Check the component scroll position if the isReady and isInview state is false.
   * If the component isInview state is true disable the listeners.
   * @category Lifecycle
   */
  public componentDidUpdate = (): void => {
    const { isReady, isInview } = this.state;
    if (!isReady && !isInview) {
      this.onScroll();
    }
    if (isInview) {
      this.disableListeners();
    }
    console.log(this.state);
  };

  /**
   * Disable the component listeners.
   * @category Lifecycle
   */
  public componentWillUnmount = (): void => {
    this.disableListeners();
  };

  /**
   * Render an image within a div element.
   * @category Render
   */
  public render(props: ImageLoaderProps, state: ImageLoaderState): h.JSX.Element {
    const { alt, className } = props;
    const { status, isReady, isInview } = state;
    /* set component class */
    const componentClassName = `${CLASS_NAME}${className ? ` ${className}` : ''}`;
    /* set image class  */
    const imageClassName = `${IMAGE_CLASS_NAME} ${IMAGE_CLASS_NAME}--${status} ${IMAGE_CLASS_NAME}--${isInview ? 'in' : 'out'}`;
    /* get the source url  */
    const srcReady: { src: string } = this.getImageSrcReady();
    /* loading check */
    const showLoading = !isReady;
    /* error check */
    const showError = isReady && status === STATUS_STATE.error;
    return (
      <div ref={(ref): void => { this.refDom = ref; }} className={componentClassName}>
        {/* display loading */}
        {showLoading && <p>{status}</p>}
        {/* display error */}
        {showError && <p>{status}</p>}
        {/* display image */}
        <img {...srcReady} className={imageClassName} onLoad={this.onLoaded} onError={this.onError} alt={alt} />
      </div>
    );
  }
}
