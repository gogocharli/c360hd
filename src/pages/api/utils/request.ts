import type { NextApiResponse } from 'next';

function success(res: NextApiResponse) {
  return function (responseBody = {}) {
    res.status(200).json(responseBody);
  };
}

interface Error {
  errorMessage: string;
  code?: number;
}

function failure(res: NextApiResponse) {
  return function ({
    errorMessage = 'Sorry an unexpected error took place',
    code = 500,
  }: Error) {
    res.status(code).json({ errorMessage });
  };
}

export { success, failure };
