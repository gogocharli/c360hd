import type { NextApiRequest, NextApiResponse } from 'next';
import { getFeaturedClients } from '../components/clients';
import { success, failure } from '../utils/request';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const fulfill = success(res);
  const reject = failure(res);

  switch (method) {
    case 'GET': {
      return getFeaturedClients().then(fulfill, reject);
    }
    default: {
      return `Unsupported API Method: ${method}`;
    }
  }
}
