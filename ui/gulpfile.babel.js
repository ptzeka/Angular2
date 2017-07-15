global.$root = __dirname;
// Include gulp
var gulp = require('gulp');

//es6module
var sourcemaps = require('gulp-sourcemaps');

//Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var mocha = require('gulp-mocha');
var include = require("gulp-include");
var minifyCSS = require('gulp-minify-css');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var cache = require('gulp-cache');
var babel = require('gulp-babel');
var fs = require("fs");
const typescript = require('gulp-typescript');
const del = require('del');
const tscConfig = require('./tsconfig.json');

//Lint Task
//gulp.task('lint', function() {
//    return gulp.src([
//                     'static/js/**/*.js'
//         ])
//        .pipe(jshint())
//        .pipe(jshint.reporter('default'));
//});

// Compile Our Sass
gulp.task('css', function() {
  gulp.src('./css/**/*.css')
    .pipe(minifyCSS())
    .pipe(concat('styles.css'))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('../static/dist/css'))
});

/*
gulp.task('build', function () {
  return browserify("./scripts/main.js")
    .transform("babelify", { presets: ["es2015","react"]})
    .bundle()
    //.pipe(fs.createWriteStream("static/dist/modules/main.js"));
   .pipe(source('main.js'))
   .pipe(gulp.dest('../static/dist/modules'))
   .on('error', oneError);
});
*/

// TypeScript compile
gulp.task('compile', function () {
  return gulp
    .src('./scripts/main.ts')
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(gulp.dest('../static/dist/app'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['scripts/**/*.js,scripts/*.js'])
      .on('error', oneError)
      .pipe(include())
      .pipe(concat('all.js'))
      .pipe(gulp.dest('../static/dist/js'))
      .pipe(rename('all.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('../static/dist/js'));
});

gulp.task('test', function() {
  return gulp.src(['scripts.unitTests/**/test-*.js'], { read: false })
    .pipe(mocha({
      reporter: 'spec',
      globals: {
      should: require('should')
      }
    }));
});

/*
gulp.task('test', function (done) {
  new Server({
    configFile: process.cwd() + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
*/

/* Watch Files For Changes*/
gulp.task('watch', function() {
    gulp.watch('./css/*.css', ['css']);
    gulp.watch('./scripts/*.ts',['compile'])
    gulp.watch('./scripts/**/*.ts',['compile'])
});

gulp.task('clearCache', function() {
  cache.clearAll();
});

// Default Task
gulp.task('default', ['css', 
                      'clearCache',
                      'scripts',
                      //'test',
                      'compile',
                      'watch']);

function oneError (error) {
  // If you want details of the error in the console
  console.log(error.toString())
  //this.emit('end')
}


