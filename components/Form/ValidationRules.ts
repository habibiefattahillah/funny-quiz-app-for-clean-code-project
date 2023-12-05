export const validateAmount = (value: string) => {
  let amount = Math.min(
    Math.max(isNaN(parseInt(value)) ? 0 : parseInt(value), 0),
    20
  );
  return amount.toString();
};