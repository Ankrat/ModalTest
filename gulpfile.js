var gulp       = require('gulp'),
    browserify = require('browserify'),
    v_src      = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    buffer     = require('vinyl-buffer'),
    babel      = require('babelify'),
    watchify   = require('watchify'),
    browserSync = require('browser-sync').create();

// var isDev = (process.env.NODE_ENV === 'development') ? true : false;

function compile(watch) {
    // Browserify needs ONLY ONE entry point of your app
    // https://github.com/substack/node-browserify#usage
    var bundler = watchify(browserify('./src/scripts/main.js', {
        debug: true
    }).transform(babel));

    function rebundle() {
        console.error("rebundle...");
        bundler.bundle()
            .on('error', function(err) {
                console.error(err);
                browserSync.notify("Browserify Error!");
                this.emit('end');
            })
            .pipe(v_src('main.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({
                loadMaps: true
            }))
            .pipe(sourcemaps.write('./')) // Same level as js.destination
            .pipe(gulp.dest('./dist/scripts'))
            .pipe(browserSync.stream());
            return;
    }

    if (watch) {
        bundler.on('update', function() {
            rebundle();
        });
    }

    rebundle();
    return;
}


gulp.task('js', function() {
    return compile(true);
});





gulp.task('html', function() {
    // Gets .html files in pages
    return gulp.src( './src/*.html' )
        .pipe(gulp.dest( './dist' ))
        .pipe(browserSync.stream());
});




gulp.task( 'html-watch', ['html'], function(){
    browserSync.reload();
});





gulp.task('serve', ['html', 'js'], function(){

    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

    gulp.watch( './src/*.html', ['html-watch'] );
});





gulp.task('default', ['serve']);