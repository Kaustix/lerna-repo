const createReducer = (initialState, handlers) => (
  state = initialState,
  action = { type: "unknown" }
) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};

export default createReducer;
