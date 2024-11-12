import {FC} from "react";
import {TodoItem} from "@/app/_components/Todo/Todo";
import TodoListItem from "@/app/_components/TodoListItem/TodoListItem";

interface TodoListProps {
  todos: TodoItem[],
  onToggle: (todo: TodoItem) => void,
  onDelete: (todo: TodoItem) => void
}

const TodoList: FC<TodoListProps> = ({todos, onToggle, onDelete}) => {
  return (
    <ul className={'flex flex-col gap-y-5'}>
      {todos.map(todo => (
        <li key={todo.id}>
          <TodoListItem todo={todo} onToggle={onToggle} onDelete={onDelete}/>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
