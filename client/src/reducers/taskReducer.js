import {
  EDIT_TASK,
  ADD_TASK,
  DELETE_TASK,
  SET_SAVED_TASKS,
  CLEAR_TASKS
} from "./../context/types";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.task] };
    case EDIT_TASK:
      const editedTasks = state.tasks.map(task => {
        if (task._id === action.task._id) {
          return action.task;
        }
        return task;
      });
      return { ...state, tasks: editedTasks };
    case DELETE_TASK:
      const filteredTasks = state.tasks.filter(task => task._id !== action.id);
      return { ...state, tasks: filteredTasks };
    case SET_SAVED_TASKS:
      return { ...state, tasks: action.tasks };
    case CLEAR_TASKS:
      return { ...state, tasks: [] };

    default:
      return state;
  }
};

export default reducer;
