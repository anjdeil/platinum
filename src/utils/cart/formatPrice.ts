const formatPrice = (price: number | undefined | boolean) => {
  if (typeof price !== "number") return "0.00";
  return Math.round(price * 100) / 100;
};

export default formatPrice;
