export const nameRegex = /^[\p{Script=Latin}\s'-]+$/u;
export const cityRegex = /^(?=.*\p{Script=Latin})[\p{Script=Latin}0-9\s'.-]+$/u;
export const streetRegex =
  /^(?=.*\p{Script=Latin})[\p{Script=Latin}0-9\s.'\/,#-]+$/u;
export const apartmentRegex = /^[\p{Script=Latin}0-9\s.'\/,\-]*$/u;

export const postcodeRegex = /^[A-Z0-9\s-]{3,10}$/i;
export const emailRegex = /^(?!['`])\s*[-+.'\w]+@[-.\w]+\.[-.\w]+\s*$/gm;
export const phoneRegex = /^\+\d{1,3}(?:[ -]?\d{2,4})+$/;
export const nipRegex = /^[A-Z]{2}[A-Z0-9]{6,14}$/i;
