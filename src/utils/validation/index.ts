export const nameRegex = /^[\p{Script=Latin}\s'-]+$/u;
export const cityRegex = /^(?=.*\p{Script=Latin})[\p{Script=Latin}0-9\s'.-]+$/u;
export const streetRegex =
  /^(?=.*\p{Script=Latin})[\p{Script=Latin}0-9\s.'\/,#-]+$/u;
export const apartmentRegex = /^[\p{Script=Latin}0-9\s.'\/,\-]*$/u;

export const postcodeRegex = /^[A-Z0-9\s-]{3,10}$/i;
export const emailRegex = /^(?!['`])\s*[-+.'\w]+@[-.\w]+\.[-.\w]+\s*$/gm;
export const phoneRegex =
  /^\+?[1-9]\d{0,2}[-\s]?\d{3}[-\s]?\d{3}[-\s]?\d{3,4}$/g;
export const nipRegex = /^[0-9\\-]*$/;
