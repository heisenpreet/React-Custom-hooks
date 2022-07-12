import { useCallback, useState } from "react";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";
let TaskText;
const NewTask = (props) => {
  const createTask = (data) => {
    const generatedId = data.name;
    const createdTask = { id: generatedId, text: TaskText };
    props.onAddTask(createdTask);
  };
  const { isLoading, error, sendRequest } = useHttp(createTask);
  const enterTaskHandler = (taskText) => {
    TaskText = taskText;
    sendRequest({
      url: "https://httppractice-86b7f-default-rtdb.firebaseio.com/tasks.json",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { text: TaskText },
    });
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
