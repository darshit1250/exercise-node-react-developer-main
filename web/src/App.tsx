import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Filter from './components/Filter/Filter';
import Repositories from './components/Repositories/Repositories';
import Repository from './components/Repositories/Repository';
import Section from './components/UI/Section/Section';
import useHttp from './hooks/use-http';
import RepoContext from './store/repo-context';

export function App() {
  const { filteredRepositories, setInitialRepo, setFilteredRepo } =
    useContext(RepoContext);
  const { isLoading, error, fetchCall } = useHttp();
  const [isRepoVisible, setIsRepoVisible] = useState(false);

  const showRepoHandler = () => {
    setIsRepoVisible(true);
  };

  const hideRepoHandler = () => {
    setIsRepoVisible(false);
  };

  useEffect(() => {
    const applyData = (responseJSON: any) => {
      // sorting the repos in reverse chronological order
      const sortedRepos = responseJSON.repositories.sort((a: any, b: any) => {
        const aDate: any = new Date(a.created_at);
        const bDate: any = new Date(b.created_at);
        return bDate - aDate;
      });
      setInitialRepo(sortedRepos);
      setFilteredRepo(sortedRepos);
    };

    fetchCall('http://localhost:4000/repos', applyData);
  }, [fetchCall, setInitialRepo, setFilteredRepo]);

  let content = (
    <Section>
      <p>No repositories found!</p>
    </Section>
  );

  if (filteredRepositories.length > 0) {
    content = (
      <div>
        {isRepoVisible && <Repository onHideRepo={hideRepoHandler} />}
        <Section>
          <Filter />
        </Section>
        <Section>
          <Repositories onShowRepo={showRepoHandler} />
        </Section>
      </div>
    );
  }

  if (error) {
    content = (
      <Section>
        <p>{error}</p>
      </Section>
    );
  }

  if (isLoading) {
    content = (
      <Section>
        <p>Loading...</p>
      </Section>
    );
  }

  return <React.Fragment>{content}</React.Fragment>;
}
