import { ConnectDragSource, useDrag } from 'react-dnd';
import { useAppState } from '../state/AppStateContext';
import { DragItem } from '../DragItem';
import { setDraggedItem } from '../state/actions';

export const useItemDrag = (item: DragItem): { drag: ConnectDragSource } => {
  const { dispatch } = useAppState();
  const [, drag] = useDrag({
    type: item.type,
    item: () => {
      dispatch(setDraggedItem(item));
      return item;
    },
    end: () => dispatch(setDraggedItem(null)),
  });

  return { drag };
};
