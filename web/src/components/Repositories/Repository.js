import { useCallback, useContext, useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';
import RepoContext from '../../store/repo-context';
import Modal from '../UI/Modal/Modal';
import Section from '../UI/Section/Section';
// import classes from './Repository.module.css';

const Repository = (props) => {
  const [recentCommit, setRecentCommit] = useState({
    date: '',
    author: '',
    message: '',
  });
  const repoCtx = useContext(RepoContext);
  const { isLoading, error, fetchCall } = useHttp();

  const targetRepo = repoCtx.filteredRepositories.find(
    (repo) => +repo.id === repoCtx.currentRepoID
  );
  const commitsUrl = targetRepo.commits_url.replace(/\{.*\}/g, '');

  // to identify most recent commit I used sort method and grab the first commit
  // also this is high computing task hence I put it in useCallback hence it will
  // use same function and will not create new one.
  const sortData = useCallback((data) => {
    const sortedData = data.sort((a, b) => {
      const aDate = new Date(a.commit.author.date);
      const bDate = new Date(b.commit.author.date);
      return bDate - aDate;
    })[0];
    setRecentCommit({
      date: new Date(sortedData.commit.author.date),
      author: sortedData.commit.author.name,
      message: sortedData.commit.message,
    });
  }, []);

  useEffect(() => {
    const applyData = (responseJSON) => {
      sortData(responseJSON);
    };

    fetchCall(commitsUrl, applyData);
  }, [fetchCall, sortData, commitsUrl]);

  let commitContent = (
    <Section>
      <p>No commits found!</p>
    </Section>
  );
  if (recentCommit.author !== '') {
    commitContent = (
      <Section>
        <div>
          <b>Date : </b>
          {recentCommit.date ? recentCommit.date.toString() : 'No Date found!'}
        </div>
        <div>
          <b>Author : </b>
          {recentCommit.author ? recentCommit.author : 'No Author found!'}
        </div>
        <div>
          <b>Message : </b>
          {recentCommit.message ? recentCommit.message : 'No Message found!'}
        </div>
      </Section>
    );
  }
  if (error) {
    commitContent = (
      <Section>
        <p>{error}</p>
      </Section>
    );
  }

  if (isLoading) {
    commitContent = (
      <Section>
        <p>Loading...</p>
      </Section>
    );
  }

  return (
    <Modal onClick={props.onHideRepo}>
      <h4>Recent Commit:</h4>
      {commitContent}
    </Modal>
  );
};

export default Repository;
