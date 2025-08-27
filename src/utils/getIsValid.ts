export const getIsValid = (value: string) => {
   return !!value.trim() && value.length >= 3;
 };