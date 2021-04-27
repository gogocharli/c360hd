/**
 * Validates all fields from the form
 *
 * @param {*} data The form Data
 * @returns {{errorMessage: String} | null}
 */
function validateInput(data) {
  for (let field of Object.keys(data)) {
    if (field === 'addInfo' || field === 'repId') {
      continue;
    }
    if (!data[field]) {
      const errorMessage = `${field} is empty, make sure to fill the form completely.`;
      return { errorMessage };
    }
  }
  return null;
}

export { validateInput };
