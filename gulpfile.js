
const gulp = require('gulp');
const webServer=require('gulp-webserver');
const nodeMon=require('gulp-nodemon');

const _index='./public/';
const options = {
    host: 'localhost',
    port:9000,
    livereload:true,
    directoryListening:true,
    open:true
};

gulp.task('node',function () {
    nodeMon({
        script: './server.js',
        env: { 'NODE_ENV': 'production' }
    })
});

gulp.task('open',function () {
    gulp.src(_index)
        .pipe(webServer(options));
});

gulp.task('default', ['node','open'], function() {
});