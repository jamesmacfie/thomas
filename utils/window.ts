console.log(process.env);
export const isServer = typeof window === 'undefined';
export const origin = () => (isServer ? '' : window.location.origin);
