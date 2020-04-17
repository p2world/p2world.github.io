import React, { useState, useEffect, useMemo,useCallback,useContext } from 'react';




export default React.memo(function TodoItem({item, onUpdate, onDelete}) {
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
            onUpdate({
                id,
                text: e.target.value.trim()
            })
        }
    }, [text, onUpdate])

    const onChangeComplete = useCallback(e => {
        onUpdate({
            id,
            completed: e.target.checked,
        })
    }, [onUpdate])

    const doDelete = useCallback(() => {
        onDelete(id)
    }, [onDelete])

    return <div>
        <input type="text" defaultValue={text} onKeyDown={onKeyDown}/>
        <input type="checkbox" checked={completed} onChange={onChangeComplete}/>
        <button type="button" onClick={doDelete}>delete</button>
    </div>
})