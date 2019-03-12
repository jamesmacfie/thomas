import React, { Component } from 'react';
import Button from '../../components/button';
import Navigation from '../../components/navigation';
import PageWrapper from '../../components/pageWrapper';
import styles from './styles.css';

export default class Settings extends Component {
  render() {
    return (
      <PageWrapper title="Settings">
        <Navigation />
        <p className={styles.test}>Settings page!</p>
        <Button />
      </PageWrapper>
    );
  }
}
