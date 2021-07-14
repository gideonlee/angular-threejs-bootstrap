// Includes usage of ts-loader and ts-shader-loader to identify and use the appropriate loader based on the file type
module.exports = {
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.(glsl|vs|fs)$/, loader: "ts-shader-loader" }
    ]
  }
};