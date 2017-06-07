const gulp = require('gulp');
const filter = require('gulp-filter');
const useref = require('gulp-useref');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const htmlmin = require('gulp-htmlmin');
const sourcemaps = require('gulp-sourcemaps');
const uglifySaveLicense = require('uglify-save-license');
const inject = require('gulp-inject');
const ngAnnotate = require('gulp-ng-annotate');
const conf = require('../conf/gulp.conf');
const constant = require('gulp-ng-constant');
const rename = require('gulp-rename');

gulp.task('build', build);
gulp.task('configure', configure);

function configure() {

  var config = require('../src/conf/config.json');
  var envConfig = config['development'];

  if (process.env.NODE_ENV === 'production') {
    console.log('loading production config');
    envConfig = config['production'];
  } else if (process.env.NODE_ENV === 'testing'){
    console.log('loading testing config');
    envConfig = config['testing'];
  } else {
    console.log('loading development config');
  }

  return constant({
    constants: envConfig,
    templatePath: 'src/conf/constant.tpl.ejs',
    stream: true,
    wrap: false
  }).pipe(rename('app.config.ts'))
    .pipe(gulp.dest('src/app/'));

}

function build() {
  const partialsInjectFile = gulp.src(conf.path.tmp('templateCacheHtml.js'), {read: false});
  const partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: conf.paths.tmp,
    addRootSlash: false
  };

  const htmlFilter = filter(conf.path.tmp('*.html'), {restore: true});
  const jsFilter = filter(conf.path.tmp('**/*.js'), {restore: true});
  const cssFilter = filter(conf.path.tmp('**/*.css'), {restore: true});

  return gulp.src(conf.path.tmp('/index.html'))
    .pipe(inject(partialsInjectFile, partialsInjectOptions))
    .pipe(useref())
    .pipe(jsFilter)
    .pipe(sourcemaps.init())
    .pipe(ngAnnotate())
    .pipe(uglify({preserveComments: uglifySaveLicense})).on('error', conf.errorHandler('Uglify'))
    .pipe(rev())
    .pipe(sourcemaps.write('maps'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(sourcemaps.init())
    .pipe(cssnano())
    .pipe(rev())
    .pipe(sourcemaps.write('maps'))
    .pipe(cssFilter.restore)
    .pipe(revReplace())
    .pipe(htmlFilter)
    .pipe(htmlmin())
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(conf.path.dist()));
}
