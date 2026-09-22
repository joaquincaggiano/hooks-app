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

export const getTaskInitialState = (): TaskState => {
  return {
    todos: [],
    length: 0,
    completed: 0,
    pending: 0,
  };
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
