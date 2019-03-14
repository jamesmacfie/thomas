import React, { Component, ReactNode } from 'react';

const withNavItems = (WrappedComponent: typeof Component): ReactNode => {
  return class WrapperComponent extends Component {
    render() {
      return <WrappedComponent navItems={(window as any)._thomas_nav_items} {...this.props} />;
    }
  };
};

export default withNavItems;
