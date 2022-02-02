const { withFederatedSidecar, federationLoader } = require("@module-federation/nextjs-mf");
const deps = require('./package.json').dependencies;
let merge = require('webpack-merge');
module.exports = withFederatedSidecar({
  name: "dashbaord",
  filename: "static/chunks/dashboard-remote-entry.js",
  exposes: {
    "./DashboardHome": "./pages/DashboardHome.js"
  },
  shared: {
    react: {
      eager: true,
      requiredVersion: false,
      singleton: true,
    },
  }
})({
  webpack5: true,
  webpack(config, options) {
    const { webpack, isServer } = options;
    config.module.rules.push({
      test: /_app.js/,
      loader: '@module-federation/nextjs-mf/lib/federation-loader.js',
    });
    if (isServer) {
      Object.assign(config.resolve.alias, {
      });
    } else {
      config.plugins.push(
        new webpack.container.ModuleFederationPlugin({
          shared: {
            react: {
              singleton: true,
              eager: true,
              requiredVersion: false,
            }
          },
        }),
      );
    }
    return merge.merge(config, {
      entry() {
        return config.entry().then(entry => {
          return entry;
        });
      },
    });
  }

});
