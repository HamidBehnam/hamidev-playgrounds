"use client";

import {useState} from "react";
import TodoForm from "@/app/_components/TodoForm/TodoForm";
import TodoList from "@/app/_components/TodoList/TodoList";

export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const toggleTodo = (todo: TodoItem) => {
    setTodos(todos.map(item => item.id === todo.id ? {...item, completed: !todo.completed} : item));
  };

  const deleteTodo = (todo: TodoItem) => {
    setTodos(todos.filter(item => item.id !== todo.id));
  };

  const addTodo = (newTodo: string) => {
    const newTodoItem: TodoItem = {
      id: Date.now(),
      title: newTodo,
      completed: false
    };

    setTodos([...todos, newTodoItem]);
  };

  return (
    <div className={'max-w-lg mx-auto mt-14 p-5 bg-white rounded-lg shadow-lg'}>
      <h1 className={'text-2xl font-bold mb-4'}>Todo List App</h1>
      <TodoForm onAdd={addTodo}/>
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo}/>
    </div>
  );
};

export default Todo;
