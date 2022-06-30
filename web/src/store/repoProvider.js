import { useCallback, useState } from 'react';
import RepoContext from './repo-context';

const RepoProvider = (props) => {
  // to store the initial value of the repositories
  const [initialRepoState, setInitialRepoState] = useState({
    repositories: [],
  });
  // to store language filtered repos
  const [filteredRepoState, setFilteredRepoState] = useState({
    repositories: [],
  });
  // to store the id of repo that will be clicked and used to
  // fetch commit and readme file data
  const [currentRepoID, setCurrentRepoID] = useState(0);

  const setCurrentRepoIDHandler = (id) => {
    setCurrentRepoID(id);
  };

  // this function will be in dependancy array of useEffect
  // hence we need to use useCallback to avoid infinite loop
  const initialRepoHandler = useCallback((initialRepo) => {
    setInitialRepoState({ repositories: initialRepo });
  }, []);

  // this function will be in dependancy array of useEffect
  // hence we need to use useCallback to avoid infinite loop
  const filterRepoHandler = useCallback((filteredRepo) => {
    setFilteredRepoState({ repositories: filteredRepo });
  }, []);

  const repoContext = {
    initialRepositories: initialRepoState.repositories,
    filteredRepositories: filteredRepoState.repositories,
    currentRepoID,
    setInitialRepo: initialRepoHandler,
    setFilteredRepo: filterRepoHandler,
    setCurrentRepoID: setCurrentRepoIDHandler,
  };

  return (
    <RepoContext.Provider value={repoContext}>
      {props.children}
    </RepoContext.Provider>
  );
};

export default RepoProvider;
