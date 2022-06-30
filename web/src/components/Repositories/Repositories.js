import React, { useContext } from 'react';
import RepoContext from '../../store/repo-context';
import Card from '../UI/Card/Card';
const Repositories = (props) => {
  const repoCtx = useContext(RepoContext);

  const repoHandler = (e) => {
    props.onShowRepo();
    repoCtx.setCurrentRepoID(+e.target.attributes.itemid.value);
  };

  return (
    <React.Fragment>
      {repoCtx.filteredRepositories.map((repo) => {
        return (
          <div key={repo.id}>
            <Card>
              <h3 onClick={repoHandler} itemID={repo.id}>
                {repo.full_name}
              </h3>

              <div>
                <b>Description : </b>
                {repo.description ? repo.description : 'No description found!'}
              </div>
              <div>
                <b>Language : </b>
                {repo.language}
              </div>
              <div>
                <b>Forks Count : </b>
                {repo.forks_count}
              </div>
            </Card>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default Repositories;
