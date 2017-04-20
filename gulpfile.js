'use strict';

var app = {
	srcPath:'src/',
	devPath:'bulid/',
	proPath:'dist/'
}
var proName="itany";


var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

gulp.task('html',function(){
	gulp.src(app.srcPath+'**/*.html')
			.pipe($.plumber())
			.pipe(gulp.dest(app.devPath))
			.pipe($.htmlmin({
				collapseWhitespace:true,
				removeComments:true,
				collapseBooleanAttributes:true,
				removeEmptyAttributes:true,
				removeScriptTypeAttributes:true,
				removeStyleLinkTypeAttributes:true
			}))
			.pipe(gulp.dest(app.proPath))
			.pipe(browserSync.stream());
});



gulp.task('less',function(){
	gulp.src(app.srcPath+'less/**/*.less')
			.pipe($.plumber())
			.pipe($.less())

			.pipe($.autoprefixer({
				browsers:['last 20 versions'],
				cascode:false
			}))
			.pipe(gulp.dest(app.devPath+'css'))
			.pipe(gulp.dest(app.proPath+'css'))
			.pipe($.cssmin())
			.pipe($.rename({
				suffix: ".min",
			extname: ".css"
			}))
			.pipe(gulp.dest(app.proPath+'css'));
});

gulp.task('js',function(){
	gulp.src(app.srcPath+'js/**/*.js')
		.pipe($.plumber())
		.pipe($.concat(proName+'.js'))
		.pipe(gulp.dest(app.devPath+'js'))
		.pipe(gulp.dest(app.proPath+'js'))
		.pipe($.uglify())
		.pipe($.rename({
			suffix: ".min",
		extname: ".js"
		}))
		.pipe(gulp.dest(app.proPath+'js'))
		.pipe(browserSync.stream());
});

gulp.task('watch',function(){
	gulp.watch(app.srcPath+'**/*.html',['html']);
	gulp.watch(app.srcPath+'less/**/*.less',['less']);
	gulp.watch(app.srcPath+'js/**/*.js',['js']);
});


gulp.task('clean',function(){
	gulp.src([app.devPath,app.proPath])
			.pipe($.clean());
});

gulp.task('img',function(){
	gulp.src(app.srcPath+'image/**/*')
			.pipe($.plumber())
			.pipe($.imagemin())
			.pipe(gulp.dest(app.devPath+'image'))
			.pipe(gulp.dest(app.proPath+'image'))

});

gulp.task('default',['html','less','js','watch'],function(){
	browserSync.init({
		server:{
			baseDir:app.devPath
		}
	});
	gulp.watch(app.devPath+"css/**/*.css").on("change",browserSync.reload);
});























