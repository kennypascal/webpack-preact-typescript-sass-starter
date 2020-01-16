import './app.scss';
import { Component, h, createRef } from 'preact';
import markDownHTML from '../utilities/mark-down-html';

const COMPONENT_NAME = 'app';

const ICON_WEBPACK = require('../assets/svg/icon-webpack.svg').default;
const ICON_PREACT = require('../assets/svg/icon-preact.svg').default;
const ICON_TYPESCRIPT = require('../assets/svg/icon-typescript.svg').default;
const ICON_SASS = require('../assets/svg/icon-sass.svg').default;

export default class App extends Component<{}, {}> {
  public refApp = createRef();

  public componentDidMount = (): void => {
    console.log('componentDidMount');
  };

  private onLoaded = (): void => {
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
        <img className={`${COMPONENT_NAME}__bkgd`} src='/assets/img/sven-scheuermeier-37377-unsplash.jpg' alt='' data-id='test' onLoad={this.onLoaded} onError={this.onError} />
        <div className={`${COMPONENT_NAME}__content`}>
          <h1>En las monta&ntilde;as codificamos.</h1>
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
