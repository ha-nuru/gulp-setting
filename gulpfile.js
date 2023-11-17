//list dependences
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass")); // This is different from the video since gulp-sass no longer includes a default compiler. Install sass as a dev dependency `npm i -D sass` and change this line from the video.
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const imagewebp = require("gulp-webp");
const browserSync = require("browser-sync");
const minifyHtml = require("gulp-minify-html");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const gulpEslint = require("gulp-eslint");
const del = require("del");

const _src = "src";
const dist = "dist";
const front = "dist/front";

//server
function compilehtml() {
  return (
    src(`${_src}/**/*.html`)
      // .pipe(minifyHtml())
      .pipe(dest(dist))
  );
}
//scss
const scssOptions = {
  /**
   * outputStyle (Type : String , Default : nested)
   * CSS의 컴파일 결과 코드스타일 지정
   * Values : nested, expanded, compact, compressed
   */
  outputStyle: "expanded",
  /**
   * indentType (>= v3.0.0 , Type : String , Default : space)
   * 컴파일 된 CSS의 "들여쓰기" 의 타입
   * Values : space , tab
   */
  indentType: "tab",
  /**
   * indentWidth (>= v3.0.0, Type : Integer , Default : 2)
   * 컴파일 된 CSS의 "들여쓰기" 의 갯수\
   */
  indentWidth: 1, // outputStyle 이 nested, expanded 인 경우에 사용
  /**
   * precision (Type : Integer , Default : 5)
   * 컴파일 된 CSS 의 소수점 자리수.
   */
  precision: 6,
  /**
   * sourceComments (Type : Boolean , Default : false)
   * 컴파일 된 CSS 에 원본소스의 위치와 줄수 주석표시.
   */ sourceComments: true,
};

function compilescss() {
  return (
    src(`${_src}/front/scss/**/n/*.scss`)
      .pipe(sourcemaps.init())
      .pipe(sass(scssOptions).on("error", sass.logError))
      // .pipe(sourcemaps.write())
      .pipe(prefix("last 2 versions"))
      // .pipe(minify())
      .pipe(dest(`${front}/css/`))
  );
}

// js
function jsmin() {
  return (
    src(`${_src}/front/js/**/*.js`)
      // .pipe(babel({
      //   presets: ['@babel/env']
      // }))
      // .pipe(gulpEslint())
      // .pipe(gulpEslint.format())
      // .pipe(gulpEslint.failOnError())
      // .pipe(terser())
      .pipe(dest(`${front}/js/`))
  );
}

//clean
function clean() {
  return del([dist]);
}
//images
function optimizeimg() {
  return src(`${_src}/front/images/*`)
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 90, progressive: true }),
        imagemin.optipng({ optimizationLevel: 2 }),
      ])
    )
    .pipe(dest(`${front}/images`));
}

//webp images
function webpImage() {
  return src(`${front}/images/*`)
    .pipe(imagewebp())
    .pipe(dest(`${front}/images`));
}
//create watchtask
function watchTask() {
  browserSync.init({
    port: 4500,
    ui: {
      port: 4501,
    },
    server: {
      baseDir: dist,
    },
  });
  watch(`${dist}/**/*.html`).on("change", browserSync.reload);
  watch(`${front}/js/**/*.js`).on("change", browserSync.reload);
  watch(`${front}/css/**/*.css`).on("change", browserSync.reload);
  watch(`${_src}/**/*.html`).on("change", compilehtml);
  watch(`${_src}/front/scss/*.scss`).on("change", compilescss);
  watch(`${_src}/front/scss/**/n/*.scss`).on("change", compilescss);
  watch(`${_src}/front/js/**/*.js`).on("change", jsmin);
  watch([`${_src}/front/images/*`, `${_src}/front/images/*`]).on(
    "change",
    optimizeimg
  );
  watch(`${_src}/front/images/*`).on("change", optimizeimg);
  watch(`${_src}/front/images/*`).on("change", optimizeimg);
  watch([`${_src}/front/images/*`, `${_src}/front/images/*`]).on(
    "change",
    webpImage
  );
  watch(`${_src}/front/images/*`).on("change", webpImage);
  watch(`${_src}/front/images/*`).on("change", webpImage);
}

//default gulp
exports.default = series(
  clean,
  compilehtml,
  compilescss,
  jsmin,
  optimizeimg,
  webpImage,
  watchTask
);
