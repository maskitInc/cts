// Load Gulp
var gulp = require('gulp'),
    pug = require('gulp-pug'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    plugins = require('gulp-load-plugins')({
        rename: {
            'gulp-live-server': 'serve'
        }
    });

// Start Watching: Run "gulp"
gulp.task('default', ['watch']);

// Run "gulp server"
gulp.task('server', ['serve', 'watch']);

// SASS to CSS: Run manually with: "gulp build-css"
gulp.task('build-css', function() {
    return gulp.src('public/scss/style.scss')
        .pipe(plugins.plumber())
        .pipe(plugins.sass())
        .on('error', function(err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(plugins.autoprefixer({
            browsers: [
                '> 1%',
                'last 2 versions',
                'firefox >= 4',
                'safari 7',
                'safari 8',
                'IE 8',
                'IE 9',
                'IE 10',
                'IE 11'
            ],
            cascade: false
        }))
        .pipe(plugins.cssmin())
        .pipe(gulp.dest('build/css')).on('error', gutil.log);
});

gulp.task('build-html', function buildHTML() {
    return gulp.src('./views/**/*.pug')
        .pipe(plugins.plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'))
});

gulp.task('build-js', function buildHTML() {
    return gulp.src('public/js/*.js', { sourcemaps: true })
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js', { sourcemaps: true }))
});

// Default task
gulp.task('watch', function() {
    // gulp.watch('./libs/**/*.js', ['squish-jquery']);
    gulp.watch('./*.js', ['build-js']);
    gulp.watch('./**/*.pug', ['build-html']);
    gulp.watch('./**/*.scss', ['build-css']);
});

gulp.task('serve', function() {
    var server = plugins.serve.static('/', 3000);
    server.start();
    gulp.watch(['public/*', 'views/*'], function(file) {
        server.notify.apply(server, [file]);
    });
});

gulp.task('build', [`build-css`, `build-js`, `build-html`], function() {
    console.log('Building files');
})