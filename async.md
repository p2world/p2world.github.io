# js异步编程

[ppt](http://deckdown.org/deck?src=https%3A%2F%2Fraw.githubusercontent.com%2Fp2world%2Fp2world.github.io%2Fmaster%2Fasync.md)

## 有哪些异步编程


```javascript
require('http').createServer(function (req, res) => {
    ajax('/xxx', function (err, resp) {
        res.end(reps);
    })
}).listen(80)
```


## 异步编程教派

* error-first
* await async Promise
* 其他

## error-first

```javascript
ajax('/url', {id:1}, function (err, res) {
    // 当 err 不为 null 时， 表示执行失败
    if (err) {
        // 做错误处理
        return
    }
    console.log(res)
}
```

也就是说 这个 `function` 在被调用时：

```javascript
// 成功
callback(null, res)
// 失败
callback(err)
```


## ajaxP 封装

```javascript
function aAjax(url, data)  {
    return new Promise(function (resolve, reject) {
        ajax(url, data, function (err, res) {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
```

```javascript
try {
    const res = await aAjax('/url', {})
} catch (err) {
    // 做错误处理
}
```

## 场景

* 并行
* 串行


## 并行实例

比如我们要同时3个视频信息


## 原始并行

```javascript
var photo1
var photo2
var photo3
function next (err) {
    if (err) {
        alert('网络错误，请刷新重试')
        return
    }
    if (photo1 && photo2 && photo3) {
        // to next
    }
}

ajax('/photo', {id: 1}, function (err, photo) {
    photo1 = photo
    next(err)
})

ajax('/photo', {id: 2}, function (err, photo) {
    photo2 = photo
    next(err)
})

ajax('/photo', {id: 3}, function (err, photo) {
    photo3 = photo
    next(err)
})
```

## async.js 并行

```javascript
async.each([1, 2, 3], function(id, callback) {
    ajax('/photo', {id: id}, callback)
}, function(err, arr) {
    // 时间上第一个出问题的err
    if (err) {
        alert('网络错误，请刷新重试')
        return
    }
    const [photo1, photo2, photo3] = arr
})
```

## await async promise 串行

```javascript
try {
    const [photo1, photo2, photo3] = await Promise.all(
        aAjax('/photo', {id: 1}),
        aAjax('/photo', {id: 2}),
        aAjax('/photo', {id: 3}),
    )
} catch (err) {
    alert('网络错误，请刷新重试')
}
```


## 串行实例



比如我们要获取 `登录用户` 的 `最新视频` 的 `视频地址`

***

但我们只有 `3` 个很傻的接口：

| url | 描述 | 返回值 |
| ------ | ----------- | ---- |
| /loginUser | 获取当前登录用户信息 | {id:1, name: miaowei } |
| /userPhotos | 获取某用户的所有视频Id | [1241231241, 1323452352, 1241235123, 12351234] |
| /photo | 获取视频详细信息 |  |


## 原始串行

```javascript
ajax('/loginUser', function (err, loginUser) {
    if (err) {
        alert('网络错误，请刷新重试')
        return
    }
    ajax('/userPhotos', {id: loginUser.id}, function (err, userPhotos) {
        if (err) {
            alert('网络错误，请刷新重试')
            return
        }
        ajax('/photo', {id: userPhotos[0]}, function (err, photo0) {
            if (err) {
                alert('网络错误，请刷新重试')
                return
            }
            console.log(photo0.src)
        })
    })
})
```

## async.js 串行


```javascript
async.waterfall([
    function(callback) {
        ajax('/loginUser', {}, callback)
    },
    function(loginUser, callback) {
        ajax('/userPhotos', {id: loginUser.id}, callback)
    },
    function(arg1, callback) {
        ajax('/userPhotos', {id: userPhotos[0]}, callback)
    }
], function (err, photo0) {
    // 任意一个报错后 都不会执行后边的步骤
    if (err) {
        alert('网络错误，请刷新重试')
        return
    }
    console.log(photo0.src)
});
```



## await async promise 串行


```javascript
try {
    var loginUser  = await aAjax('/loginUser', {})
    var userPhotos = await aAjax('/userPhotos', {id: loginUser.id})
    var photo0     = await aAjax('/photo', {id: userPhotos[0]})
} catch (err) {
    alert('网络错误，请刷新重试')
}
```

## 参考资料

* https://caolan.github.io/async/docs.html
* 《nodejs深入浅出》


