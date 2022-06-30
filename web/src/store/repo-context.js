import React from 'react';

const RepoContext = React.createContext({
  initialRepositories: [],
  filteredRepositories: [],
  currentRepoID: '',
  setInitialRepo: (repo) => {},
  setFilteredRepo: (repo) => {},
  setCurrentRepoID: (id) => {},
});

export default RepoContext;
