import random from './random';
import error from './error';

class FluxStandardAction {
  constructor(type) {
    this._type = type;
    this._payload = {};
    this._error = false;
    this._meta = {};
  }

  payload(value) {
    this._payload = value;
    return this;
  }

  failed(value) {
    this.payload(value || error.build());
    this._error = true;
    return this;
  }

  meta(value) {
    this._meta = value || {};
    return this;
  }

  processing(value) {
    this.payload(value);
    this.meta({ processing: true });
    return this;
  }

  build() {
    return {
      type: this._type,
      payload: this._payload,
      error: this._error,
      meta: this._meta
    };
  }
}

export default {
  for: (type) => new FluxStandardAction(type),
  build: () => {
    const fsa = new FluxStandardAction(random.string());
    return fsa.payload(random.string()).build();
  }
};
