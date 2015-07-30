## `vali`的单元是`Html-Element`

```javascript
// 最简单的例子：
var jvali=$('#input').data({
	vali_func:function(cb){
		if(jvali.val().trim().length>8){
			cb('最长8个字符'); //回调的第一个参数是错误信息
		}else{
			cb(); //回调的第一个参数为空则表示成功
		}
	}
})
var vali=Vali(jvali);
$('#submit').click(function(){
	vali(function(err/*错误信息*/,jerr/*出错的Html-Element的jQuery对象*/){
		if(err){
			err;  // '最长8个字符'
			jerr; // jvali
		}else{
			// success
		}
	});
});
```



## 除了验证以外 还支持数据收集

```javascript

var jcity=$('[name=city]').data({
	vali_func:function(cb){
		var citys={
			'北京':1,
			'天津':2
		};
		var city=citys[jcity.val().trim()];
		if(city){
			cb(null,city);//回调的第2个参数为 值
		}else{
			cb('该城市不支持');
		}
	}
});


var vali=Vali(jcity);
$('#submit').click(function(){
	vali(function(err,jerr,params/*收集到的参数*/){
		if(err){

		}else{
			params;
			/*
			[
				{
					name:'city',
					value:1
				}
			]
			*/
		}
	});
});

```



## require : 是否必填

* `null`
	* 直接执行`vali_func`
* `true`
	* 空值
		直接返回错误 不执行`vali_func`
	* 有值
		执行`vali_func`
	* 如果不是input元素
		会检查返回的值 如果为空报错
* `false`
	* 空值
		直接返回成功 不执行`vali_func`
	* 有值
		执行`vali_func`


## jmsg : 展示单个元素err信息的元素

## effect：单个元素验证完成后的err信息的处理函数

```javascript
// 默认：
var effect=function(msg){
    if(msg){
        this.addClass('error');
        this.data('vali_jmsg').html(msg);
    }else{
        this.removeClass('error');
        this.data('vali_jmsg').html('');
    }
};
```
