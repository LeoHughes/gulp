/**
 * 常用gulp工具和任务.
 */

//导入gulp
var gulp = require('gulp');

//导入工具包
var webserver = require('gulp-webserver'),          //本地webserver服务器
    livereload = require('gulp-livereload'),        //网页自动刷新（服务器控制客户端同步刷新）
    rename = require('gulp-rename'),                //文件重命名
    concat = require('gulp-concat'),                //文件合并
    clean = require('gulp-clean'),                  //文件夹清空
    jade = require('gulp-jade'),                    //jade模板编译
    htmlBeautify = require('gulp-html-beautify'),   //html美化
    less = require('gulp-less'),                    //less编译
    cleanCSS = require('gulp-clean-css'),           //压缩css
    uglify = require('gulp-uglify'),                //js压缩
    webpack = require('webpack-stream'),            //js模块打包
    imgmin = require('gulp-imagemin');              //图片压缩



/**html**/
//编译jade
gulp.task('jade',function(){
    gulp.src(['views/**/*.jade','views/*.jade','!views/layout/*jade'])
        .pipe(jade({pretty: true}))
        .pipe(htmlBeautify({indentSize: 1}))    //标签缩进
        .pipe(gulp.dest('build/html'));
})

//监听jade
gulp.task('watch-jade',function(){
    gulp.watch(['views/**/*.jade','views/*.jade'],['jade']);
});

/**css**/

//编译less
gulp.task('lessToCss', function () {
    gulp.src('src/less/*.less') //任务文件
        .pipe(less()) //编译
        .pipe(cleanCSS()) //压缩css
        .pipe(rename({suffix:'.min'}))  //重命名
        .pipe(gulp.dest('build/css')); //输出文件夹
});

//监听less文件
gulp.task('watch-less',function() {
    gulp.watch('src/less/**/*.less', ['lessToCss']);    //设定监听文件和执行任务
});


/**js**/

//合并压缩js
gulp.task('scripts',function(){
    gulp.src(['src/js/*.js','src/js/**/*.js'])
        //.pipe(concat('app.min.js'))   //合并js文件
        .pipe(uglify())
        .pipe(gulp.dest('build/js/'));
});

//监听js文件
gulp.task('watch-js',function(){
   gulp.watch(['src/js/*.js','src/js/**/*.js'],['scripts']);
});


/**util**/
//清空build资源文件夹
gulp.task('clean',function(){
   gulp.src(['build/css','build/js','build/html','build/libs','build/images'],{read:false})
       .pipe(clean())
});

//将外部库文件写入build文件夹
gulp.task('libs',function(){
    gulp.src('libs/**/')
        .pipe(gulp.dest('build/libs'));
});

//图片压缩写入build
gulp.task('imgmin',function(){
    gulp.src(['src/images/*','src/images/**/*'])
        .pipe(imgmin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        }))
        .pipe(gulp.dest('build/images'));
})


/**server**/

//本地服务器
gulp.task('webserver',['clean','libs','imgmin','lessToCss','scripts','jade'],function(){   //启动服务器先执行编译less、压缩js和编译jade
    gulp.src('./')   // 服务器目录（./代表根目录）
        .pipe(webserver({   // 运行gulp-webserver
            livereload:true,    // 启用LiveReload
            open:false   // 服务器启动时自动打开网页
        }));
});


/****默认任务****/
gulp.task('default',['webserver','watch-less','watch-js','watch-jade']);

