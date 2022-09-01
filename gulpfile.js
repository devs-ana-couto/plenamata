'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

var 
    del = require( 'del' ),
    uglify = require( 'gulp-uglify' ),
    concat = require( 'gulp-concat' ),
    addsrc = require( 'gulp-add-src' ),
    postcss = require( 'gulp-postcss' ),
    autoprefixer = require( 'autoprefixer' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    base64 = require('gulp-base64-inline'),
    imagemin = require( 'gulp-imagemin' ),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload
;

function compileSass(){
    return gulp
        .src( './src/sass/**/*.scss' )
        .pipe( sourcemaps.init() )
        .pipe( sass({ outputStyle: 'compressed', errLogToConsole: true }).on( 'error', sass.logError ) )
        .pipe( postcss( [ autoprefixer() ] ) )
        .pipe( sourcemaps.write( './', { debug: true } ) )
        .pipe( base64( '../svg' ) )
        .pipe( gulp.dest( './assets/stylesheets' ) )
    ;
}

function complileJS(){

    del([ 
        './assets/javascripts/main.js',
        './assets/javascripts/main.js.map' 
    ]);

    // Frontend
    return gulp
        .src( './src/js/jquery.js' )
        .pipe( addsrc.append( './src/js/scripts.js' ) )
        .pipe( addsrc.append( './src/js/includes/*.js' ) )
        .pipe( sourcemaps.init() )
        .pipe( concat( 'main.js' ) )
        .pipe( uglify() )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( './assets/javascripts' ) )
    ;

}

function compileJsAdmin(){

    del([ 
        './assets/javascripts/capas.js',
        './assets/javascripts/capas.js.map' 
    ]);

    return gulp
        .src( './src/js/capas.js' )
        .pipe( sourcemaps.init() )
        .pipe( uglify() )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( './assets/javascripts' ) )
    ;

}

function complileImages(){

    del( [ './assets/images/*.{png,gif,jpg,jpeg,png,webp}' ] );

    var comprime = gulp
        .src( './src/images/*.{png,gif,jpg,jpeg,webp}' )
        .pipe( imagemin() )
        .pipe( gulp.dest( './assets/images' ) )
    ;
    var copysvgs = gulp
        .src( './src/svg/*.svg' )
        .pipe( gulp.dest( './assets/images' ) )
    ;

    return [ comprime, copysvgs ];
    
}

function bindFonts(){

    del( [ './assets/fonts/**/*.{woff,woff2}' ] );

    return gulp
        .src( './src/fonts/**/*.{woff,woff2}' )
        .pipe( gulp.dest( './assets/fonts' ) )
    ;
}

function start(){

    browserSync.init({
        proxy: 'https://plenamata.pikiweb.com',
        host: 'plenamata.pikiweb.com',
        https: true,
        open: false,
        notify: false
    });

    bindFonts();
    compileSass();
    complileJS();
    compileJsAdmin();
    complileImages();

    gulp.watch( './src/sass/**/*.scss', compileSass );
    gulp.watch( './src/js/**/*.js', complileJS );
    gulp.watch( './src/js/capas.js', compileJsAdmin );
    gulp.watch( './src/images/*.{png,gif,jpg,jpeg,webp}', complileImages );
    
    gulp.watch( [ './**/*.php', './src/sass/**/*.scss', './src/js/**/*.js' ], function(){
        browserSync.reload();
        done();
    });

}

gulp.task( 'default', start );