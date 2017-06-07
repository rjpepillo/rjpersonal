const gulp = require('gulp');
const tslint = require('gulp-tslint');

const typescript = require('gulp-typescript');
const tsConf = require('../tsconfig.json').compilerOptions;
const conf = require('../conf/gulp.conf');

gulp.task('scripts', scripts);

function scripts() {
  return gulp.src(conf.path.src('**/*.ts'))
    // TODO removed by jap because it messes up the gulp build with its "oh your styling is wrong" errors
    // .pipe(tslint())
    // .pipe(tslint.report('verbose'))

    .pipe(typescript(tsConf))
    .pipe(gulp.dest(conf.path.tmp()));
}
