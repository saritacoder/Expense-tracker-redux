import { Fragment } from 'react';

import Navigation from './Navigation';

const Header = (props) => {
  return (
    <Fragment>
      <Navigation />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Header;