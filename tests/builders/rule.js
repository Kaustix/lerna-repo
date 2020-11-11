import random from './random';

export default {
  build() {
    return {
      code: random.number(),
      message: random.string()
    };
  }
};
