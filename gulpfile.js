var gulp = require('gulp');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync');
var uglify       = require('gulp-uglify');
var plumber      = require('gulp-plumber');
var rename       = require("gulp-rename");
var imagemin     = require("gulp-imagemin");
var pngquant     = require('imagemin-pngquant');

gulp.task('browser-sync', function() {
  browserSync.init(['src/assets/css/*.css', 'src/assets/js/**/*.js', 'index.html'], {
    server: {
      baseDir: './'
    }
  });
});

gulp.task('scripts', function() {
  gulp.src('src/assets/js/*.js')
  .pipe(uglify())
  .pipe(rename({
    dirname: "min",
    suffix: ".min",
  }))
  .pipe(gulp.dest('src/assets/js'))
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

gulp.task('default', ['browser-sync', 'sass', 'scripts'], function() {
  gulp.watch('src/assets/sass/**/*.scss', ['sass']);
  gulp.watch('src/assets/js/**/*.js', ['scripts']);
});
