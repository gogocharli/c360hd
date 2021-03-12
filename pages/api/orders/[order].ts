import type { NextApiResponse, NextApiRequest } from 'next';
import { cancelOrder, getOrder, updateOrder } from '../components/orders';
import { success, failure } from '../utils/request';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const fulfill = success(res);
  const reject = failure(res);

  const order = query.order as string;

  switch (method) {
    case 'PATCH': {
      return updateOrder(order, body).then(fulfill, reject);
    }
    case 'GET': {
      return getOrder(order).then(fulfill, reject);
    }
    case 'DELETE': {
      return cancelOrder(order).then(fulfill, reject);
    }
    default: {
      return `Unsupported API Method: ${method}`;
    }
  }
}
