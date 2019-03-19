import './app.scss';
import { Component, h } from 'preact';
import * as classNames from 'classnames';
import { markDownHTML } from '../helpers/mark-down-html';

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

  setAppStatus() {
    this.refApp.classList.add(`is-ready`);
  }

  render(props: AppProps, state: AppState) {
    return (
      <div ref={(project) => (this.refApp = project)} className={classNames(COMPONENT_NAME)}>
        <img className={classNames('bkgd')} src={require('assets/img/sven-scheuermeier-37377-unsplash.jpg')} onLoad={this.onLoad} onError={this.onError} />
        <div className={classNames('content')}>
          <h1>En las monta&ntilde;as codificamos.</h1>
          <p className={classNames('content__divider')}>
            <hr />
          </p>
          <div className={classNames('content__tools')}>
            <a href={'https://webpack.github.io'} className={classNames('tool tool--webpack')} {...markDownHTML(require('assets/svg/icon-webpack.svg'))} />
            <a href={'https://preactjs.com'} className={classNames('tool tool--preact')} {...markDownHTML(require('assets/svg/icon-preact.svg'))} />
            <a
              href={'https://www.typescriptlang.org'}
              className={classNames('tool tool--typescript')}
              {...markDownHTML(require('assets/svg/icon-typescript.svg'))}
            />
            <a href={'https://sass-lang.com'} className={classNames('tool tool--sass')} {...markDownHTML(require('assets/svg/icon-sass.svg'))} />
          </div>
        </div>
      </div>
    );
  }
}
