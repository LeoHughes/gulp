# gulp工作流demo



#### **文件夹结构说明**

```sh
build -- 编译后生成的所有文件(html,js,img)  

libs -- 需要引入的外部库文件  

src -- 编译之前的源文件

    views -- 页面模板文件夹，使用的是jade模板引擎
    js  -- 客户端使用的js文件
    less  -- less文件
    images  -- 图片文件夹

config.js -- 路径配置文件

gulpfile.js -- gulp配置文件

package.json -- 引入的npm工具包和项目说明文件
```

--


#### **gulp任务说明**

```sh
clean 清空build文件夹

default 执行默认任务(详细说明看gulp配置文件)

imgmin 图片压缩

jade 编译jade模板为html

less 编译less为css文件

libs 将libs文件夹写入build

scripts 合并及压缩js
```

--


#### **运行**

```sh
npm install

gulp default

访问http://localhost:8000/build/html/index.html

--说明
若重启default任务，build文件夹有部分文件未写入需要多重启几次default任务

./libs ./src 目录新增文件也需要重启default
```

--


#### **更新说明**


#### **替换**

```sh
用 gulp-clean-css 替代 gulp-minify-css
用 del模块 替代 gulp-clean
用 browsersync 替代 gulp-webserver 和 gulp-livereload
```

#### **新增**

```sh

新增 gulp-html-beautify 输出html美化

```
