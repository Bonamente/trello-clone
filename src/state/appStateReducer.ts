import { nanoid } from 'nanoid';
import { Action } from './actions';
import { findItemIndexById, moveItem } from '../utils/arrayUtils';

export type Task = {
  id: string,
  text: string,
}

export type List = {
  id: string,
  text: string,
  tasks: Task[],
}

export type AppState = {
  lists: List[],
}

export const appStateReducer = (draft: AppState, action: Action):
  AppState | void => {
  switch (action.type) {
    case 'ADD_LIST': {
      draft.lists.push({
        id: nanoid(),
        text: action.payload,
        tasks: [],
      });
      break;
    }
    case 'ADD_TASK': {
      const { text, listId } = action.payload;
      const targetListIndex = findItemIndexById(draft.lists, listId);

      draft.lists[targetListIndex].tasks.push({ id: nanoid(), text });
      break;
    }
    case 'MOVE_LIST': {
      const { draggedId, hoverId } = action.payload;
      const dragIndex = findItemIndexById(draft.lists, draggedId);
      const hoverIndex = findItemIndexById(draft.lists, hoverId);
      // eslint-disable-next-line no-param-reassign
      draft.lists = moveItem(draft.lists, dragIndex, hoverIndex);
      break;
    }
    default: {
      break;
    }
  }
};
