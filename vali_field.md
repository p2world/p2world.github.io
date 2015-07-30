`pagelet/signform/field.js`是一个表单组件库，可以很简单的获取现成组件，并支持配置

使用方法

```javascript
var email=Field.getEle('email'/*组件名*/,{
    label:'登录邮箱',
    hint:''
}/*组件配置*/);

/*
.jbox 表单组件的jquery对象
如：
	<label>登录邮箱<input type="text"></label>
（有可能是多个元素组成的jquery对象，如 <tr></tr>,<tr></tr>）
*/
$('form').append(email.jbox);
// .jvali 用于验证的jquery对象 一般是input元素
var vali=Vali(email.jvali);
```

常见的一些配置：

* `name`:最后的`params`里的`key`
* `label`:如上例里的
* `hint`:简短的提示
* `tpl`:模板function
* `func`:`vali_func`
* `require`:`vali_require`
