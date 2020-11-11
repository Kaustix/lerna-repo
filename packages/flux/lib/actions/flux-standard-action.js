class FluxStandardAction {
  constructor(type) {
    this._type = type;
    this._payload = {};
    this._error = false;
    this._meta = {};
  }

  payload(value) {
    this._payload = value;
    this._error = false;
    return this;
  }

  error(error) {
    this._payload = error;
    this._error = true;
    return this;
  }

  meta(value) {
    this._meta = value || {};
    return this;
  }

  build() {
    return {
      type: this._type,
      payload: this._payload,
      error: this._error,
      meta: this._meta,
    };
  }
}

export default FluxStandardAction;
