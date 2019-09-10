import { RootAction, RootState } from "../store";
import { Reducer } from "redux";
import { ADD_TASK, REMOVE_TASK, TASK_DONE } from "../actions/task";
import { Task } from "../dto/task";

export interface TaskState {
  tasks: Task[];
}

const INITIAL_STATE: TaskState = {
  tasks: []
};

const task: Reducer<TaskState, RootAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case ADD_TASK:
      const newTask: Task = {
        id: action.newId,
        date: action.newDate,
        description: action.newDescription
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask]
      };

    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.id)
      };

    case TASK_DONE:
      const task = state.tasks.find(task => task.id === action.id);

      if (!task) {
        return state;
      }

      const updatedTask: Task = {
        ...task,

        date: new Date().toISOString()
      };

      return {
        ...state,
        tasks: [
          ...state.tasks.filter(task => task.id !== action.id),
          updatedTask
        ]
      };

    default:
      return state;
  }
};

export default task;

export function sortedTasksSelector(state: RootState): Task[] {
  if (!state.task) {
    return [];
  }
  const taskState: TaskState = state.task;

  return taskState.tasks.sort((a, b) => {
    if (!a.date) {
      return -1;
    }

    if (!b.date) {
      return 1;
    }

    return -a.date.localeCompare(b.date);
  });
}
