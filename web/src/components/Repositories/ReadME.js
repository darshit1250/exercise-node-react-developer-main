import React, { useState, useContext, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import useHttp from '../../hooks/use-http';
import RepoContext from '../../store/repo-context';
import Section from '../UI/Section/Section';
import classes from './ReadME.module.css';

const ReadME = (props) => {
  const [readMEData, setReadMEData] = useState('');
  const repoCtx = useContext(RepoContext);

  const { isLoading, error, fetchCall } = useHttp();

  const targetRepo = repoCtx.filteredRepositories.find(
    (repo) => +repo.id === repoCtx.currentRepoID
  );
  const commitsReadMEUrl = `https://raw.githubusercontent.com/${targetRepo.full_name}/master/README.md`;

  useEffect(() => {
    const applyData = (responseTEXT) => {
      setReadMEData(responseTEXT);
    };

    fetchCall(commitsReadMEUrl, applyData, true);
  }, [fetchCall, commitsReadMEUrl]);

  let readMEContent = (
    <Section>
      <p>ReadME.md is not present!</p>
    </Section>
  );

  if (readMEData !== '') {
    readMEContent = (
      <Section className={classes.readME}>
        <ReactMarkdown>{readMEData}</ReactMarkdown>
      </Section>
    );
  }

  if (error) {
    readMEContent = (
      <Section>
        <p>{error}</p>
      </Section>
    );
  }

  if (isLoading) {
    readMEContent = (
      <Section>
        <p>Loading...</p>
      </Section>
    );
  }

  return <React.Fragment>{readMEContent}</React.Fragment>;
};

export default ReadME;
