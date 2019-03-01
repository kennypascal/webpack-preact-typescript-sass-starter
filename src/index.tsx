import './index.scss';
import { h, render } from 'preact';
import App from './app/app';

if (process.env.NODE_ENV !== 'production') {
	require('preact/devtools');
	require('file-loader!./index.ejs');
}

render(<App />, document.getElementById('root'));
