/**
 * 常用gulp工具和任务.
 */

//导入gulp
var gulp = require('gulp');

//导入工具包
var browserSync = require('browser-Sync'),          //browser-sync [网页自动刷新（服务器控制客户端同步刷新）]
    reload = browserSync.reload,
    config = require('./config'),                   //文件夹路径配置模块
    rename = require('gulp-rename'),                //文件重命名
    concat = require('gulp-concat'),                //文件合并
    del = require('del'),                           //文件夹删除清空
    jade = require('gulp-jade'),                    //jade模板编译
    htmlBeautify = require('gulp-html-beautify'),   //html美化
    less = require('gulp-less'),                    //less编译
    cleanCSS = require('gulp-clean-css'),           //压缩css
    babel = require('gulp-babel'),                  //es6编译
    uglify = require('gulp-uglify'),                //js压缩
    webpack = require('webpack-stream'),            //js模块打包
    imgmin = require('gulp-imagemin');              //图片压缩



/**html**/

//  编译jade
gulp.task('jade',function(){
    return gulp.src(config.html)
               .pipe(jade({pretty: true}))
               .pipe(htmlBeautify({indentSize: 1}))    //标签缩进
               .pipe(gulp.dest('./build/html'));         //输出文件夹
});

//  监听jade
gulp.task('watch-jade',['jade'],reload);



/**css**/

//  编译less
gulp.task('less', function () {
    return gulp.src(config.less.output)    //任务文件
               .pipe(less())    //编译
               .pipe(cleanCSS())    //压缩css
               .pipe(rename({suffix:'.min'}))   //重命名
               .pipe(gulp.dest('./build/css'))
               .pipe(reload({stream: true}));
});

//  监听less文件
gulp.task('watch-less',['less'],reload);



/**js**/

//  合并压缩js
gulp.task('scripts',function(){
    return gulp.src(config.scripts)
               //.pipe(babel({
               //    presets:['es2015']
               //}))
               //.pipe(concat('app.min.js'))   //合并js
               //.pipe(uglify())  //压缩js
               .pipe(gulp.dest('./build/js'))
               .pipe(reload({stream: true}));
});

//webpack打包
//gulp.task('webpack',['scripts'],function(){
//    return gulp.src('build/js/index.js')
//                .pipe(webpack({
//                    output: {
//                        filename: 'index.js',
//                    }
//                }))
//                .pipe(gulp.dest('./build/js'))
//});

//监听js文件
gulp.task('watch-js',['scripts'],reload);


/**util**/

//  清空build资源文件夹
gulp.task('clean',function(){
    return del(config.build);
});

//  将外部库文件写入build文件夹
gulp.task('libs',function(){
    return gulp.src(config.libs)
               .pipe(gulp.dest('./build/libs'));
});

//  图片压缩写入build
gulp.task('imgmin',function(){
    return gulp.src(config.img)
               //.pipe(imgmin({
               //   optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
               //   progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
               // }))
               .pipe(gulp.dest('./build/images'));
});


/**
 * 默认任务
 */
gulp.task('default', ['clean','libs','imgmin','less','scripts','jade'], function () {

    browserSync({
        server: {
            baseDir: "./"   // 设定项目根目录启动服务
        }
    });

    //  监控less文件
    gulp.watch([config.less.output,config.less.all], ['watch-less']);

    //  监控js文件
    gulp.watch(config.scripts, ['watch-js']);

    //  监控jade文件
    gulp.watch(config.html, ['watch-jade']);
});
