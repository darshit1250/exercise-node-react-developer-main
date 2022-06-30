import { Router, Request, Response } from 'express';
const fetch = require('node-fetch');

export const repos = Router();

repos.get('/', async (_: Request, res: Response, next) => {
  res.header('Cache-Control', 'no-store');

  try {
    const response = await fetch(
      'https://api.github.com/users/silverorange/repos'
    );
    if (!response.ok) {
      throw new Error('Request failed!');
    }
    const response_JSON = await response.json();
    res.status(200);
    res.header('Content-Type', 'application/json');
    res.json({ repositories: response_JSON.filter((repo: any) => !repo.fork) });
  } catch (err) {
    next(err);
  }

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  // res.json([]);
});
