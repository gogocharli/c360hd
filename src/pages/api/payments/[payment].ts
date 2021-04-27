import type { NextApiResponse, NextApiRequest } from 'next';
import { success, failure } from '../utils/request';
import { chargeCustomer } from '../components/payments';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const fulfill = success(res);
  const reject = failure(res);

  switch (method) {
    case 'POST': {
      const customerId = query.payment as string;
      const product = query.product as string;
      const province = query.province as string;
      return chargeCustomer({ customerId, product, province }).then(
        fulfill,
        reject,
      );
    }
    default: {
      return `Unsupported API Method: ${method}`;
    }
  }
}
