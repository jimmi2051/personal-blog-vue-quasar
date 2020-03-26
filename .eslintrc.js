module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/strongly-recommended", "eslint:recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/no-unused-vars": "off",
    "vue/max-attributes-per-line": "off",
    "vue/no-unused-components": "off",
    "vue/singleline-html-element-content-newline": "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
