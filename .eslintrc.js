module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/strongly-recommended", "eslint:recommended"],
  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "vue/no-unused-vars": "off",
    "vue/max-attributes-per-line": "off",
    "vue/no-unused-components": "off",
    "vue/singleline-html-element-content-newline": "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
