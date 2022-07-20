import {
  createContext,
  useContext,
  useMemo,
  useEffect,
  Dispatch,
} from 'react';

import { useImmerReducer } from 'use-immer';

import {
  appStateReducer,
  AppState,
  List,
  Task,
} from './appStateReducer';

import { DragItem } from '../components/DragItem';
import { Action } from './actions';
import { save } from '../api/api';

import { withInitialState } from '../hoc/withInitialState';

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
  children: React.ReactNode,
  initialState: AppState,
}

export const AppStateProvider = withInitialState<AppStateProviderProps>(
  ({ children, initialState }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, initialState);
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

    useEffect(() => {
      save(state);
    }, [state]);

    return (
      <AppStateContext.Provider value={contextValue}>
        {children}
      </AppStateContext.Provider>
    );
  },
);

export const useAppState = (): AppStateContextProps => (
  useContext(AppStateContext)
);
