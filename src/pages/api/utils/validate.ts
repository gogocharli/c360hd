import type { Order } from '@srcTypes/api.types';
type field = keyof Order;
/**
 * Validates all fields from the form
 */
function validateInput(data: Order) {
  const fields = Object.keys(data) as field[];
  for (let field of fields) {
    if (field === 'addInfo' || field === 'repId') {
      continue;
    }
    if (data[field] == null) {
      const errorMessage = `${field} is empty, make sure to fill the form completely.`;
      return { errorMessage };
    }
  }
  return null;
}

export { validateInput };
