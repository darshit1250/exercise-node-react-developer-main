import { useContext } from 'react';
import RepoContext from '../../store/repo-context';
import classes from './Filter.module.css';

const Filter = () => {
  const repoCtx = useContext(RepoContext);
  const filterClickHandler = (e) => {
    if (e.target.value !== 'All') {
      const updatedRepo = repoCtx.initialRepositories.filter(
        (repo) => repo.language === e.target.value
      );
      repoCtx.setFilteredRepo(updatedRepo);
    } else {
      repoCtx.setFilteredRepo(repoCtx.initialRepositories);
    }
  };

  const languages = new Set();
  repoCtx.initialRepositories.map((repo) => {
    return languages.add(repo.language);
  });

  const content = Array.from(languages).map((language) => {
    return (
      <button
        className={classes.button}
        key={language}
        value={language}
        onClick={filterClickHandler}
      >
        {language}
      </button>
    );
  });
  return (
    <div className={classes.container}>
      <button
        className={classes.button}
        value="All"
        key="All"
        onClick={filterClickHandler}
      >
        All
      </button>
      {content}
    </div>
  );
};

export default Filter;
