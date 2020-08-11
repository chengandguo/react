module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: ["./src/styles/variables.scss",
          "./src/styles/basics.scss"]
      }
    }
  },

  devServer: {
    proxy: process.env.REACT_APP_PROXY,
  },
};