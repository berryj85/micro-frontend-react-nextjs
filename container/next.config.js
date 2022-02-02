const deps = require('./package.json').dependencies;
module.exports = ({
  webpack(config, options) {
    config.module.rules.push({
      test: /_app.js/,
      loader: '@module-federation/nextjs-mf/lib/federation-loader.js',
    });

    config.plugins.push(
      new options.webpack.container.ModuleFederationPlugin({
        remoteType: "var",
        remotes: {
          dashboard: "dashboard"
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            eager: true,
            requiredVersion: false,
          },

          "react-dom": {
            eager: true,
            singleton: true,
            requiredVersion: false,
          },
        },
      }),
    );

    return config
  }

});
