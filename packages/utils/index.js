import format from "date-fns/format";

export const isNullOrWhiteSpace = (str) => !str || str.trim().length === 0;

export const match = (value, term) =>
  value.toLowerCase().includes(term.toLowerCase());

export const isArrayEmpty = (array) => !Array.isArray(array) || !array.length;

export const dateFormat = "dd/MM/yyyy";
export const toDateString = (value) => format(value, dateFormat);

console.log("asdf");
