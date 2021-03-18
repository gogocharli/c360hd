import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createClient,
  deleteClients,
  getAllClients,
} from '../components/clients';
import { success, failure } from '../utils/request';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  const fulfill = success(res);
  const reject = failure(res);

  switch (method) {
    case 'POST': {
      return createClient(body).then(fulfill, reject);
    }
    case 'GET': {
      return getAllClients().then(fulfill, reject);
    }
    case 'DELETE': {
      return deleteClients(body).then(fulfill, reject);
    }
    default: {
      return `Unsupported API Method: ${method}`;
    }
  }
}
