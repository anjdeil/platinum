export const nameRegex = /^[A-Za-zÀ-ÿ\s'-]+$/;
export const cityRegex = /^[A-Za-zÀ-ÿ0-9\s'-]+$/;
export const streetRegex = /^[A-Za-zÀ-ÿ0-9\s.'/-]+$/;
export const apartmentRegex = /^[A-Za-zÀ-ÿ0-9\s.'\/-]+$/;
export const postcodeRegex = /^[A-Z0-9\s-]{3,10}$/i;
export const emailRegex = /^(?!['`])\s*[-+.'\w]+@[-.\w]+\.[-.\w]+\s*$/gm;
export const phoneRegex =
  /^\+?[1-9]\d{0,2}[-\s]?\d{3}[-\s]?\d{3}[-\s]?\d{3,4}$/g;
export const nipRegex = /^[0-9\\-]*$/;
