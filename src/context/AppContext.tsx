import React, { createContext } from "react";

// export interface ITodo {
//     id: number;
//     title: string;
//     description: string;
//     status: boolean;
//   }
//   export type TodoContextType = {
//     todos: ITodo[];
//     saveTodo: (todo: ITodo) => void;
//     updateTodo: (id: number) => void;
//   };

export type ThemeContextType = {
  isDarkTheme: boolean;
  setIsDarkTheme: (isDarkTheme: boolean) => void;
};
export const AppContext = createContext<ThemeContextType>({
  isDarkTheme: false,
  setIsDarkTheme: () => {},
});
