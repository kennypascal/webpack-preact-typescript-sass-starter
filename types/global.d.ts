/* Request Animation Frame */
interface Window {
  requestTimeout;
  requestInterval;
  clearRequestTimeout;
  clearRequestInterval;
}

/* onError Definition for Preact */
declare namespace JSX {
  interface HTMLAttributes {
    onError?;
  }
}
