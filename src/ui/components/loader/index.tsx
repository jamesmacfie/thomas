import React, { ReactNode } from 'react';
import './styles.css';

interface Props {
  fullPage?: boolean;
  background?: boolean;
}

const Overlay = () => <div className="absolute z-0 top-0 right-0 bottom-0 left-0 bg-black opacity-25" />;

const BackgroundLoader = ({ children }: { children: ReactNode }) => (
  <div className="absolute-center z-10 bg-blue rounded p-12">
    <div className="absolute-center">{children}</div>
  </div>
);

const Loader = ({ fullPage, background }: Props) => {
  const spinner = (
    <div className="loader">
      <div />
      <div />
      <div />
    </div>
  );

  if (fullPage) {
    return (
      <>
        <Overlay />
        <BackgroundLoader>{spinner}</BackgroundLoader>
      </>
    );
  }

  if (background) {
    return <BackgroundLoader>{spinner}</BackgroundLoader>;
  }

  return spinner;
};

export default Loader;
