import './index.scss';
import { h, render } from 'preact';
import App from './app/app';

if (process.env.NODE_ENV !== 'production') {
  require('preact/debug');
  require('./index.ejs');
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
