import {FC, FormEvent, useId, useState} from "react";

interface TodoFormProps {
  onAdd: (newTodo: string) => void
}

const TodoForm: FC<TodoFormProps> = ({onAdd}) => {
  const uniqueId = useId();
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (newTodo.trim()) {
      onAdd(newTodo);
      setNewTodo('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          id={`${uniqueId}-todo-input`}
          type={'text'}
          placeholder={'Add new todo'}
          name={'todo'}
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          aria-label={'Add new todo'}
          className={'mb-5 w-full'}
        />
      </div>
    </form>
  );
};

export default TodoForm;
