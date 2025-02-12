export const roundedPrice = (price: number): string => {
  return (Math.round(price * 100) / 100).toFixed(2);
};
