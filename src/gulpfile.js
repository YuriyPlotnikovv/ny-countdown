const gulp = require("gulp");
const babel = require("gulp-babel");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("node-sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const del = require("del");
const sync = require("browser-sync").create();
const concat = require("gulp-concat");
const bulk = require("gulp-sass-bulk-importer");
const clear = require("gulp-clean-css");

// Styles
const styles = () => {
  return gulp
    .src("css/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(bulk())
    .pipe(
      sass({
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(clear({level: 2}))
    .pipe(concat("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("../public/css"))
    .pipe(sync.stream());
};
exports.styles = styles;

// Scripts
const scripts = () => {
  return gulp
    .src("js/modules/*.js")
    .pipe(sourcemap.init())
    .pipe(uglify())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("script.min.js"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("../public/js"))
    .pipe(sync.stream());
};
exports.scripts = scripts;

// Images
const images = () => {
  return gulp.src(['assets/**/*.{jpg,jpeg,png}', '!assets/icons/**/*'])
    .pipe(imagemin())
    .pipe(webp({ quality: 80 }))
    .pipe(gulp.dest('../public/assets'))
    .on('end', () => {
      gulp.src('assets/**/*.webp')
        .pipe(gulp.dest('../public/assets'));
    });
};
exports.images = images;

// Copy
const copy = (done) => {
  gulp
    .src(
      [
        "js/vendor/*.js",
        "css/vendor/*.css",
        "fonts/*.{woff,woff2}",
        "assets/icons/*",
        "assets/*.mp3",
      ],
      {base: '.'}
    )
    .pipe(gulp.dest("../public/"));
  done();
};
exports.copy = copy;

// Clean
const clean = () => {
  return del(["../public"], {force: true});
};
exports.clean = clean;

// Build
const build = gulp.series(
  clean,
  copy,
  images,
  gulp.parallel(styles, scripts)
);
exports.build = build;
