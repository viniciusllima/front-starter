var gulp            = require('gulp');
var sass            = require('gulp-sass');
var browserSync     = require('browser-sync');
var uglify          = require('gulp-uglify');
var plumber         = require('gulp-plumber');
var rename          = require("gulp-rename");
var imagemin        = require("gulp-imagemin");
var pngquant        = require('imagemin-pngquant');
var mainBowerFiles  = require('main-bower-files');
var concat          = require('gulp-concat');
var filter          = require('gulp-filter');
var merge           = require('merge-stream');
var notify          = require('gulp-notify');

gulp.task('browser-sync', function() {
  browserSync.init(['src/assets/css/*.css', 'src/assets/js/**/*.js', 'index.html'], {
    server: {
      baseDir: './'
    }
  });
});


var config = {
    dest: 'assets/'
}

gulp.task('js', function() {
  var jsFiles = ['src/assets/js/*'];

  gulp.src(mainBowerFiles().concat(jsFiles))
  .pipe(concat('app.js'))
  .pipe(uglify())
  .pipe(gulp.dest(config.dest + 'js'))
});

gulp.task('sass', function() {
  gulp.src('src/assets/sass/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(plumber())
  .pipe(gulp.dest('src/assets/css'));
});

gulp.task('images', function () {
  return gulp.src('src/assets/images/*')
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest('src/assets/images'));
});

gulp.task('default', ['sass'], function() {
  // gulp.watch('src/assets/sass/**/*.scss', ['sass']);
  // gulp.watch('src/assets/js/**/*.js', ['js']);
});
