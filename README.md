# xss

##什么是xss

* `xss`是一种`注入`
    * 用户将自己的`html`代码注入到我们的`html`中


* 这是一种`html`的注入，所以与`python`,数据库无关

```python
value = "<script>alert(1);</script>"
```

```php
<p><?=value?></p>
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
<p><?-value?></p>
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


### script标签

在script标签中，都是js代码，浏览器不会把他们当做html代码解析，所以不需要`html转义`

script标签从`<script>`标签开始，一直到`</script>`标签截止，所以需要注意：


```html
<script>
···
var a='</script>'; //到`>`这里script标签就截止了！！！
···
</script>
```




```html
<script>
···
var a='<\/script>'; //这样就正确
···
</script>
```


#### 如何把数据打到script里：

```html
<script>
···
var a={{a|jsonify}};
// 将会变成以下
var a="<\/script>"; // 字符串里的 ' " / \ 字符都会被自动转义处理
var a=null;
var a={a:1};
···
</script>
```

   注：某些json库没有做`</script>`转为`<\/script>`，请自行replace或替换为其他库

jsonify规则：

* None    null
* "str"   "str"
* True    true
* 1       1
* map     JSON


错误的方法：

```html
<script>
···
var a="{{a}}";
// 将会变成以下
var a="h&amp;m" //原来的数据是 h&m


var a="{{a|safe}}";
// 将会变成以下
var a="</script>" //被截断
var a="</script><script>alert(1);</script>" //被注入
···
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




