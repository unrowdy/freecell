// rollup.config.js
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/js/hash.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    copy({
      targets: [{
        src: 'src/css/*',
        dest: 'dist'
      }, {
        src: 'src/*.html',
        dest: 'dist',
        transform: (contents) => {
          return contents.toString()
          .replace(/css\//g, '')
          .replace('type="module" src="js/hash.js"', 'src="bundle.js"');
        }
      }]
    })
  ]
};
