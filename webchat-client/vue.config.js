var path = require('path')
module.exports = {
    devServer: {
        port: 8888,
        open: true,
        proxy: {
            '/socket.io': {
              target: 'http://localhost:3004',
              ws: true,
              changeOrigin: true,
            },
            '/img': {
              target: 'http://localhost:3004',
              changeOrigin: true,
            }
          }
        }
};