import React, { useState, useEffect, useMemo,useCallback,useContext } from 'react';
import TodoListContext from './todolist-context'



export default React.memo(function TodoItem({item}) {
    const {update, remove} = useContext(TodoListContext)
    const {text, completed, id} = item
    // State
    // const [editingValue, setEditingValue] = useState(text)

    // Methods
    // const onInputChange = useCallback(e => {
    //     setEditingValue(e.target.value)
    // }, [])

    const onKeyDown = useCallback(e => {
        const {keyCode} = e
        if (keyCode === 27) {
            e.target.value = text
        } else if (keyCode === 13) {
            update({
                id,
                text: e.target.value.trim()
            })
        }
    }, [text])

    const onChangeComplete = useCallback(e => {
        update({
            id,
            completed: e.target.checked,
        })
    }, [])

    const doDelete = useCallback(() => {
        remove(id)
    }, [])

    return <div>
        <input type="text" defaultValue={text} onKeyDown={onKeyDown}/>
        <input type="checkbox" checked={completed} onChange={onChangeComplete}/>
        <button type="button" onClick={doDelete}>delete</button>
    </div>
})