import { fluxTypes } from "./action-constants";

export const createTypes = (type) =>
  fluxTypes.reduce((acc, fluxType) => {
    acc[fluxType.toLowerCase()] = `${type}_${fluxType.toUpperCase()}`;
    return acc;
  }, {});

export default createTypes;
