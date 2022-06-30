import { useCallback, useState } from 'react';
import RepoContext from './repo-context';

const RepoProvider = (props) => {
  //state to store the initial value of the repositories
  const [initialRepoState, setInitialRepoState] = useState({
    repositories: [],
  });
  //to store language filtered repos
  const [updatedRepoState, setUpdatedRepoState] = useState({
    repositories: [],
  });

  // this function will be in dependancy array of useEffect
  // hence we need to use useCallback to avoid infinite loop
  const initialRepoHandler = useCallback((initialRepo) => {
    setInitialRepoState({ repositories: initialRepo });
  }, []);

  // this function will be in dependancy array of useEffect
  // hence we need to use useCallback to avoid infinite loop
  const updateRepoHandler = useCallback((updatedRepo) => {
    setUpdatedRepoState({ repositories: updatedRepo });
  }, []);

  const repoContext = {
    initialRepositories: initialRepoState.repositories,
    updatedRepositories: updatedRepoState.repositories,
    initialRepo: initialRepoHandler,
    updateRepo: updateRepoHandler,
  };

  return (
    <RepoContext.Provider value={repoContext}>
      {props.children}
    </RepoContext.Provider>
  );
};

export default RepoProvider;