import ScrollView from "devextreme-react/scroll-view";
import Sortable from "devextreme-react/sortable";
import { useCallback, useState } from "react";
import { tasks as taskList, employees } from "./data.js";

function getLists(statusArray, taskArray) {
  const tasksMap = taskArray.reduce((result, task) => {
    if (result[task.Task_Status]) {
      result[task.Task_Status].push(task);
    } else {
      result[task.Task_Status] = [task];
    }
    return result;
  }, {});
  return statusArray.map((status) => tasksMap[status]);
}

const tasklar = [
  {
    id: 1,
    name: "Abdulaziz1",
  },
  {
    id: 2,
    name: "Abdulaziz1",
  },
  {
    id: 3,
    name: "Abdulaziz1",
  },
  {
    id: 4,
    name: "Abdulaziz1",
  },
  {
    id: 5,
    name: "Abdulaziz1",
  },
  {
    id: 6,
    name: "Abdulaziz1",
  },
];

const Card = ({ task }) => (
  <div className="card dx-card dx-theme-text-color dx-theme-background-color">
    <div className={`card-priority priority`}></div>
    <div className="card-subject">{task.name}</div>
  </div>
);

const List = ({ title, index, tasks, onTaskDrop }) => (
  <div className="list">
    <div className="list-title dx-theme-text-color">{title}</div>
    <ScrollView
      className="scrollable-list"
      direction="vertical"
      showScrollbar="always"
    >
      <Sortable
        className="sortable-cards"
        group="cardsGroup"
        data={index}
        onReorder={onTaskDrop}
        onAdd={onTaskDrop}
      >
        {tasks?.map((task) => (
          <Card key={task.Task_ID} task={task}></Card>
        ))}
      </Sortable>
    </ScrollView>
  </div>
);

function removeItem(array, removeIdx) {
  return array.filter((_, idx) => idx !== removeIdx);
}
function insertItem(array, item, insertIdx) {
  const newArray = [...array];
  newArray.splice(insertIdx, 0, item);
  return newArray;
}
function reorderItem(array, fromIdx, toIdx) {
  const item = array[fromIdx];
  const result = removeItem(array, fromIdx);
  return insertItem(result, item, toIdx);
}
const taskStatuses = [
  "Not Started",
  "Need Assistance",
  "In Progress",
  "Deferred",
  "Completed",
];
function Canban() {
  const [statuses, setStatuses] = useState(taskStatuses);
  const [lists, setLists] = useState(tasklar);
  const onListReorder = useCallback(({ fromIndex, toIndex }) => {
    setLists((state) => reorderItem(state, fromIndex, toIndex));
  }, []);
  const onTaskDrop = useCallback(
    ({ fromData, toData, fromIndex, toIndex }) => {
      const updatedLists = [...lists];
      const item = updatedLists[fromData][fromIndex];
      updatedLists[fromData] = removeItem(updatedLists[fromData], fromIndex);
      updatedLists[toData] = insertItem(updatedLists[toData], item, toIndex);
      setLists(updatedLists);
    },
    [lists]
  );

  return (
    <div id="kanban m-5">
      <ScrollView
        className="scrollable-board"
        direction="horizontal"
        showScrollbar="always"
      >
        <Sortable
          className="sortable-lists"
          itemOrientation="horizontal"
          handle=".list-title"
          onReorder={onListReorder}
        >
          <div className="list">
            <div className="list-title dx-theme-text-color">
              Mijozlar {"Ro'yhati"}
            </div>
            <ScrollView
              className="scrollable-list"
              direction="vertical"
              showScrollbar="always"
            >
              <Sortable
                className="sortable-cards"
                group="cardsGroup"
                data="1"
                onReorder={onTaskDrop}
                onAdd={onTaskDrop}
              >
                {tasklar?.map((task) => (
                  <Card key={task.id} task={task}></Card>
                ))}
              </Sortable>
            </ScrollView>
          </div>
          <div className="list">
            <div className="list-title dx-theme-text-color">
              Mijozlar {"Ro'yhati"}
            </div>
            <ScrollView
              className="scrollable-list"
              direction="vertical"
              showScrollbar="always"
            >
              <Sortable
                className="sortable-cards"
                group="cardsGroup"
                data="2"
                onReorder={onTaskDrop}
                onAdd={onTaskDrop}
              >
                {tasklar?.map((task) => (
                  <Card key={task.id} task={task}></Card>
                ))}
              </Sortable>
            </ScrollView>
          </div>
        </Sortable>
      </ScrollView>
    </div>
  );
}
export default Canban;
