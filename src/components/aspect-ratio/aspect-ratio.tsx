import { h, VNode, Fragment } from 'preact';

const CLASS_NAME = 'aspect-ratio';
const CONTENT_CLASS_NAME = `${CLASS_NAME}__content`;

export interface CeAspectRatioProps {
  children: VNode | VNode[];
  /** Defines the desired aspect ratio width. */
  width?: number;
  /** Defines the desired aspect ratio height. */
  height?: number;
}

/**
 * Render the children wrapped in div elements maintaining the aspect ratio of
 * the width and height. If the width or height is undefined the component will
 * render just the children without the div elements.
 */
const AspectRatio = (props: CeAspectRatioProps): h.JSX.Element => {
  const { children, width, height } = props;
  const style = {
    position: 'relative',
    height: 0,
    paddingTop: `${(height / width) * 100}%`
  };
  const styleContent = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  };
  return (width && height)
    ? (
      <div ce-component className={CLASS_NAME} style={style}>
        <div className={CONTENT_CLASS_NAME} style={styleContent}>
          {children}
        </div>
      </div>
    )
    : (
      <Fragment>
        {children}
      </Fragment>
    );
};

export default AspectRatio;
