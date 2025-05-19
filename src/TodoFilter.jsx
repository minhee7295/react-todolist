function TodoFilter({setFilter}) {


    return (
        <div>
        <button onClick={() => setFilter('ALL')}>전체</button>
        <button onClick={() => setFilter('COMPLETED')}>완료</button>
        <button onClick={() => setFilter('INCOMPLETED')}>미완료</button>
      </div>
      
    )
}

export default TodoFilter