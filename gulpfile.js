const { src, dest, watch, series, parallel } = require('gulp');

const sass = require('gulp-sass')( require('sass') );
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css( done ) {
  src('src/scss/app.scss')                         // Identify file
    .pipe( sass() )   // To compile (compressed | expanded)
    .pipe( postcss([ autoprefixer ]) )
    .pipe( dest('build/css') )                     // To save
  done();
};

function images() {
  return src('src/img/**/*')
          .pipe( imagemin({ optimizationLevel: 3 }) )   // To lighten up images
          .pipe( dest('build/img') );
}

function webpVersion() {
  const options = {
    quality: 50
  }
  return src('src/img/**/*.{png,jpg}')
          .pipe( webp( options ) )
          .pipe( dest('build/img') )
}

function avifVersion() {
  const options = {
    quality: 50
  }
  return src('src/img/**/*.{png,jpg}')
          .pipe( avif( options ) )
          .pipe( dest('build/img') )
}

function dev( done ) {
  watch( 'src/scss/**/*.scss', css )      // to Find and watch all files
  watch( 'src/img/**/*', images )
  done();
};

exports.css = css;        // To run glpp css in console
exports.dev = dev;        // To run glpp dev
exports.images = images;
exports.webpVersion = webpVersion;
exports.avifVersion = avifVersion;
exports.default = series( images, webpVersion, avifVersion, css, dev );     // Start one by one
// exports.default = parallel( css, dev );   // Start all at the same time