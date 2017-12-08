# verify-input-code

## 基于Vue2.0+的移动端验证码输入组件.


## 功能预览

+ 输入时回调
+ 结果回调
+ 自定义错误处理
+ 自定义验证码个数
+ 样式可控
+ 可以清空输入的验证码


## 基于

基于 Vue.js 2.0+.

## 安装和使用

```javascript
npm i verify-input-code --save
```

- 作为全局组件使用

```javascript
//在项目入口文件
import Vue from 'vue';
import VerifyInputCode from 'verify-input-code';
Vue.component('verifyInputCode', verifyInputCode)
```

- 作为局部组件

```javascript
//在某个组件中
import VerifyinputCode from 'verify-input-code'
export default {
  components: {
    VerifyinputCode
  }
}
```


## API

| 参数    | 类型    | 说明   |  可选值 | 默认值 |
| ------------- |-------| -----| ----| -------|
| code | 数组 | 用户输入的验证码数组 | — | — |
|initInput | 函数 | 给父组件调用初始化输入框 | — | - |
| type | 字符串 | 用户输入类型 当type为idcard时 number值为 18 | number,text,idcard | number |
| upper-case | Boolean | 类型为text的时候可调整输入的字符串为大写 | true,false | false |
| get-input | 函数 | 用户每次输入后的回调函数,接受一个验证码字符串 | — | — |
| success | 函数 | 用户输入完成后的回调函数,接受一个验证码字符串 | — | — |
| error | 函数 | 用户输入不是预期的值的回调函数,接收一个错误的值,若返回true则不清除错误值并继续下一个输入,默认返回false | — | — |
| span-size | 字符串 | 输入后的字体显示大小 | — | 20px |
| span-color | 字符串 | 输入后的字体显示颜色 | — | #f35252 |
| input-size | 字符串 | 输入框的字体显示大小 | — | 20px |
| input-color | 字符串 | 输入框的字体显示颜色 | — | #000 |
| number | 数字 | 验证码个数 | — | 6 |
| height | 字符串 | 整个框的显示高度 | — | 60px |

