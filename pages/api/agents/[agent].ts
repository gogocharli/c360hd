import type { NextApiRequest, NextApiResponse } from 'next';
import { getAgent, updateAgentInfo } from '../components/agents';
import { success, failure } from '../utils/request';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const fulfill = success(res);
  const reject = failure(res);

  const agent = query.agent as string;

  switch (method) {
    case 'PATCH': {
      return updateAgentInfo(agent, body).then(fulfill, reject);
    }
    case 'GET': {
      return getAgent(agent).then(fulfill, reject);
    }
    default: {
      return `Unsupported API Method: ${method}`;
    }
  }
}
