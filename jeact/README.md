# jeact

* 灵感来自 `react`
* 组件嵌套
* 组件既有事件又有方法
* 支持继承

## 为什么要有方法（强耦合）

* 如果把 `input` 作为一个组件来看，他有 `val()` 方法，也有`change`事件
* 更复杂些的`uploader`组件也是既有方法，又有事件

## demos

* [todo](http://p2world.github.io/jeact/todo.html) 最佳实践
* [modal](https://github.com/p2world/p2world.github.io/blob/master/jeact/modal.js) 模板继承

## API

### 初始化步骤

* `preInit` 主要是数据初始化
* `template` 生成 `this.$el`
* `initWidgets` 初始化子组件
* `init` 真正初始化

### 属性

* `props` 传进来的数据
* `$el` 组件的jQuery对象
* `$el.data('widget')` 指向组件自己
* `refs` jQuery节点们
* `widgets` 子组件们

### 方法

* `remove`


### 事件

* `events` 是一个数组，帮忙做 `this.$el.on`
* `onRemove` 在被remove时调用
* `emit`  触发自身事件 不冒泡
* `dispatch`  触发事件 并冒泡