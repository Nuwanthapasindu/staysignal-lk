import { get } from '../../../shared/api/client';

export const fetchImpactStats = () => get('/impact/stats');
export const fetchImpactStories = () => get('/impact/stories');
export const fetchImpactProblem = () => get('/impact/problem');
