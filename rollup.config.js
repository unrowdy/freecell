// rollup.config.js
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/hash.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    copy({
      targets: [
        { src: 'index.html', dest: 'dist' },
        { src: 'default.css', dest: 'dist' }
      ]
    })
  ]
};
