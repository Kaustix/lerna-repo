import random from './random';

const error = {
  build() {
    return new Error(random.string());
  }
};

export default error;
