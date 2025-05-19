import { useEffect } from 'react';
import './App.css';
import TodoDelete from './TodoDelete';
import TodoEdit from './TodoEdit';
import {useApp} from './app';
import TodoFilter from './todoFilter';

function App() {
  const {
    input, todos, saveInput, addTodo, delTodo, editIndex, editText, setEditIndex, setEditText, editTodo, checkItemHandler, allCheckItemHandler
    , checkTodos, selectRemoveTodo, allRemoveTodos, checkCompletedTodos, filter, setFilter
  } = useApp();

      

  return (
    <>
      <div>
        <div><TodoFilter setFilter={setFilter} /></div>
        <label>
          <input type='checkbox' onChange={allCheckItemHandler} checked={checkTodos.length === todos.length} /> 전체선택
          <button onClick={selectRemoveTodo}>선택삭제</button>
          <button onClick={allRemoveTodos}>전체삭제</button>
          <button onClick={checkCompletedTodos}>선택완료</button>
        </label>
        <h2>Todo List</h2>
        <input value={input} onChange={saveInput} onKeyDown={(e) => {if(e.keyCode === 13) addTodo()}} />
        <button onClick={addTodo}>추가</button>
      </div>
      <ul>
        {todos?.map((todo, index) => {
          console.log('filter',filter )
          if (filter === 'COMPLETED' && !todo.isCompleted) return null 
          if (filter === 'INCOMPLETED' && todo.isCompleted) return null 
          return (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input value={editText} onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {if(e.key === 'Enter') editTodo()}} />
                <TodoEdit onEditSave = {() => editTodo(index)} />
              </>
            ) : (
              <>
                <input type='checkbox' checked={checkTodos.includes(index)} 
                onChange={(e) => checkItemHandler(index, e.target.checked)}  />{todo.text}
                <button onClick={() => setEditIndex(index)}>수정</button>
                <TodoDelete onDelete={() => delTodo(index)} />
              </>
            )}
          </li>
        )
        })}
      </ul>
    </>
  )
}

export default App