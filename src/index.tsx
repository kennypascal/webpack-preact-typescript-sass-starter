import './scss/styles.scss';
import './index.scss';
import { h, render } from 'preact';
import App from './app/app';

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require */
  require('preact/debug');
  require('./index.ejs');
  /* eslint-enable global-require */
}

export default function onLoad(): void {
  const container = document.createElement('div');
  container.id = 'root';
  document.body.appendChild(container);
  render(<App />, container);
}

(function start(): void {
  const DOMContentLoaded = document.readyState === 'interactive';
  if (DOMContentLoaded) {
    onLoad();
  } else {
    document.addEventListener('DOMContentLoaded', onLoad);
  }
})();
