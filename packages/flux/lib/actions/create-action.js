import FluxStandardAction from "./flux-standard-action";

export const createAction = (type) => new FluxStandardAction(type);

export default createAction;
