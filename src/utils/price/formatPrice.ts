export const formatPrice = (price: number): string => {
  return String(price).replace('.', ',');
};
