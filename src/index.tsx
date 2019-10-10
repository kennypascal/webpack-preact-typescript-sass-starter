import './index.scss';
import { h, render } from 'preact';
import App from 'app/app';

if (process.env.NODE_ENV !== 'production') {
  require('preact/debug');
  require('file-loader!./index.ejs');
}

export function onLoad() {
  const container = document.createElement('div');
  container.id = 'root';
  document.body.appendChild(container);
  render(<App />, container);
}

(function() {
  const DOMContentLoaded = document.readyState === 'interactive';
  if (DOMContentLoaded) {
    onLoad();
  } else {
    document.addEventListener('DOMContentLoaded', onLoad);
  }
})();
