const gulp = require("gulp");
const path = require("path");

gulp.task("clean", () =>
  gulp.src("./dist", { read: false, allowEmpty: true, })
    .pipe(require("gulp-clean")())
);

gulp.task("vendor", () =>
  gulp.src([
    path.join(path.dirname(require.resolve("angular")), "angular.js"),
  ])
    .pipe(require("gulp-concat")("vendor.js"))
    .pipe(gulp.dest("./dist/js/"))
);

gulp.task("templates", () =>
  gulp.src("./src/js/**/*.tpl.html")
    .pipe(require("gulp-ng-html2js")({
      moduleName: "templates",
      prefix: "./js/",
    }))
    .pipe(require("gulp-concat")("templates.js"))
    .pipe(gulp.dest("./dist/js/"))
);

gulp.task("main", () =>
  gulp.src("./src/js/**/*.js")
    .pipe(require("gulp-concat")("main.js"))
    .pipe(gulp.dest("./dist/js/"))
);

gulp.task("style", () =>
  gulp.src([
    "./src/less/style.less",
    "./src/js/**/*.less",
  ])
    .pipe(require("gulp-less")({
      paths: [
        path.join(__dirname, "src", "less"),
      ],
    }))
    .pipe(require("gulp-concat")("style.css"))
    .pipe(gulp.dest("./dist/style/"))
);

gulp.task("index", () =>
  gulp.src("./src/index.html")
    .pipe(gulp.dest("./dist/"))
);

gulp.task("assets", () =>
  gulp.src("./src/assets/**/*")
    .pipe(gulp.dest("./dist/assets/"))
);

gulp.task("default", gulp.series(
  "clean",
  gulp.parallel(
    "vendor",
    "templates",
    "main",
    "style",
    "index",
    "assets",
  ),
));
