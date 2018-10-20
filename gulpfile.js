var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var rigger = require('gulp-rigger');
var cssmin = require('gulp-minify-css');
var sass = require('gulp-sass');
var notify = require("gulp-notify");
var plumber = require('gulp-plumber');
var cheerio = require('gulp-cheerio');
var replace = require('gulp-replace');
var svgSprite = require('gulp-svg-sprite');
var svgmin = require('gulp-svgmin');
var tiny = require('gulp-tinypng-nokey2');
var browserSync = require("browser-sync");
var reload = browserSync.reload;

var path = {
	build: { //Тут мы укажем куда складывать готовые после сборки файлы
		html: 'build/',
		js: 'build/js/',
		css: 'build/css/',
		img: 'build/img/',
		svg: 'build/img/svg',
		fonts: 'build/fonts/'
	},
	src: { //Пути откуда брать исходники
		html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
		js: 'src/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
		style: 'src/style/main.scss',
		img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
		svg: 'src/img/svg/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		style: 'src/style/**/*.scss',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	clean: './build'
};


gulp.task('html', function () {
	return gulp.src(path.src.html) //Выберем файлы по нужному пути
		.pipe(rigger()) //Прогоним через rigger
		.pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
		.pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
		.pipe(reload({ stream: true })); //И перезагрузим наш сервер для обновлений
});

gulp.task('style', function () {
	return gulp.src(path.src.style)
		.pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
		.pipe(sourcemaps.init()) //То же самое что и с js
		.pipe(sass()) //Скомпилируем
		.pipe(autoprefixer()) //Добавим вендорные префиксы
		.pipe(cssmin()) //Сожмем
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.css)) //И в build
		.pipe(reload({ stream: true }));
});


gulp.task('js', function () {
	return gulp.src(path.src.js) //Найдем наш main файл
		.pipe(rigger()) //Прогоним через rigger
		.pipe(sourcemaps.init()) //Инициализируем sourcemap
		.pipe(sourcemaps.write()) //Пропишем карты
		.pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
		.pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
		.pipe(reload({ stream: true })); //И перезагрузим сервер
});

gulp.task('image', function () {
	return gulp.src(path.src.img) //Выберем наши картинки
		.pipe(tiny()) // минифицируем
		.pipe(gulp.dest(path.build.img)) //И бросим в build
		.pipe(reload({ stream: true }));
});

gulp.task('svg', function () {
	return gulp.src(path.src.svg)
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		.pipe(cheerio({
			run: function ($) {
				$('fill').removeAttr('fill');
				$('stroke').removeAttr('stroke');
				$('style').removeAttr('style');
			},
			parseOptions: { xmlMode: true }
		}))
		.pipe(replace('&gt;', '>'))
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: "sprite.svg"
				}
			}
		}))
		.pipe(gulp.dest(path.build.svg));
});


gulp.task('fonts', function () {
	return gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
});



gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: "./build/"
		}
	});
});


gulp.task('clean', function () {
	return del(['build/'])
});

gulp.task('watch', function () {
	gulp.watch('src/**/*.html', gulp.series('html'));
	gulp.watch('src/style/**/*.scss', gulp.series('style'));
	gulp.watch('src/js/**/*.js', gulp.series('js'));
	gulp.watch(path.src.img, gulp.series('image'));
	gulp.watch(path.src.svg, gulp.series('svg'));
	gulp.watch(path.src.fonts, gulp.series('fonts'));

});


gulp.task('default', gulp.series(
	gulp.parallel('html', 'style', 'js', 'image', 'svg', 'fonts'),
	gulp.parallel('watch', 'server')
));

