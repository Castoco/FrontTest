const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const sass = require('gulp-sass');
const del = require("del");
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');


// Styles
const styles = () => {
  return gulp.src("src/scss/styles.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("dist/css"))
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'dist'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

const html = () => {
  return gulp.src("src/*.html")
    .pipe(gulp.dest("dist"))
    .pipe(sync.stream());
};

exports.html = html;

// Watcher

const watcher = () => {
  gulp.watch("src/scss/**/*.scss", gulp.series("styles")).on("change", sync.reload);
  gulp.watch("src/*.html", gulp.series("html")).on("change", sync.reload);
}

exports.default = gulp.series(
  styles, html, server, watcher
);

//htmlmin
const minhtml = () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream());
};

//js min

const scripts = () => {
  return gulp.src('./src/js/*.js')
  .pipe(sourcemap.init())
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
  .pipe(sourcemap.write(''))
    .pipe(gulp.dest('dist/js'));
};


const vendors = () => {
  return gulp.src([
    "src/js/vendor/*.js"])
    .pipe(rename("vendor.min.js"))
    .pipe(gulp.dest("dist/js"));
    };

exports.vendors = vendors;

// images

const images = () => {
    return gulp.src("src/img/**/*.{jpg,png,svg}")
      .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 4}),
        imagemin.mozjpeg({progressive: true}),
        imagemin.svgo()
  ]))
    .pipe(gulp.dest('dist/img'))
}

const clean = () => {
return del(["dist"]);
};

exports.clean = clean;

const build = gulp.series(clean, styles, minhtml, scripts, vendors, images, server);
exports.build = build;
