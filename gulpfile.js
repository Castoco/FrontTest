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
  gulp.watch("src/scss/**/*.scss", gulp.series("styles"));
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

const compress = () => {
  return gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('dist/js'));
};


const vendors = () => {
  return gulp.src([
    "src/js/vendor/*.js"])
    .pipe(rename("vendor.min.js"))
    .pipe(gulp.dest("dist/js"));
    };

exports.vendors = vendors;

const clean = () => {
return del(["dist"]);
};

exports.clean = clean;

const build = gulp.series(clean, vendors, styles, minhtml, compress, vendors, server);
exports.build = build;
