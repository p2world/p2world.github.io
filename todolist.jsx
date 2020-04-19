import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react'
import ReactDOM from 'react-dom'

import TodoItem from './todoitem'
import TodoListContext, { useTodolist } from './todolist-context'

function App() {
    // State
    const todolistModal = useTodolist()
    const {todoList} = todolistModal
    const [filterName, setFilterName] = useState('')

    // Computed
    const leftCount = useMemo(() => {
        return todoList.filter(item => !item.completed).length
    }, [todoList])

    const filteredList = useMemo(() => {
        return todoList.filter(item => {
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
        todolistModal.create(text)
    }, [todoList])
    const onFilterChange = useCallback(e => {
        setFilterName(e.target.value)
    }, [])


    return (
        <div>
            <TodoListContext.Provider value={todolistModal}>
                <input type="text" onKeyDown={addItem} />
                <div>
                    {filteredList.map(item => <TodoItem key={item.id} item={item}/>)}
                </div>
                <p>{leftCount} items left</p>

                <select onChange={onFilterChange}>
                    <option value="">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>

                <button onClick={todolistModal.clearCompleted}>Clear Completed</button>
            </TodoListContext.Provider>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)