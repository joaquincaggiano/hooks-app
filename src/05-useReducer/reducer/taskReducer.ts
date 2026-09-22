import * as z from "zod";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

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

const getTodosStats = (todos: Todo[]) => {
  const todosLength = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = todos.filter((todo) => !todo.completed).length;

  return {
    length: todosLength,
    completed,
    pending,
  };
};

const TodoSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
});

const TaskStateSchema = z.object({
  todos: z.array(TodoSchema),
  length: z.number(),
  completed: z.number(),
  pending: z.number(),
});

export const getTaskInitialState = (): TaskState => {
  const localStorageState = localStorage.getItem("tasks-state");

  if (!localStorageState) {
    return {
      todos: [],
      length: 0,
      completed: 0,
      pending: 0,
    };
  }

  const result = TaskStateSchema.safeParse(JSON.parse(localStorageState));

  if (result.error) {
    return {
      todos: [],
      length: 0,
      completed: 0,
      pending: 0,
    };
  }

  return result.data;
};

export const taskReducer = (
  state: TaskState,
  action: TaskAction,
): TaskState => {
  switch (action.type) {
    case "ADD_TODO": {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload.trim(),
        completed: false,
      };

      const newTodos = [...state.todos, newTodo];
      const { length, completed, pending } = getTodosStats(newTodos);

      return {
        ...state,
        todos: newTodos,
        length,
        completed,
        pending,
      };
    }
    case "TOGGLE_TODO": {
      const newTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });

      const { length, completed, pending } = getTodosStats(newTodos);

      return {
        ...state,
        todos: newTodos,
        length,
        completed,
        pending,
      };
    }
    case "DELETE_TODO": {
      const newTodos = state.todos.filter((todo) => todo.id !== action.payload);
      const { length, completed, pending } = getTodosStats(newTodos);

      return {
        ...state,
        todos: newTodos,
        length,
        completed,
        pending,
      };
    }

    default:
      return state;
  }
};
