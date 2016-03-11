# gulp工作流demo



#### **文件夹结构说明**

```sh
build -- 编译后生成的所有文件(html,js,img)  

libs -- 需要引入的外部库文件  

src -- 编译之前的源文件less等

views -- 页面模板文件夹，使用的是jade模板引擎

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

lessToCss 编译less为css文件

libs 将libs文件夹写入build

scripts 合并及压缩js
```

--


#### **运行**

```sh
npm install

gulp default

访问http://localhost:8000/build/html/index.html
```

--


#### **更新说明**


#### **替换**

```sh
用 gulp-clean-css 替代 gulp-minify-css
用 del模块 替代 gulp-clean 
```

#### **新增**

```sh

新增 gulp-html-beautify 输出html美化

```
