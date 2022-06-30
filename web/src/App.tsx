import React, { useEffect, useState } from 'react';
import './App.css';
import Repositories from './components/Repositories/Repositories';
import Section from './components/UI/Section/Section';
import useHttp from './hooks/use-http';

export function App() {
  const [repositories, setRepositories] = useState([]);
  const { isLoading, error, fetchCall } = useHttp();

  useEffect(() => {
    const applyData = (responseJSON: any) => {
      const sortedRepos = responseJSON.repositories.sort((a: any, b: any) => {
        const aDate: any = new Date(a.created_at);
        const bDate: any = new Date(b.created_at);
        return bDate - aDate;
      });
      setRepositories(sortedRepos);
    };

    fetchCall('http://localhost:4000/repos', applyData);
  }, [fetchCall]);

  let content = (
    <Section>
      <p>No repositories found!</p>
    </Section>
  );

  if (repositories.length > 0) {
    content = (
      <div>
        <Section>
          <Repositories repositories={repositories} />
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
