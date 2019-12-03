import dynamic from 'next/dynamic';
const MapWithNoSSR = dynamic(() => import('./nossr'), {
  ssr: false
});
export default MapWithNoSSR;
