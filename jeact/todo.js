var Input = Jeact.extend({
    template: '<input>',
    events: [
        ['keydown', 'keydown']
    ],
    preInit: function() {
        this.onNew = this.props.onNew || $.noop;
    },
    keydown: function(e) {
        if (e.which === 13) {
            var value = $.trim(this.$el.val());
            if (value) {
                this.onNew(value);
                this.$el.val('');
            }
        }
    }
});


var Todo = Jeact.extend({
    template: function() {
        return '<div class="todo">' +
            '<div ref="text" class="todo_text">' + this.data.text + '</div>' +
            '<div ref="btndone" class="todo_btndone">done</div>' +
            '</div>';
    },
    events: [
        ['click', '[ref=btndone]', 'onDone']
    ],
    hasDone: false,
    val: function() {
        return {
            text: this.props.text,
            hasDone: this.hasDone
        };
    },
    done: function() {
        this.hasDone = true;
        this.$el.addClass('_done');
    },
    onDone: function() {
        this.done();
        this.dispatch('_todo_done');
    }
});




var DeleteTodo = Todo.extend({
    template: function() {
        return '<div class="todo">' +
            '<div ref="text" class="todo_text">' + this.props.text + '</div>' +
            '<div ref="btndone" class="todo_btndone">done</div>' +
            '<div ref="btndel" class="todo_btndel">del</div>' +
            '</div>';
    },
    // 这样来继承父类事件
    events: [
        ['click', '[ref=btndel]', 'onDel']
    ],
    onDel: function(e) {
        this.dispatch('_todo_del', {
            text: this.props.text
        });
    }
});

var App = Jeact.extend({
    template: '<div class="app">' +
        '<div widget="input"></div>' +
        '<div ref="btndone" class="app_btndone">allDone</div>' +
        '<div ref="todos"></div>' +
        '</div>',
    events: [
        ['click', '[ref=btndone]', 'allDone'],
        ['_todo_del', 'onDel']
    ],
    initWidgets: function() {
        return {
            input: new Input({
                onNew: $.proxy(this, 'onNew')
            })
        };
    },
    allDone: function() {
        $.each(this.refs.todos.children(), function(i, ele) {
            $(ele).data('widget').done();
        });
    },
    val: function() {
        return $.map(this.refs.todos.children(), function(ele) {
            return $(ele).data('widget').val();
        });
    },
    // 新增一个todo
    onNew: function(text) {
        var todo = new DeleteTodo({
            text: text
        });
        this.refs.todos.append(todo.$el);
    },
    onDel: function(e, data) {
        $(e.target).remove();
        alert('Del! ' + data.text);
    }
});

var BetterApp = App.extend({
    template: '<div class="app">' +
        '<div widget="title"></div>' +
        '<div widget="input"></div>' +
        '<div ref="btndone" class="app_btndone">allDone</div>' +
        '<div ref="todos"></div>' +
        '</div>',
    initWidgets: function() {
        // 重写方法时记得要调用父类的同名方法
        var sWidgets=this.superProto_.initWidgets.call(this);
        return $.extend(sWidgets, {
            title: new Title()
        });
    },
    onDel:function(e,data){
        this.superProto_.onDel.apply(this,arguments);
        this.widgets.title.val(data.text);
    }
});

var Title = Jeact.extend({
    template: function() {
        return '<div>' +
                '最近删除：' +
                '<span ref="title">' +
                '</span>' +
            '</div>';
    },
    val:function(value){
        if(arguments.length){
            this.value=value;
            this.refs.title.text(value);
        }else{
            return this.value;
        }
    }
});

$('#todo').replaceWith((new BetterApp()).$el);