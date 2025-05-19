import { useCallback, useEffect, useState } from "react"; 

export function useApp() {

  function storeTodos() {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
  }

     const [input, setInput] = useState('');
      const [todos, setTodos] = useState(storeTodos);

      const [editIndex, setEditIndex] = useState(null);
      const [editText, setEditText] = useState('');

      const [checkTodos, setCheckTodos] = useState([]);

      const [filter, setFilter] = useState('all');
      // const [todoList, setTodoList] = useState([]);

      //로컬스토리지 추가
      useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos]);

      //       useEffect(() => {
      //        const newFilterTodos = todos.filter((todo) => {
      //   if (filter === 'COMPLETED') return todo.isCompleted === true;
      //   if (filter === 'INCOMPLETED') return todo.isCompleted === false;
      //   return true;
      // });
      // console.log('3333', newFilterTodos)
      // setTodoList(newFilterTodos);
      // }, [filter, todos])
    
      const saveInput = (e) => {
        setInput(e.target.value);
      };
    
      const addTodo = () => {
        if(!input) return;
        setTodos([...todos, { text: input, isCompleted: false }]);
        setInput('');
      };
    
      const delTodo = (index) => {
        const filterTodos = todos.filter((_, i) => i !== index);
        setTodos(filterTodos);
      };

      //수정
      const editTodo = () => {
        const save = todos.map((todo, i) => i === editIndex ? editText : todo);
        console.log(save);
        setTodos(save);
        setEditIndex(null);
        setEditText('');
      };

      const checkItemHandler = (index, isChecked) => {
        if(isChecked) {
          setCheckTodos((prev) => [...prev, index])
        } else {
          setCheckTodos((prev) => prev.filter((item) => item !== index));
        }
      };

      const allCheckItemHandler = (e) => {
        if(e.target.checked) {
          setCheckTodos(todos.map((_, index) => index));
        } else {
          setCheckTodos([]);
        }
      };

      //선택 삭제
      const selectRemoveTodo = useCallback(() => {
        setTodos((prevTodos) =>
          prevTodos.filter((_, index) => !checkTodos.includes(index))
        );
        setCheckTodos([]);
      }, [checkTodos, setTodos]);

      //전체 삭제
      const allRemoveTodos = useCallback(() => {
        setTodos([]);
        setCheckTodos([]);
      });

      //전체, 완료, 미완료 나누기
      const toggleComplete = (index) => {
        const updateTodos = todos.map((todo, i) => i === index ? {...todo, isCompleted: !todo.isCompleted} : todo );
        setTodos(updateTodos);
      };

 

      //선택 완료
      const checkCompletedTodos = useCallback(() => {
        const updated = todos.map((todo, index) => checkTodos.includes(index) ? {...todo, isCompleted: true} : todo);
        setTodos(updated);
        setCheckTodos([]); //선택 초기화?
      }, [todos, checkTodos]);




      return {
        input, todos, saveInput, addTodo, delTodo, editIndex, editText, setEditIndex, setEditText, editTodo, checkItemHandler, allCheckItemHandler
        , checkTodos, setCheckTodos, selectRemoveTodo, allRemoveTodos, filter, setFilter, toggleComplete, setFilter, checkCompletedTodos
      }
}