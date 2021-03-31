const gulp = require('gulp');
const gulp_pug = require('gulp-pug');
const gulp_sass = require('gulp-sass');
const gulp_babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const compress_images = require("compress-images");
const html2pug = require('gulp-html2pug');
const fs = require('fs');

const browserSync = require('browser-sync');

function swallowError(error) {
	console.log(error.toString());
	this.emit('end');
} 

function swallowErrorBeQuiet() {
	this.emit('end');
}

function process_babel(arg1, arg2) {
	var callback = false;

	var fname;
	if(arg1 instanceof Function && arg1.name == 'done') {
		fname = 'src/javascript/**/*.{js,es6,main}';
		callback = true;
	}
	else {
		fname = arg2;
	}

	console.log('Processing \"' + fname + '\"...');

    gulp.src(fname, {"base": "src/js"})
        .pipe(sourcemaps.init())
		.pipe(gulp_babel({
            presets: [
                '@babel/env',
                'minify'
            ]
        }))
        .pipe(sourcemaps.write('.'))
		.on('error', swallowError)
		.pipe(gulp.dest('build/js'));

	if(callback)
		arg1();
}

function process_pug(cb) {
	gulp.src([
		'src/pug/source-files/index.pug',
		'src/pug/source-files/blog.pug',
		'src/pug/source-files/blog-post.pug',
		'src/pug/source-files/contakt.pug',
		'src/pug/source-files/inspection-fire.pug',
		'src/pug/source-files/management-system-bhp.pug',
		'src/pug/source-files/extinguishers.pug'
	])
		.pipe(gulp_pug())
		.on('error', swallowError)
		.pipe(gulp.dest('build'));
	cb();
}

function process_sass(cb) {
	gulp.src([ 
		'src/scss/**/*.scss'
	])
        .pipe(sourcemaps.init())
		.pipe(gulp_sass({
            outputStyle: 'compressed'
        }))
		.on('error', swallowError)
		.pipe(autoprefixer({
            cascade: true
        }))
        .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('build/css'));
	cb();
}

function process_image(c_input_path, stats) {
    c_input_path = c_input_path.replace(/\\/g, '/'); // hack
    compress_images(
        c_input_path,
        "build/images/",
        {compress_force: false, statistic: false, autoupdate: true},
        false,
        {jpg: {engine: 'webp', command: false}},
        {png: {engine: 'webp', command: false}},
        {svg: {engine: 'svgo', command: '--multipass'}},
        {gif: {engine: 'gif2webp', command: false}},
        function() {
        }
    );
}

function process_image2(c_input_path, stats) {
    c_input_path = c_input_path.replace(/\\/g, '/'); // hack
    compress_images(
        c_input_path,
        "build/images/",
        {compress_force: false, statistic: false, autoupdate: true},
        false,
        {jpg: {engine: 'mozjpeg', command: false}},
        {png: {engine: 'optipng', command: false}},
        {svg: {engine: false, command: false}},
        {gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web', '--scale', '1.0']}},
        function() {
        }
    );
}

function process_all_images(cb) {
	process_image('./src/images/**/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}');
	process_image2('./src/images/**/*.{jpg,JPG,jpeg,JPEG,png,gif}');
	cb(); 
} 

function reload(cb) {  
	browserSync.reload();
	cb();
}

function removeBuild(cb) {
    fs.rmdirSync('./build', { recursive: true });
    cb();
}

function serve(cb) { 
	browserSync.init({
		port: 8080,
		server: {
			baseDir: "./build",
			index: "extinguishers.html",
			port: 8080
        },
        
		ui: {
			port: 8081
		},
		//open: false
	}); 

	gulp.watch("src/**/*.scss", process_sass);
	gulp.watch("src/**/*.pug", process_pug);
    gulp.watch("src/**/*.{js,es6}").on("all", process_babel);
    
	gulp.watch("src/images/**/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}").on("add", process_image);
    gulp.watch("src/images/**/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}").on("change", process_image);

	gulp.watch("src/images/**/*.{jpg,JPG,jpeg,JPEG,png,gif}").on("add", process_image2);
    gulp.watch("src/images/**/*.{jpg,JPG,jpeg,JPEG,png,gif}").on("change", process_image2);

	gulp.watch([
		"build/css/**/*.css",
		"build/**/*.html",
		"build/javascript/**/*.js",
		"build/images/**/*.{jpeg,jpg,gif,webp,png,svg}",
	], reload);

	cb(); 
} 

function process_html(cb) {
    gulp.src('./htmlPug/**/*.html')
        .pipe(html2pug({ fragment: true }))
        .pipe(gulp.dest('./htmlPug/'));
	cb();
}

exports.default = gulp.series(removeBuild, gulp.parallel(process_pug, process_sass, process_babel, process_all_images));
exports.sass = process_sass;
exports.pug = process_pug;
exports.babel = process_babel;
exports.images = process_all_images;
exports.watch = serve;
exports.html2pug = process_html;
