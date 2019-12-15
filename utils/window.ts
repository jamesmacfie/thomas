import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const isServer = typeof window === 'undefined';
export const origin = publicRuntimeConfig.HOST;
