import { createContext, useMemo } from 'react';

type Task = {
  id: string,
  text: string,
}

type List = {
  id: string,
  text: string,
  tasks: Task[],
}

export type AppState = {
  lists: List[],
}

const appData: AppState = {
  lists: [
    {
      id: '0',
      text: 'To Do',
      tasks: [{ id: 'c0', text: 'Generate app scaffold' }],
    },
    {
      id: '1',
      text: 'In Progress',
      tasks: [{ id: 'c2', text: 'Learn Typescript' }],
    },
    {
      id: '2',
      text: 'Done',
      tasks: [{ id: 'c3', text: 'Begin to use static typing' }],
    },
  ],
};

type AppStateContextProps = {
  lists: List[],
  getTasksByListId(id: string): Task[],
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps,
);

type AppStateProviderProps = {
  children: React.ReactNode;
}

export const AppStateProvider:
  React.FC<AppStateProviderProps> = ({ children }) => {
    const { lists } = appData;

    const getTasksByListId = (id: string): Task[] | [] => (
      lists.find((list) => list.id === id)?.tasks || []
    );

    const contextValue = useMemo(() => (
      { lists, getTasksByListId }), [lists]);

    return (
      <AppStateContext.Provider value={contextValue}>
        {children}
      </AppStateContext.Provider>
    );
  };
