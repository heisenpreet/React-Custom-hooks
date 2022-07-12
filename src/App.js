import React, { useCallback, useEffect, useState } from "react";
import HookBtn from "./components/button";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";
import useToggle from "./hooks/use-toggle";
import useDebounce from "./hooks/use-debounce";
import useUpdateEffect from "./hooks/use-updateEffect";
function App() {
  const [tasks, setTasks] = useState([]);
  const [color, setColor] = useState("wheat");
  const [value, toggleValue] = useToggle(true);

  const transformTasks = useCallback((data) => {
    const loadedTasks = [];

    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }

    setTasks(loadedTasks);
  }, []);
  const { isLoading, error, sendRequest: fetchTasks } = useHttp(transformTasks);

  useEffect(() => {
    fetchTasks({
      url: "https://httppractice-86b7f-default-rtdb.firebaseio.com/tasks.json",
    });
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  useDebounce(
    () => {
      if (value) {
        setColor("yellow");
        console.log("yellow");
      }
      if (!value) {
        setColor("blue");
        console.log("blue");
      }
    },
    1000,
    [value]
  );

  useUpdateEffect(() => alert("color changed"), [value]); //this useeffect hook works only when the dependency changes and not when the component mounts
  return (
    <React.Fragment>
      {/* *******************************TOGGLE BTN******************************** */}
      <p style={{ backgroundColor: `${color}` }}>{`Toggle Value : ${value}`}</p>
      <HookBtn btnFx={toggleValue} title={"Toggle"} />
      <HookBtn btnFx={() => toggleValue(false)} title={"False"} />
      <HookBtn btnFx={() => toggleValue(true)} title={"True"} />
      {/* ************************************************************** */}

      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
