export const roundedPrice = (price: number): number => {
  return parseFloat((Math.round(price * 100) / 100).toFixed(2));
};
