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
