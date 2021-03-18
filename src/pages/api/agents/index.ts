import type { NextApiRequest, NextApiResponse } from 'next';
import {
  archiveAgents,
  createAgent,
  getAllAgents,
  searchAgent,
} from '../components/agents';
import { success, failure } from '../utils/request';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const fulfill = success(res);
  const reject = failure(res);

  switch (method) {
    case 'POST': {
      return createAgent(body).then(fulfill, reject);
    }
    case 'GET': {
      const searchQuery = query?.search as string;
      if (searchQuery) {
        return searchAgent(searchQuery).then(fulfill, reject);
      } else {
        return getAllAgents().then(fulfill, reject);
      }
    }
    case 'DELETE': {
      // TODO implement method to archive agents in the db
      return archiveAgents(body).catch(reject);
    }
    default: {
      return `Unsupported API Method: ${method}`;
    }
  }
}
