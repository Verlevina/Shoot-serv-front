const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const del = require('del');
const babel = require('gulp-babel');


gulp.task('js', () => gulp.src('source/main.js')
  .pipe(babel({ presets: ['@babel/env'] }))
  .pipe(gulp.dest('build')));


gulp.task('css', () => gulp.src('source/sass/style.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer(),
  ]))
  .pipe(gulp.dest('build/css'))
  .pipe((csso()))
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('build/css'))
  .pipe(server.stream()));

gulp.task('webp', () => gulp.src('source/img/*.{png,jpg}')
  .pipe(webp({ quality: 90 }))
  .pipe(gulp.dest('source/img')));

gulp.task('server', () => {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
  gulp.watch('source/img/**/*.svg', gulp.series('html', 'refresh'));
  gulp.watch('source/*.html').on('change', gulp.series('html', 'refresh'));
});
gulp.task('refresh', () => {
  server.reload();
  done();
});


gulp.task('images', () => gulp.src('source/img/*.{png,jpg,svg}')
  .pipe(imagemin([
    imagemin.optipng({ optimizationLevel: 3 }),
    imagemin.jpegtran({ progressive: true }),
    imagemin.svgo(),
  ]))
  .pipe(gulp.dest('source/img')));

gulp.task('html', () => gulp.src('source/*.html')
  .pipe(posthtml([
    include(),
  ]))
  .pipe(gulp.dest('build')));


gulp.task('copy', () => gulp.src([
  'source/fonts/*.{woff,woff2}',
  'source/img/**',
  'source/js/**'], {
  base: 'source',
})
  .pipe(gulp.dest('build')));

gulp.task('clear', () => del('build'));

gulp.task('build', gulp.series('clear', 'copy', 'css', 'html'));

gulp.task('start', gulp.series('build', 'server'));
