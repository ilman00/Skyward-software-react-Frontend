// src/utils/format.ts
export const formatPKR = (amount: number): string => {
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    return `PKR ${millions % 1 === 0 ? millions : millions.toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    const thousands = amount / 1_000;
    return `PKR ${thousands % 1 === 0 ? thousands : thousands.toFixed(1)}K`;
  }
  return `PKR ${amount.toLocaleString()}`;
};