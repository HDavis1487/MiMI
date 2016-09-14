var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    prefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();



// Paths

var src = {
  jade: 'assets/jadefiles/**/*.jade',
  jadeHtml: 'assets/jadefiles/index.jade',
  sass: 'assets/styles/**/*.sass'
};

var output = {
  jade: 'jadefiles',
  css: 'css',
  html: './'
};


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Jade
gulp.task('jade',function(){
  gulp.src(src.jade)
  .pipe(jade({pretty:true}))
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(gulp.dest('./'))
  // .pipe(notify("Saved file: <%= file.relative %>!"))
  .pipe(browserSync.stream());
});

gulp.task('jade-includes',function(){
  gulp.src('assets/jadefiles/includes/**.jade')
  .pipe(jade({pretty:true}))
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  // .pipe(gulp.dest('assets/jadefiles'))
  // .pipe(notify("Saved file: <%= file.relative %>!"))
  .pipe(browserSync.stream());
});


// Sass
gulp.task('sass',function(){
  return gulp.src(src.sass)
  .pipe(sass())
  .pipe(prefixer())
  .pipe(plumber())
  .pipe(gulp.dest(output.css))
  // .pipe(notify("Saved file: <%= file.relative %>!"))
  .pipe(browserSync.stream());
});

// Watch
gulp.task('watch',function(){
  gulp.watch(src.jade,['jade']);
  gulp.watch('assets/jadefiles/includes/**.jade'['jade-includes']);
  gulp.watch(src.sass,['sass']);
  // gulp.watch("./*.html").on('change', browserSync.reload);
  // gulp.watch("sass/*.sass").on('change', browserSync.reload);
  gulp.watch("assets/jadefiles/**/*.jade").on('change', browserSync.reload);
  gulp.watch("assets/js**/*.js").on('change', browserSync.reload);
});

gulp.task('default',['jade','jade-includes','sass','watch','browser-sync']);
