import { useCallback, useState } from "react";
import { Guid } from "guid-typescript";
import { Todo } from "./features/todo";
import { Button, TextField } from "@material-ui/core";
import { todoApi } from './features/store';

export const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

 const [addNewTodo, error] = todoApi.useAddNewTodoMutation();
 const addTodo = useCallback((todo:Todo) => addNewTodo({...todo }), [addNewTodo]);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setTitle("");
    setDescription("");

      addTodo({
          id: Guid.create().toString(),
          description,
          title,
          isCompleted: false
      });
   };

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <TextField error={error.isError} label="Add title:" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <TextField error={error.isError} label="Add description:" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <Button type="submit">Add Todo</Button>
        </div>
    </form>
  );
};