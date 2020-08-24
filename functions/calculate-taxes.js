module.exports = function calculateTaxes(
  amount,
  federalRate = 5,
  provincialRate = 9.975
) {
  amount /= 100;
  fedTaxes = amount * (federalRate / 100);
  provTaxes = amount * (provincialRate / 100);
  float = +(amount + fedTaxes + provTaxes).toFixed(2);
  return (int = Math.ceil(float * 100));
};
