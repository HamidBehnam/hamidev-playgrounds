import {FC, useId} from "react";
import {TodoItem} from "@/app/_components/Todo/Todo";

interface TodoListItemProps {
  todo: TodoItem
  onToggle: (todo: TodoItem) => void
  onDelete: (todo: TodoItem) => void
}

const TodoListItem: FC<TodoListItemProps> = ({todo, onToggle, onDelete}) => {
  const uniqueId = useId();

  return (
    <div className={'flex justify-between items-center'}>
      <div className={'flex gap-x-3'}>
        <input
          id={`${todo.id}`}
          name={`${uniqueId}-${todo.id}`}
          type={'checkbox'}
          value={todo.title}
          checked={todo.completed}
          onChange={() => onToggle(todo)}
        />
        <label htmlFor={`${todo.id}`}>{todo.title}</label>
      </div>
      <button
        type={'button'}
        aria-label={'Delete todo item'}
        onClick={() => onDelete(todo)}
        className={'focus:ring-4'}
      >
        X
      </button>
    </div>
  );
};

export default TodoListItem;
