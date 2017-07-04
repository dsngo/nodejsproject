import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { bool } from 'prop-types';

const Nav = props => {
  const ultiSpace = (
    <div id="search-bar">
      <input type="text" placeholder="Search" />
      <button>Go</button>
    </div>
  );
  return (
    <div className="nav">
      <div>
        <NavLink exact to="/">
          Weather App
        </NavLink>
      </div>
      <div>
        <NavLink to="/about">About</NavLink>
      </div>
      <div>
        <Link to="/contact">Contact</Link>
      </div>
      {props.showSearch && ultiSpace}
    </div>
  );
};

Nav.propTypes = {
  showSearch: bool,
};
Nav.defaultProps = {
  showSearch: false,
};

export default Nav;
