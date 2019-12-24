const path = require("path");
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/_variables.scss";`
      }
    }
  },
  configureWebpack: {
    resolve: {
      modules: [path.resolve("./src"), path.resolve("./node_modules")]
    }
  }
};
