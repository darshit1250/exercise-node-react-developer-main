import React from 'react';

const RepoContext = React.createContext({
  repositories: [],
  updateRepo: (repo) => {},
});

export default RepoContext;
