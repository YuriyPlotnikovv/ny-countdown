const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const del = require("del");
const sync = require("browser-sync").create();
const concat = require("gulp-concat");
const clear = require("gulp-clean-css");

const waitFor = (stream) => {
  return new Promise((resolve, reject) => {
    stream.on("end", resolve).on("error", reject);
  });
};

// Styles
const styles = () => {
  return gulp
    .src("src/css/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(
      sass.sync({
        style: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(clear({level: 2}))
    .pipe(concat("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("public/css"))
    .pipe(sync.stream());
};
exports.styles = styles;

// Scripts
const scripts = () => {
  return gulp
    .src("src/js/modules/*.js")
    .pipe(sourcemap.init())
    .pipe(uglify())
    .pipe(concat("script.min.js"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("public/js"))
    .pipe(sync.stream());
};
exports.scripts = scripts;

// Images
const images = async () => {
  const convert = gulp
    .src(["src/assets/**/*.{jpg,jpeg,png}", "!src/assets/icons/**/*"])
    .pipe(imagemin())
    .pipe(webp({ quality: 80 }))
    .pipe(gulp.dest("public/assets"));

  const copyWebp = gulp
    .src("src/assets/**/*.webp")
    .pipe(gulp.dest("public/assets"));

  await Promise.all([convert, copyWebp].map(waitFor));
};
exports.images = images;

// Copy
const copy = () => {
  return gulp
    .src(
      [
        "src/js/vendor/*.js",
        "src/css/vendor/*.css",
        "src/fonts/*.{woff,woff2}",
        "src/assets/icons/*",
        "src/assets/*.mp3",
      ],
      { base: "src" }
    )
    .pipe(gulp.dest("public/"));
};
exports.copy = copy;

// Clean
const clean = () => {
  return del(["public"], {force: true});
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

// Server
const server = (done) => {
  sync.init({
    server: {
      baseDir: "./",
    },
    cors: true,
    notify: false,
  });
  done();
};
exports.server = server;

// Watch
const watcher = () => {
  gulp.watch("src/css/**/*.scss", gulp.series(styles));
  gulp.watch("src/js/modules/**/*.js", gulp.series(scripts));
};
exports.watch = watcher;

exports.default = gulp.series(
  build,
  server,
  watcher
);
