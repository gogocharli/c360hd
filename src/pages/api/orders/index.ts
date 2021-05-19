import { Order } from '@srcTypes/api.types';
import type { NextApiResponse, NextApiRequest } from 'next';
import { getAllOrders, placeOrder, searchOrder } from '../components/orders';
import { success, failure } from '../utils/request';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const fulfill = success(res);
  const reject = failure(res);

  switch (method) {
    case 'POST': {
      return placeOrder(body as Order).then(fulfill, reject);
    }
    case 'GET': {
      const searchQuery = query?.search as string;
      if (searchQuery) {
        return searchOrder(searchQuery).then(fulfill, reject);
      } else {
        return getAllOrders().then(fulfill, reject);
      }
    }
    default: {
      return `Unsupported API Method: ${method}`;
    }
  }
}
