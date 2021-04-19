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
      const orderDateTime = query.dateTime as string[];
      const [date, time] = orderDateTime;

      return checkSchedule(formatDate(date), formatTime(time)).then(
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
