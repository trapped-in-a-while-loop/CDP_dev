module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "mongo": true
  },
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "semi": ["warn", "always"],
    "quotes": ["warn", "double"],
    "no-var": "warn",
    "eqeqeq": ["warn", "always"],
    "default-case": "warn",
    "no-multi-spaces": "warn"
  }
};