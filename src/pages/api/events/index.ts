import type { NextApiRequest, NextApiResponse } from 'next';
import { success, failure } from '../utils/request';
import { formatDate, formatTime } from '../utils/date-time';
import { checkSchedule } from '../components/orders/scheduler';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const fulfill = success(res);
  const reject = failure(res);

  switch (method) {
    case 'POST': {
    }
    case 'GET': {
      const dateTime = query.dateTime as string;

      return checkSchedule(formatDate(dateTime), formatTime(dateTime)).then(
        fulfill,
        reject,
      );
    }
    case 'DELETE': {
    }
    default: {
      return `Unsupported API Method: ${method}`;
    }
  }
}
