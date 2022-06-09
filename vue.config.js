module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: {
      "/api": {
        target: "https://bordex.l2x.tech/",
        changeOrigin: true
      }
    }
  }
};
