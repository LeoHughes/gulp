/**
 * 常用gulp工具和任务.
 */

//导入gulp
var gulp = require('gulp');

var path = require('path');

//导入工具包
var browserSync = require('browser-sync'),          //browser-sync [网页自动刷新（服务器控制客户端同步刷新）]
    reload = browserSync.reload,
    config = require('./config'),                   //文件夹路径配置模块
    rename = require('gulp-rename'),                //文件重命名
    concat = require('gulp-concat'),                //文件合并
    del = require('del'),                           //文件夹删除清空
    pug = require('gulp-pug'),                      //pug模板编译
    htmlBeautify = require('gulp-html-beautify'),   //html美化
    less = require('gulp-less'),                    //less编译
    cleanCSS = require('gulp-clean-css'),           //压缩css
    babel = require('gulp-babel'),                  //es6编译
    uglify = require('gulp-uglify'),                //js压缩
    webpack = require('webpack-stream'),            //js模块打包
    imgmin = require('gulp-imagemin');              //图片压缩



/**html**/

//  编译pug
gulp.task('pug',function(){
    return gulp.src(config.html)
               .pipe(pug({pretty: true}))
               //标签缩进
               .pipe(htmlBeautify({indentSize: 1}))
               .pipe(gulp.dest(
                 path.join(config.dist,'html')
               ));
});

//  监听pug
gulp.task('watch-pug',['pug'],reload);



/**css**/

//  编译less
gulp.task('less', function () {
    return gulp.src(config.less.output)
               //编译less
               .pipe(less())
               //压缩css
               .pipe(cleanCSS())
               //重命名
               .pipe(rename({suffix:'.min'}))
               .pipe(gulp.dest(
                 path.join(config.dist,'css')
               ))
               .pipe(reload({stream: true}));
});

//  监听less文件
gulp.task('watch-less',['less'],reload);



/**js**/

gulp.task('scripts',function(){
    return gulp.src(config.scripts)
                //将es6转换为es5
               //.pipe(babel({
               //    presets:['es2015']
               //}))

               //合并js
               //.pipe(concat('app.min.js'))

               //压缩js
               //.pipe(uglify())

               //利用webpack对js模块进行打包
               .pipe(webpack({
                  entry:{
                    'main1':path.join(__dirname,'/src/js/main.js'),
                    'main2':path.join(__dirname,'/src/js/main2.js')
                  },
                  resolve:{
                    extensions: ['', '.js']
                  },
                  output:{
                    filename:'[name].js'
                  }
               }))
               .pipe(gulp.dest(
                 path.join(config.dist,'js')
               ))
               .pipe(reload({stream: true}));
});

//监听js文件
gulp.task('watch-js',['scripts'],reload);


/**util**/

//  清空输出文件夹
gulp.task('clean',function(){
    return del(
      path.join(config.dist,'*')
    );
});

//  将外部库文件写入输出文件夹
gulp.task('libs',function(){
    return gulp.src(config.libs)
               .pipe(gulp.dest(
                 path.join(config.dist,'libs')
               ));
});

//  图片压缩写入输出文件夹
gulp.task('imgmin',function(){
    return gulp.src(config.img)
              //  .pipe(imgmin({
              //    optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
              //    progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
              //  }))
               .pipe(gulp.dest(
                 path.join(config.dist,'images')
               ));
});


/**
 * 默认任务
 */
gulp.task('default', ['clean','libs','imgmin','less','scripts','pug'], function () {

    browserSync({
        server: {
            baseDir: path.join(__dirname,config.dist)   // 设定项目根目录启动服务
        }
    });

    //  监控less文件
    gulp.watch([config.less.output,config.less.all], ['watch-less']);

    //  监控js文件
    gulp.watch(config.scripts, ['watch-js']);

    //  监控pug文件
    gulp.watch(config.html, ['watch-pug']);
});
