import './app.scss';
import { Component, h, createRef } from 'preact';
import markDownHTML from '../utilities/mark-down-html';

const COMPONENT_NAME = 'app';

const IMAGE_BKGD = require('../assets/img/sven-scheuermeier-37377-unsplash.jpg').default;
const ICON_WEBPACK = require('../assets/svg/icon-webpack.svg').default;
const ICON_PREACT = require('../assets/svg/icon-preact.svg').default;
const ICON_TYPESCRIPT = require('../assets/svg/icon-typescript.svg').default;
const ICON_SASS = require('../assets/svg/icon-sass.svg').default;

export default class App extends Component {
  public refApp = createRef();

  public componentDidMount = (): void => {
    console.log('componentDidMount', this, this.refApp);
  };

  private onLoad = (): void => {
    this.setAppStatus();
  };

  private onError = (): void => {
    this.setAppStatus();
  };

  private setAppStatus = (): void => {
    this.refApp.current.classList.add('is-ready');
  };

  public render(): h.JSX.Element {
    return (
      <div ref={this.refApp} className={COMPONENT_NAME}>
        <img className={`${COMPONENT_NAME}__bkgd`} src={IMAGE_BKGD} alt='' data-id='test' onLoad={this.onLoad} onError={this.onError} />
        <div className={`${COMPONENT_NAME}__content`}>
          <h1>En las monta&ntilde;as codificamos.</h1>
          <p>A bare minimum preact-webpack-typescript boilerplate for quickly creating interactive applications.</p>
          <p className='divider'>
            <hr />
          </p>
          <div className='tools'>
            <a href='https://webpack.github.io' className='tool tool--webpack'>
              <span {...markDownHTML(ICON_WEBPACK)} />
            </a>
            <a href='https://preactjs.com' className='tool tool--preact'>
              <span {...markDownHTML(ICON_PREACT)} />
            </a>
            <a href='https://www.typescriptlang.org' className='tool tool--typescript'>
              <span {...markDownHTML(ICON_TYPESCRIPT)} />
            </a>
            <a href='https://sass-lang.com' className='tool tool--sass'>
              <span {...markDownHTML(ICON_SASS)} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
