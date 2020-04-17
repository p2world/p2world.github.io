import React, { useState, useEffect, useMemo,useCallback,useContext } from 'react'
import ReactDOM from 'react-dom'
import {debounce} from 'lodash-es'

import TodoItem from './todoitem'

let id = 1




function App() {
  // State
  const [todoList, setTodoList] = useState(() => {
    let initList = []
    try{
      const listStr = localStorage.todoList
      if (listStr) {
        initList = JSON.parse(listStr)
      }
    } catch(e) {
      // do nothing
    }
    return initList
  });
  const [filterName, setFilterName] = useState();

  // Computed
  const leftCount = useMemo(()=> {
    return todoList.filter(item=>!item.completed).length
  }, [todoList])

  const filteredList = useMemo(()=> {
    return todoList.filter(item=> {
      let res
      if (!filterName) {
        res = true
      } else if (filterName === 'completed') {
        res = item.completed
      } else {
        res = !item.completed
      }
      return res
    })
  }, [filterName, todoList])

  // Watch
  // 根本原因是想持久化 function，但还想获取到最新的state，所以有2种办法实现，
  // 1：建立Callback, 将最新的state传递进去
  // 1: 建立Memo, 使用闭包保存状态
  // debounce 实现
  const doDump = useMemo(() => {
    let todoList
    const debounceDump = debounce(() => {
      localStorage.todoList = JSON.stringify(todoList)
      console.log('dumped');
    }, 1000, { 'maxWait': 10000 })
    return _todoList => {
      todoList = _todoList
      debounceDump();
    }
  }, [])
  // const doDump = useCallback(debounce(todoList => {
  //     localStorage.todoList = JSON.stringify(todoList)
  //     console.log('dumped');
  // }, 1000, {maxWait: 10000}), [])
  useEffect(() => {
    doDump(todoList)
  }, [todoList])

  // Methods
  const addItem = useCallback(e => {
    if (e.keyCode !== 13) {
      return
    }
    const text = e.target.value.trim()
    if (!text) {
      return
    }
    e.target.value = ''
    setTodoList([
      {
        text,
        id: id++,
        completed: false,
      },
      ...todoList
    ])
  }, [todoList])
  const onFilterChange = useCallback(e => {
    setFilterName(e.target.value)
  }, [])
  const clearCompleted = useCallback(() => {
    const newList = todoList.filter(item => !item.completed)
    setTodoList(newList)
  }, [todoList])

  const onUpdate = useCallback(obj => {
    setTodoList(todoList.map(item => {
      let res
      if (item.id === obj.id) {
        res = {
          ...item,
          ...obj,
        }
      } else {
        res = item
      }
      return res
    }))
  }, [todoList])
  const onDelete = useCallback(id => {
    setTodoList(todoList.filter(item => {
      return item.id !== id
    }))
  }, [todoList])

  return (
    <div>
      <input type="text" onKeyDown={addItem}/>
      <div>
        {filteredList.map(item => <TodoItem key={item.id} item={item} onUpdate={onUpdate} onDelete={onDelete}/>)}
      </div>
      <p>{leftCount} items left</p>

      <select onChange={onFilterChange}>
        <option value="">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </select>

      <button onClick={clearCompleted}>Clear Completed</button>
    </div>
  );
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);