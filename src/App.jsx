import { useEffect, useState } from 'react';
import { TodoProvider } from './contexts';
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem';

function App() {

  const [todoS, setTodoS] = useState([])

  const addTodo = (todo) => {
    setTodoS((prev) => [{id: Date.now(), ...todo},...prev])
  }

  const updateTodo =(id, todo) => {
    setTodoS((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))

    // prev.map((eachVal) =>{
    //   if(eachVal.id === id) {
    //     todo
    //   }else{
    //     eachVal
    //   }
    // })
  }
  
  const deleteTodo = (id) => {
    setTodoS((prev) => prev.filter((todo) => todo.id !== id))
  }
  

  const toggleComplete = (id) => {
    // console.log(id)

    setTodoS((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  }
  
  useEffect(() => {
    const todoS = JSON.parse(localStorage.getItem("todoS"));

    if(todoS && todoS.length >0) {
      setTodoS(todoS)
    }
  }, [])

 useEffect(() => {
  localStorage.setItem("todoS", JSON.stringify(todoS));
 }, [todoS])

  return (
    <TodoProvider value={{todoS, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todoS.map((todo) => (
              <div key={todo.id}
              className='w-full'
              >
                <TodoItem todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App
