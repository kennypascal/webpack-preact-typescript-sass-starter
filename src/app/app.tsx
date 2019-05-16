import './app.scss';
import { Component, h } from 'preact';
import { markDownHTML } from 'utilities/mark-down-html';

const COMPONENT_NAME = 'app';

export interface AppProps {}

export interface AppState {}

export default class App extends Component<AppProps, AppState> {
  public refApp: HTMLElement;

  constructor(props: AppProps) {
    super(props);
  }

  componentDidMount() {}

  onLoad = () => this.setAppStatus();

  onError = () => this.setAppStatus();

  setAppStatus = () => this.refApp.classList.add(`is-ready`);

  render(props: AppProps, state: AppState) {
    return (
      <div ref={(project) => (this.refApp = project)} className={COMPONENT_NAME}>
        <img className={'bkgd'} src={require('assets/img/sven-scheuermeier-37377-unsplash.jpg')} onLoad={this.onLoad} onError={this.onError} />
        <div className={'content'}>
          <h1>En las monta&ntilde;as codificamos.</h1>
          <p className={'content__divider'}>
            <hr />
          </p>
          <div className={'content__tools'}>
            <a href={'https://webpack.github.io'} className={'tool tool--webpack'} {...markDownHTML(require('assets/svg/icon-webpack.svg'))} />
            <a href={'https://preactjs.com'} className={'tool tool--preact'} {...markDownHTML(require('assets/svg/icon-preact.svg'))} />
            <a href={'https://www.typescriptlang.org'} className={'tool tool--typescript'} {...markDownHTML(require('assets/svg/icon-typescript.svg'))} />
            <a href={'https://sass-lang.com'} className={'tool tool--sass'} {...markDownHTML(require('assets/svg/icon-sass.svg'))} />
          </div>
        </div>
      </div>
    );
  }
}
