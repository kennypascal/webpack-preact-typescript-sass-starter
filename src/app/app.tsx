import './app.scss';
import { Component, h } from 'preact';
import markDownHTML from '../utilities/mark-down-html';
import loadImage, { loadImageCallback } from '../utilities/load-image';

const IconWebpack = require('../assets/svg/icon-webpack.svg').default;
const IconPreact = require('../assets/svg/icon-preact.svg').default;
const IconTypescript = require('../assets/svg/icon-typescript.svg').default;
const IconSass = require('../assets/svg/icon-sass.svg').default;

const COMPONENT_NAME = 'App';

export default class App extends Component {
  public refApp: HTMLElement;

  private setAppStatus = (): void => {
    this.refApp.classList.add(`${COMPONENT_NAME}--ready`);
    console.log(this.refApp);
  };

  public componentDidMount = (): void => {
    loadImageCallback.debug = true;
    loadImage({ src: '/assets/img/sven-scheuermeier-37377-unsplash.jpg', callback: this.setAppStatus() });
  };

  public render(): JSX.Element {
    return (
      <div
        ref={(ref): void => {
          this.refApp = ref;
        }}
        className={COMPONENT_NAME}
      >
        <img className={`${COMPONENT_NAME}__bkgd`} src="/assets/img/sven-scheuermeier-37377-unsplash.jpg" alt="" data-id="test" />
        <div className={`${COMPONENT_NAME}__content`}>
          <h1>En las monta&ntilde;as codificamos.</h1>
          <p className="divider">
            <hr />
          </p>
          <div className="tools">
            <a href="https://webpack.github.io" className="tool tool--webpack">
              <span {...markDownHTML(IconWebpack)} />
            </a>
            <a href="https://preactjs.com" className="tool tool--preact">
              <span {...markDownHTML(IconPreact)} />
            </a>
            <a href="https://www.typescriptlang.org" className="tool tool--typescript">
              <span {...markDownHTML(IconTypescript)} />
            </a>
            <a href="https://sass-lang.com" className="tool tool--sass">
              <span {...markDownHTML(IconSass)} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
