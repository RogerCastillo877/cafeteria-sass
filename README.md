# Cafetería-sass

To start project install dependencies
```
npm i
```

Install GULP
```
npm i --save-dev gulp
```

Create __gulpfile.js__ and create a new task
```
npm i --save-dev sass gulp-sass
```
```
const { src, dest } = require('gulp');
const sass = require('gulp-sass')( require('sass') );

function css( done ) {
  src('src/scss/app.scss')        // Identify file
    .pipe( sass() )               // To compile
    .pipe( dest('build/css') )    // To save
  done()
}

exports.css = css;
```

Add whatch gulp, import watch of gulp
```
const { src, dest, watch } = require('gulp');

function dev( done ) {
  watch( 'src/scss/app.scss', css )
  done();
};
```

Install autoprefixer and postcss
```
npm i --save-dev autoprefixer gulp-postcss
```

In __package.json__ add to give support in others browsers
```
"browserslist": [
  "last 1 version",
  "> 1%"
]
```

in __gulpfile.js__ add autoprefixer and import
```
const autoprefixer = require('autoprefixer');

function css( done ) {
  src('src/scss/app.scss')                         // Identify file
    .pipe( sass({ outputStyle: 'compressed' }) )   // To compile
    .pipe( postcss([ autoprefixer ]) )
    .pipe( dest('build/css') )                     // To save
  done();
};
```

Create a new folder __header__ and add a file ___header.scss__
underscore indicate that this file will be include in other file
```
.header {
  display: flex;
  flex-direction: column;
}
```

Adding file in other file that you need these styles
```
@import 'header/header';
and now you also can use
@use 'header/header'
```

You can add whatchers to others files in __dev__ function
```
watch( 'src/scss/header/_header.scss', css )
```
but you have to add all files one by one, or also you can use to follow all files:
```
watch( 'src/scss/**/*.scss', css )
```
