import random from './random';
import rule from './rule';

class That {
  constructor() {
    this._data = {};
  }

  succeeded(data = {}) {
    this._ok = true;
    this._status = 200;
    this._data = data;
    this._errors = [];
    this._message = null;
    return this;
  }

  failed() {
    this._ok = false;
    this._status = 400;
    this._errors = [];
    this._message = random.string();
    return this;
  }

  errored(message) {
    this._ok = false;
    this._status = 400;
    this._errors = [rule.build()];
    this._message = message || random.string();
    return this;
  }

  isUnauthorized() {
    this._ok = false;
    this._status = 401;
    this._errors = {};
    return this;
  }

  isRedirected() {
    this._ok = false;
    this._status = 301;
    this._errors = {};
    return this;
  }

  hasNoContent() {
    this._ok = true;
    this._status = 204;
    this._errors = {};
    return this;
  }

  build() {
    const value = {
      status: this._status
    };

    value.ok = this._ok;
    value.data = { data: this._data };
    if (!this._ok) {
      value.data = {};
      value.message = this._message;
      value.errors = this._errors;
    }

    return value;
  }
}

class Response {
  constructor() {
    this.that = new That(this);
  }
}

export default new Response();
