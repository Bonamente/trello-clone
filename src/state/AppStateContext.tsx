import {
  FC,
  createContext,
  useContext,
  useMemo,
  Dispatch,
} from 'react';

import { useImmerReducer } from 'use-immer';

import {
  appStateReducer,
  AppState,
  List,
  Task,
} from './appStateReducer';

import { DragItem } from '../DragItem';
import { Action } from './actions';

const appData: AppState = {
  draggedItem: null,
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
  draggedItem: DragItem | null,
  lists: List[],
  getTasksByListId(id: string): Task[],
  dispatch: Dispatch<Action>,
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps,
);

type AppStateProviderProps = {
  children: React.ReactNode;
}

export const AppStateProvider: FC<AppStateProviderProps> = ({ children }) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData);
  const { draggedItem, lists } = state;

  const getTasksByListId = (id: string): Task[] | [] => (
    lists.find((list) => list.id === id)?.tasks || []
  );

  const contextValue = useMemo(() => (
    {
      draggedItem,
      lists,
      getTasksByListId,
      dispatch,
    }), [draggedItem, lists]);

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = (): AppStateContextProps => (
  useContext(AppStateContext)
);
