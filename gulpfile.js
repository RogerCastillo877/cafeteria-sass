const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')( require('sass') );
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function css( done ) {
  src('src/scss/app.scss')                         // Identify file
    .pipe( sass() )   // To compile (compressed | expanded)
    .pipe( postcss([ autoprefixer ]) )
    .pipe( dest('build/css') )                     // To save
  done();
};

function dev( done ) {
  watch( 'src/scss/**/*.scss', css )      // to Find and watch all files
  watch( 'src/scss/app.scss', css )
  done();
};

exports.css = css;        // To run glpp css in console
exports.dev = dev;        // To run glpp dev
exports.default = series( css, dev );     // Start one by one
// exports.default = parallel( css, dev );   // Start all at the same time