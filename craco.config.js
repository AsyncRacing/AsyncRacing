// CRACO must use `module.exports = ...`  over `export default ...`
module.exports = {
  babel: {
    loaderOptions: {
      ignore: ['./node_modules/mapbox-gl/dist/mapbox-gl.js'],
    },
  },
}
