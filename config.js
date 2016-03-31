module.exports ={
  //  生产代码目录
  'build':'./build/**/*',
  //  需要引入的外部库文件目录
  'libs':'./libs/**/',
  //  图片文件夹
  'img':['./src/images/*','./src/images/**/*'],
  //  html模版引擎
  'html':['./src/views/**/*.jade','./src/views/*.jade','!./src/views/layout/*jade'],
  //  less文件夹
  'less':{
      'output':'src/less/*.less',
      'all':'src/less/**/*.less'
  },
  //  客户端使用的js
  'scripts':['./src/js/*.js','./src/js/**/*.js']
}
