import './index.scss';
import { h, render } from 'preact';
import App from './app/app';

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('preact/devtools');
  // eslint-disable-next-line global-require
  require('./index.ejs');
}

function onLoad(): void {
  const container = document.createElement('div');
  container.id = 'root';
  document.body.appendChild(container);
  render(<App />, container);
  console.log('App successfully loaded!');
}

const DOMContentLoaded = document.readyState === 'interactive';
if (DOMContentLoaded) {
  onLoad();
} else {
  document.addEventListener('DOMContentLoaded', onLoad);
}
