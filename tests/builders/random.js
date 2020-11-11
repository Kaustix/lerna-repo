import faker from 'faker';

export default {
  string(characters = 5) {
    let value = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < characters; i += 1) {
      value += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return value;
  },

  number() {
    return Math.floor(Math.random() * 1000 + 1);
  },

  boolean() {
    return Math.random() >= 0.5;
  },

  date() {
    return faker.date.past();
  }
};
