# xss

## 什么是xss

* `xss`是一种`注入`
    * 用户将自己的`html`代码注入到我们的`html`中


* 这是一种`html`的注入，所以与服务器,数据库无关

```python
value = "<script>alert(1);</script>"
```

```php
<p><%=value%></p>
```
生成的html:
```text
<p><script>alert(1);</script></p>
```

这样就被执行了




## 解决办法

* 将用户数据转义为`纯文本`
* 浏览器当做`纯文本`显示而不是`解析`它

```php
<p><%-value%></p>
```

生成的html：

```text
<p>&lt;script&gt;alert(1);&lt;/script&gt;</p>
```

在浏览器上的表现：

```text
<script>alert(1);</script>
```


### html转义

为什么要转义

* 为了能让`html解释器`可以解析出正确的页面
* 就像在字符串中不可以直接输入`"`而得输入`\"`（不然字符串就断开了）,在html中也得转义部分字符：
    * `\` `&#39;`
    * `"` `&#34;`
    * `<` `&lt;`
    * `>` `&gt;`
    * `&` `&amp;`

怎么转义

| 模板 | 转义 | 原样输出 |
| ------ | ----------- | ----------- |
| 很多老模板 | `<%-text%>` | `<%=htmlString%>` |
| react   | 默认转义 | `<div dangerouslySetInnerHTML={htmlString}>` |
| vue | 默认转义 | `<div v-html="htmlString">` |
| artTemplate | 默认转义 | `{{@htmlString}}` |
| jade pug | 默认转义 | `div!=htmlString` |

例：要输出一个`</p>`字符串到页面,那html就会是：

* `<p></p></p>`显然是不行的
* `<p>&lt;/p&gt;</p>` 这样才是正确的

### 什么应该不转义

```html
<div>
    <%=html%>
</div>
```

* 由运营同学或者用户提交的富文本 
    * `<b>xxx</b>`，`<a href="xx">xxx</a>`
    * 数据被过滤过（标签，onclick）
    * 可以相信的



### 什么应该转移（剩下的全部情况）

```html
<img src="<%-src%>">
<div>
    <%-text%>
</div>
```


### script标签内

在script标签内，都是js代码，和 `html` 完全没有关系,浏览器不会把他们当做 `html` 代码解析。所以 `script内` 不使用 `html` 转义规则。

我们一般只将`server数据` 输出到script标签内供浏览器代码使用。比如我们将server端变量 `pageData` 传递给浏览器js使用:

```jsp
<script>
var pageData = <%=json_dump(pageData)%>
</script>
```

在浏览器js中通过 window.pageDate 就可以获取到。

`json_dump` 就是 `script标签` 专用的转义方法， 它是一个 `npm` 库，其他语言可以参考源码： 

```javascript
module.exports = function(it){
    // handle with `undefined`
    if(it == null){
        return 'null';
    }
	return JSON.stringify(it).replace(/<\/(script)/ig,'<\\/$1');
};
```

错误的方法：

```html
<script>
var a="<%-a%>"; 
// 当 a 为 "h&m" 时 将会变成
var a="h&amp;m" //原来的数据是 h&m
```

错误的方法2：

```html
<script>
var a="<%=a%>"; 
// 当 a 为 'a";alert(1)"'
// 将会变成以下
var a="a";alert(1)"" //被注入
</script>
```

错误的方法3：

```html
<script>
var a="<%=a%>"; 
// 当 a 为 "</script><script>alert(1);</script>"
// 将会变成以下
var a="</script><script>alert(1);</script>" //被注入 （script标签遇到 </script> 这几个字符就会结束）
</script>
```

## js

### 写入：
只有涉及到操作`html`的时候才会有xss的问题：

* html(html)
* append(html)
* ...


这些情况需要转义或者使用`.text(text)`方法替代。

`.text('<>')`是不需要转义的，因为不是设置`html`所以不需要`html解析器`解析，修改属性（`.prop('src',src)`）也一样

### 读取：

```html
    <div id="d" data-text="&amp;">&lt;</div>
```

```javascript
$('#d').text(); // "<"
$('#d').html(); // "&lt;" 

$('#d').data('text'); // "&"

```



## Tips

### `javascript` 转义代码

```javacript
function encodeHtml(str){
    if(str==null){
        return '';
    }
    str+='';
    var nStr='';
    for (var i = 0; i < str.length; i++) {
        var c=str[i];
        switch(c){
            case '\'':nStr+='&#39;';break;
            case '"':nStr+='&#34;';break;
            case '<':nStr+='&lt;';break;
            case '>':nStr+='&gt;';break;
            case '&':nStr+='&amp;';break;
            default: nStr+=c;break;
        }
    }
    return nStr;
};
```

### 保留换行

强烈推荐使用 `css` : `white-space: pre-wrap;`

不推荐： `<%=encodeHtml(text).replace(/\n/g, '<br/>')%>`

其他方法都会有安全问题
 
 
 
 
 
 
 
