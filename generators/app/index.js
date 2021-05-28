//此文件作为Generator的核心入口
//需要到处一个继承自Yeoman Generator 的类型
//Yeoman Generator在工作时会自动调用我们在此类型中定义的一些生命周期方法
//我们在这些方法中可以通过调用父类提供的一些工具方法实现一些功能，例如文件写入

const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  prompting () {
    return this.prompt([
      {
        type: 'input', name: 'name', message: '', 
        default: this.appname//父类文件夹名称
      }
    ])
    .then(answers => {
      this.answers = answers
    })
  }
  writing () {
    //yeoman 工作时，生成文件阶段，自动调用此方法
    //通过fs往项目中写入文件
    //此fs比node中fs更强大，高度封装
    /* this.fs.write(//接受两个参数，写入文件的绝对路径，写入文件内容
      this.destinationPath('temp.txt'),//destinationPath 获取生成项目目录下的路径
      Math.random().toString()
    ) */

    //通过模板方式写入文件到目标目录
    //模板文件路径
    const tpl = this.templatePath('foo.txt')
    //输出目标路径
    const outPut = this.destinationPath('foo.txt')
    //模板数据上下文
    const context = {title: 'hello generator', success: false }

    this.fs.copyTpl(tpl, outPut, context)


    const tpl1 = this.templatePath('bar.html')

    const output1 = this.destinationPath('bar.html')

    const context1 = this.answers
    this.fs.copyTpl(tpl1, output1, context1)
  }
}