const defaultTransitionDuration = 1000;
/**
 *
 *
 * An element whose first child when clicked expands or collapses the parent element
 * based on the height of both the first and second element.
 * This requires an ExpandableElement only contains 2 child elements.
 * @param element
 * @param [state]  The initial state of the instance
 * @param [duration]  The initial transition duration of the element
 */
export function expandableElement(element: HTMLElement, state: boolean = false, duration: number = defaultTransitionDuration) {
  new ExpandableElement(element, state, duration);
}

export class ExpandableElement {
  private element: HTMLElement;
  private firstElement: HTMLElement;
  private lastElement: HTMLElement;
  private duration: number;
  private isExpanded: boolean;
  private isInTransitionTimer: any;

  /**
   *
   *
   * Creates an instance of expandable element.
   * @param element
   * @param [state]  The initial state of the instance
   * @param [duration]  The initial transition duration of the element
   */
  constructor(element: HTMLElement, state: boolean = false, duration: number = defaultTransitionDuration) {
    switch (element.getAttribute('data-expanded')) {
      case 'true':
        this.isExpanded = true;
        break;
      case 'false':
        this.isExpanded = false;
        break;
      default:
        this.isExpanded = state;
    }
    // Define the elements
    this.element = element;
    this.firstElement = this.wrapElement(<HTMLElement>element.firstElementChild);
    this.lastElement = this.wrapElement(<HTMLElement>element.firstElementChild);

    // Set the inital height and attributes
    // The initial height is set before the transition styles
    this.setElementAttributes();
    this.setElementHeight();

    // Define click handler
    this.firstElement.className = 'expandable__toggle';
    this.firstElement.onclick = (event) => this.onClick(event);

    // Define styles
    this.element.style.overflow = 'hidden';
    this.lastElement.offsetHeight;
    this.lastElement.className = 'expandable__content';
    this.lastElement.style.overflow = 'hidden';
    this.lastElement.style.transitionProperty = 'all';
    this.lastElement.style.transitionTimingFunction = 'ease-in-out';

    //
    this.setElementAttributes();
    this.setElementHeight();

    //
    this.duration = duration;
  }

  private getElementHeight(element: HTMLElement) {
    return element.scrollHeight;
  }

  private wrapElement(toWrap: any) {
    let wrapper = document.createElement('div');
    toWrap.parentNode.appendChild(wrapper);
    wrapper.className = 'wrapped';
    wrapper.appendChild(toWrap);
    return wrapper;
  }

  private onClick(event: any) {
    // Setting the duration after the first click to avoid animation when setting the intitial state
    this.lastElement.style.transitionDuration = this.duration + 'ms';
    this.toggleExpandableState();
    this.setElementAttributes();
    this.setElementHeight();
  }
  private setElementHeight() {
    // Set animation timer
    window.clearRequestTimeout(this.isInTransitionTimer);
    this.isInTransitionTimer = window.requestTimeout(() => {
      this.lastElement.style.height = this.isExpanded ? 'auto' : '0px';
    }, this.duration);

    // Convert height auto to numeric value
    this.lastElement.style.height =
      this.lastElement.style.height === 'auto' ? this.lastElement.getBoundingClientRect().height + 'px' : this.lastElement.style.height;
    this.lastElement.offsetWidth;

    // Set the new height
    if (this.isExpanded) {
      this.lastElement.style.height = this.getElementHeight(this.lastElement) + 'px';
      (<HTMLElement>this.lastElement.firstChild).style.transitionTimingFunction = 'ease-in-out';
    } else {
      this.lastElement.style.height = '0px';
      (<HTMLElement>this.lastElement.firstChild).style.transitionTimingFunction = 'ease-in-out';
    }
  }

  private setElementAttributes() {
    this.element.setAttribute('data-expanded', `${this.isExpanded}`);
  }

  private toggleExpandableState() {
    this.isExpanded = !this.isExpanded;
  }
}

export class ExpandableModule {
  public elements: Array<ExpandableElement>;
  public duration: number;
  /**
   * Creates an instance of expandable module.
   * @param id The id of the element to search within for exandable elements
   * @param [duration]  The initial transition duration of the element
   */
  constructor(id: string, duration: number = defaultTransitionDuration) {
    this.duration = duration;
    this.elements = [].slice.call(document.querySelectorAll(id + ' [data-type="expandable"]')).map((expandable: HTMLElement) => {
      return new ExpandableElement(expandable, true, this.duration);
    });
  }
}
