/* eslint no-console: "off" */

const states = () => ({
  requested: () => {},
  execute: () => {},
  succeeded: () => {},
  rulesBroken: (rules, failed) => {
    const brokenRules = (rules || []).reduce(
      (acc, err) => ({
        message: `${err.message}. ${acc.message}`,
      }),
      ""
    );
    console.warn(
      `Broken rules occurred performing the operation: '${brokenRules.message}'`
    );
    return failed(brokenRules.message);
  },
  failed: () => {},
  errorMessage: () => null,
  next: null,
});

export const thunk = (options) => {
  const request = { ...states(), ...options };
  return async (dispatch, getState) => {
    try {
      dispatch(request.requested());
      const response = await request.execute(getState());
      if (response.ok) {
        dispatch(request.succeeded(response.data));
        if (request.next) {
          dispatch(request.next(getState(), dispatch));
        }
      } else {
        dispatch(request.rulesBroken(response.errors, request.failed));
      }
    } catch (err) {
      console.error(
        request.errorMessage(err) ||
          `An error occurred performing the operation: '${err.message}'`
      );
      dispatch(request.failed(err));
    }
  };
};

export default thunk;
