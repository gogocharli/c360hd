import type { NextApiRequest, NextApiResponse } from 'next';
import { getClient, notifyClient, updateClient } from '../components/clients';
import { success, failure } from '../utils/request';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const fulfill = success(res);
  const reject = failure(res);

  const client = query.client as string;

  switch (method) {
    case 'PATCH': {
      return updateClient(client, body).then(fulfill, reject);
    }
    case 'POST': {
      return notifyClient(client, body).then(fulfill, reject);
    }
    case 'GET': {
      return getClient(client).then(fulfill, reject);
    }
    default: {
      return `Unsupported API Method: ${method}`;
    }
  }
}
