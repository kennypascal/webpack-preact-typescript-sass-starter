/**
 * aspect ratio properties
 */
interface AspectRatioProps {
  element: HTMLElement;
  width: number;
  height: number;
}
/**
 * Aspects ratio container returns the content provided wrapped in a <div> maintaining the aspect ratio.
 * @param {AspectRatioProps} props - The element, width and height
 * @returns {HTMLElement}
 */
export function aspectRatioContainer(props: AspectRatioProps) {
  let { element, width, height } = props;
  let aspectRatioContent = document.createElement('div');
  aspectRatioContent.classList.add('aspect-ratio__content');
  aspectRatioContent.style.position = 'absolute';
  aspectRatioContent.style.top = '0';
  aspectRatioContent.style.left = '0';
  aspectRatioContent.style.width = '100%';
  aspectRatioContent.style.height = '100%';
  aspectRatioContent.appendChild(element);
  let aspectRatio = document.createElement('div');
  aspectRatio.classList.add('aspect-ratio', 'aspect-ratio--' + width + 'x' + height);
  aspectRatio.style.position = 'relative';
  aspectRatio.style.height = '0';
  aspectRatio.style.overflow = 'hidden';
  aspectRatio.style.paddingTop = (height / width) * 100 + '%';
  aspectRatio.style.background = 'white';
  aspectRatio.appendChild(aspectRatioContent);
  return aspectRatio;
}
