const path = require("path");
const SitemapPlugin = require("sitemap-webpack-plugin").default;
const paths = [
  {
    path: "/",
    lastmod: new Date().toISOString().slice(0, 10),
    priority: 0.8,
    changefreq: "hourly"
  },
  {
    path: "/about",
    lastmod: new Date().toISOString().slice(0, 10),
    priority: 0.7,
    changefreq: "hourly"
  },
  {
    path: "/blogs",
    lastmod: new Date().toISOString().slice(0, 10),
    priority: 0.9,
    changefreq: "hourly"
  }
];

module.exports = {
  configureWebpack: {
    resolve: {
      modules: [path.resolve("./src"), path.resolve("./node_modules")]
    },
    plugins: [
      new SitemapPlugin({
        base: "https://deftnt-blog.herokuapp.com",
        paths,
        options: {
          filename: "sitemap.xml",
          lastmod: true,
          changefreq: "hourly",
          priority: 0.8
        }
      })
    ]
  },

  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false
    }
  },

  transpileDependencies: ["quasar"]
};
