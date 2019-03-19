/**
 *
 *
 * @export
 * @returns {boolean} Returns a true or false value based on whether pageData.site.is_mobile is defined of if the window location host begins with m.
 *
 * TODO: Test this...
 */
export function getIsMobile(): boolean {
  return (window as any).pageData && (window as any).pageData.site && (window as any).pageData.site.hasOwnProperty('is_mobile')
    ? String((window as any).pageData.site.is_mobile) == 'true'
    : window.location.host.match(/^(m.)/)
    ? true
    : false;
}

/*
window.pageData && window.pageData.site && window.pageData.site.hasOwnProperty('is_mobile')
		? window.pageData.site.is_mobile
		: window.location.host.match(/^(m.)/)
		? true
		: false;
*/
