import React from 'react';
import Nav from './Nav';

const Landing = props => {
  const landing = props;
  return (
    <div>
      <Nav showSearch />
      <h1>
        Hello World!! {landing}
      </h1>
    </div>
  );
};

export default Landing;
