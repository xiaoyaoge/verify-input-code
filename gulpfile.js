var gulp = require('gulp');
var path = require('path');
var webpack = require('webpack-stream');
var rename = require('gulp-rename'); //更改名字
var uglify = require('gulp-uglify'); //js代码压缩
var sass = require('gulp-sass');
var notify = require('gulp-notify'); //通知信息
var autoprefixer = require('gulp-autoprefixer');
var html2jade = require('gulp-html2jade');
var rev = require('gulp-rev');
var HtmlWebpackPlugin = require('html-webpack-plugin');

let modules = {
	loaders: [{
		//这是处理es6文件
		test: /\.js$/,
		loader: 'babel-loader',
		exclude: /node_modules/,
		query: {
			presets: ['es2015', 'stage-3'],
			plugins: ['transform-runtime', 'transform-es2015-arrow-functions']
		}
	}, {
		//这是处理scss文件
		test: /\.scss$/,
		loader: ['style-loader', 'css-loader', 'sass-loader']
	}, {
		test: /\.vue$/,
		loader: "vue-loader"
	},{
		// 这是处理css文件
		test: /\.css$/,
		loaders: ['style-loader', 'css-loader']
	}, {
		test: /\.(png|jpg|gif)$/,
		loader: 'url-loader',
		query: {
			// inline files smaller then 10kb as base64 dataURL
			limit: 10000,
			// fallback to file-loader with this naming scheme
			name: '[name].[ext]?[hash]'
		}
	}]
}

gulp.task('sass', function() {
	return gulp.src('./sass/*.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'last 3 Safari versions'],
			cascade: true,
			remove: true
		}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('sass:watch', function() {
	gulp.watch('./sass/*.scss', ['sass']);
});

gulp.task('start', ['sass'], function() {
	return gulp.src('./src/index.js')
		.pipe(webpack({
			watch: true,
			output: {
				filename: 'VerifyInputCode.js'
			},
			module: modules,
			resolve: {
				extensions: ['.js', '.jsx'],
				alias: {
					'vue$': 'vue/dist/vue.min.js'
				}
			},
		}))
		// .pipe(uglify())//生产的时候再启用压缩
		.pipe(gulp.dest('dist/'))
		.pipe(notify("<%= file.relative %> 成功生成!"));
});

gulp.task('uglify', function() {
	return gulp.src('./dist/VerifyInputCode.js')
		.pipe(webpack({
			watch: false,
			output: {
				filename: 'VerifyInputCode.min.js'
			},
			module: modules,
			resolve: {
				extensions: ['.js', '.jsx']
			},
		}))
		.pipe(uglify())//生产的时候再启用压缩
		.pipe(gulp.dest('dist/'))
		.pipe(notify("<%= file.relative %> 成功生成!"));
});

gulp.task('example', ['sass'], function() {
	return gulp.src('./example/index.js')
		.pipe(webpack({
			watch: true,
			output: {
				filename: 'VerifyInputCode.js'
			},
			module: modules,
			resolve: {
				extensions: ['.js', '.jsx'],
				alias: {
					'vue$': 'vue/dist/vue.min.js'
				}
			},
		}))
		.pipe(gulp.dest('example/'))
		.pipe(notify("<%= file.relative %> 成功生成!"));
});
