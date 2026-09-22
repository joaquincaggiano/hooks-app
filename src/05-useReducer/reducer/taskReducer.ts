import type { Todo } from "../TaskApp";

interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

export type TaskAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number };

export const taskReducer = (
  state: TaskState,
  action: TaskAction,
): TaskState => {
    
  return state;
};
