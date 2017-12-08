# verify-input-code

## 基于Vue2.0+的移动端验证码输入组件.

<img src="./example/code.png">

## 功能预览

+ 输入时回调
+ 结果回调
+ 自定义错误处理
+ 自定义验证码个数
+ 样式可控
+ 可以清空输入的验证码

[这里是可爱的Demo](https://quietboys.github.io/vue-input-code/)

## 支持

支持 Vue.js 2.0+.

## 安装和使用

```javascript
npm install verify-input-code --save
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
import VinputCodee from 'verify-input-code'
export default {
  components: {
    VinputCode
  }
}
```

HTML中使用:

```html
<verify-input-code span-size="20px" type="number" :number="5" height="50px" span-color="#f35252" input-color="#3498db" input-size="24px" :code="code" :getinput="getInput" :success="success"></verify-input-code>

<!-- 请在引用vue之后引用组件VueInputCode -->
<script src="/you/local/file/path/vue.min.js"></script>
<script src="/you/local/file/path/VerifyueInputCode.min.js"></script> 
```

## API

| 参数    | 类型    | 说明   |  可选值 | 默认值 |
| ------------- |-------| -----| ----| -------|
| code | 数组 | 用户输入的验证码数组 | — | — |
| type | 字符串 | 用户输入类型 | number,text,idcard | number |
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
