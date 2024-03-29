import type { NextApiResponse, NextApiRequest } from 'next';
import { createPayment, getPrice } from '../components/payments';
import { success, failure } from '../utils/request';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const fulfill = success(res);
  const reject = failure(res);

  switch (method) {
    case 'POST': {
      const intent = query.intent as string;
      return createPayment(intent, body).then(fulfill, reject);
    }
    case 'GET': {
      const product = query.product as string;
      const province = query.province as string;
      return getPrice({ product, province }).then(fulfill, reject);
    }
    default: {
      return `Unsupported API Method: ${method}`;
    }
  }
}
