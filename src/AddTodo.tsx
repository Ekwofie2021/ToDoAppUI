import { useCallback, useState } from "react";
import { Guid } from "guid-typescript";
import { Todo, TodoErrors } from "./features/todo";
import { Button, TextField } from "@material-ui/core";
import { todoApi } from "./features/store";

export const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todoErrors, setTodoErrors] = useState<TodoErrors | undefined>(
    undefined
  );

  const [addNewTodo, error] = todoApi.useAddNewTodoMutation();

  const addTodo = useCallback(
    (todo: Todo) => addNewTodo({ ...todo }),
    [addNewTodo]
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setTodoErrors(undefined);

    addTodo({
      id: Guid.create().toString(),
      description,
      title,
      isCompleted: false,
    })
      .unwrap()
      .then(() => {
        setDescription("");
        setTitle("");
      })
      .catch((error) => {
        setTodoErrors({
          description: error.data.errors.Description,
          title: error.data.errors.Title,
        });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          helperText={error.isError && todoErrors?.title}
          error={todoErrors?.title !== undefined && error.isError}
          label="Add title:"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <TextField
          helperText={error.isError && todoErrors?.description}
          error={todoErrors?.description !== undefined && error.isError}
          label="Add description:"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <Button type="submit">Add Todo</Button>
    </form>
  );
};
