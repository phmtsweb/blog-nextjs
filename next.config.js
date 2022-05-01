// eslint-disable-next-line @typescript-eslint/no-var-requires
const withImages = require('next-images');

const propNextImages = withImages({
  esModule: true,
  webpack(config) {
    return config;
  },
});

module.exports = {
  ...propNextImages,
  images: {
    domains: ['images.prismic.io'],
  },
};
