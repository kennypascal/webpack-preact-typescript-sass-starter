/* Request Animation Frame */
interface Window {
	requestTimeout: any;
	requestInterval: any;
	clearRequestTimeout: any;
	clearRequestInterval: any;
}

/* onError Definition for Preact */
declare namespace JSX {
	interface HTMLAttributes {
		onError?: any;
	}
}
