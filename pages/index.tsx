import React from 'react';
import PageWrapper from '../components/pageWrapper';
import Navigation from '../components/navigation';

function Home() {
  return (
    <PageWrapper title="Home">
      <Navigation />
      <p>Home page!</p>
    </PageWrapper>
  );
}

export default Home;
