/**
 *
 * Excutes a callback function when an image is loaded via loadImage().
 * Useful for adjusting the page layout when images are added (ie. ScrollMagic).
 *
 * @class LoadImageCallback
 */
class LoadImageCallback {
  private log: boolean;

  private callbackList: Function[] = [];

  public constructor() {
    this.log = false;
  }

  // debugging

  public set debug(debug) {
    this.log = debug;
  }

  private logStatus(event): void {
    if (this.log) {
      console.warn(`loadImage: ${event.type}\n`, event.target as HTMLImageElement, `\n callbacks`, this.callbackList);
    }
  }

  // callbacks

  public addCallback(callback: Function): void {
    if (callback) {
      this.callbackList.push(callback);
    }
  }

  private executeCallback(): void {
    if (this.callbackList) {
      this.callbackList.forEach(
        (callBack): void => {
          callBack();
        },
      );
    }
  }

  // event handlers

  public set success(event: Event) {
    this.logStatus(event);
    this.executeCallback();
  }

  public set failure(event: Event) {
    this.logStatus(event);
    this.executeCallback();
  }
}

export const loadImageCallback = new LoadImageCallback();

/**
 * Loads and returns an image object.
 * LoadImageCallback will execute any defined callbacks when the image is complete.
 *
 * @param {*} props
 * @returns {HTMLImageElement}
 */
function loadImage({ src, callback = undefined, attributes = undefined }): HTMLImageElement {
  const image = new Image();
  image.classList.add('loading');

  if (attributes) {
    // add attributes
    Object.keys(attributes).map(
      (key): string => {
        if (key !== 'src' && key !== 'callback') {
          image.setAttribute(key, attributes[key]);
        }
        return key;
      },
    );
    // add styles
    if (attributes.style) {
      Object.keys(attributes.style).map(
        (key): string => {
          if (key !== 'src' && key !== 'callback') {
            image.style[key] = attributes.style[key];
          }
          return key;
        },
      );
    }
  }

  image.style.visibility = 'hidden';

  if (callback) {
    loadImageCallback.addCallback(callback);
  }

  const onImageLoad = (event: Event): void => {
    image.classList.remove('loading');
    image.classList.add('loaded');
    image.style.visibility = null;
    loadImageCallback.success = event;
  };

  const onImageError = (event: Event): void => {
    image.classList.remove('loading');
    image.classList.add('error');
    image.style.visibility = null;
    loadImageCallback.failure = event;
  };

  // add src
  image.src = src;
  image.addEventListener('load', onImageLoad);
  image.addEventListener('error', onImageError);

  return image;
}

export default loadImage;
