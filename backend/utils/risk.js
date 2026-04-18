function calculateRisk(amount) {
  if (amount > 10000) return 80;
  if (amount > 5000) return 50;
  return 20;
}

module.exports = calculateRisk;