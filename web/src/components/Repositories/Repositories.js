import React from 'react';
const Repositories = (props) => {
  const content = props.repositories[1].full_name;
  return <React.Fragment>{content}</React.Fragment>;
};

export default Repositories;
