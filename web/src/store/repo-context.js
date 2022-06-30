import React from 'react';

const RepoContext = React.createContext({
  initialRepositories: [],
  filteredRepositories: [],
  setInitialRepo: (repo) => {},
  setFilteredRepo: (repo) => {},
});

export default RepoContext;
