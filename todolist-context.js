import { createContext,useCallback, useMemo, useState, useEffect, useDebugValue, useRef } from 'react';
import { debounce } from 'lodash-es'

let id = Number(localStorage.todoListId) || 1

export default createContext();

export function useTodolist() {
    // ugliy
    const isFirstRun = useRef(true)
    const [todoList, setTodoList] = useState(() => {
        let initList = []
        try {
            const listStr = localStorage.todoList
            if (listStr) {
                initList = JSON.parse(listStr)
            }
        } catch (e) {
            // do nothing
        }
        return initList;
    });


    const create = useCallback(text => {
        setTodoList(todoList => [
            {
                text,
                id: id++,
                completed: false,
            },
            ...todoList
        ])
    }, [])
    const clearCompleted = useCallback(() => {
        setTodoList(todoList =>  todoList.filter(item => !item.completed))
    }, [])

    const update = useCallback(obj => {
        setTodoList(todoList => todoList.map(item => {
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
    }, [])
    const remove = useCallback(id => {
        setTodoList(todoList => todoList.filter(item => {
            return item.id !== id
        }))
    }, [])

    // Watch
    // 根本原因是想持久化 function，但还想获取到最新的state，所以有2种办法实现，
    // 1：建立Callback, 将最新的state传递进去
    // 1: 建立Memo, 使用闭包保存状态
    // debounce 实现
    // const doDump = useMemo(() => {
    //     let todoList
    //     const debounceDump = debounce(() => {
    //         localStorage.todoList = JSON.stringify(todoList)
    //         localStorage.todoListId = id
    //         console.log('dumped')
    //     }, 1000, { 'maxWait': 10000 })
    //     return _todoList => {
    //         todoList = _todoList
    //         debounceDump()
    //     }
    // }, [])
    const doDump = useCallback(debounce(todoList => {
        localStorage.todoListId = id
        localStorage.todoList = JSON.stringify(todoList)
        console.log('dumped')
    }, 1000, {maxWait: 10000}), [])
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false
        } else {
            console.log('useEffect')
            doDump(todoList)
        }
    }, [todoList])
    return {
        todoList,
        clearCompleted,
        create,
        update,
        remove,
    }
}


