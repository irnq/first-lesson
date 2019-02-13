var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');
    
gulp.task('browser-sync', function(){
    browserSync({
        server:{
            baseDir:'app'
        },
        notify: false
    })
});

gulp.task('bws', function() {
    return gulp.src('app/**/*.html')
    .pipe(browserSync.reload({stream:true}));
    return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.sass')
    .pipe(sass({outputStyle: 'expanded'}).on('error',sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', function() {
    gulp.watch('app/*.html', gulp.series('bws'));
    gulp.watch('app/sass/*.sass', gulp.series('sass'));
    gulp.watch('app/js/**/*.js', gulp.series('bws'));
});

gulp.task('default',gulp.parallel('sass','watch','browser-sync' ))