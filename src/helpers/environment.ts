import { getIsMobile } from './get-is-mobile';

/**
 *
 *
 * @export
 * @description Logs whether the envoronment is production or development and mobile or esktop
 */
export function logEnvironment(): void {
  console.log('\n');
  console.log(
    `%cEnvironment: ${getEnvironment().isProduction ? 'Production' : 'Development'}, ${getEnvironment().isMobile ? 'Mobile' : 'Desktop'}`,
    'font-weight:bold; padding:20px; background: cyan; color: black; text-align:center'
  );
  console.log('\n');
}

/**
 *
 *
 * @export
 * @returns {{ isProduction: boolean; isMobile: boolean }} Returns whether the envoronment is production or development and mobile or esktop
 */
export function getEnvironment(): { isProduction: boolean; isMobile: boolean } {
  let isMobile = getIsMobile();
  let isProduction = true;
  if (process.env.NODE_ENV !== 'production') {
    isProduction = false;
  }
  return { isProduction: isProduction, isMobile: isMobile };
}
