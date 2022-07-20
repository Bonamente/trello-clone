import { FC, ReactElement, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { throttle } from 'throttle-debounce-ts';
import { CardContainer } from './styles';
import { useItemDrag } from './hooks/useItemDrag';
import { useAppState } from './state/AppStateContext';
import { isHidden } from './utils/isHidden';
import { moveTask, setDraggedItem } from './state/actions';

type CardProps = {
  id: string,
  text: string,
  columnId: string,
  isPreview?: boolean,
}

export const Card: FC<CardProps> = (
  {
    id,
    text,
    columnId,
    isPreview,
  },
): ReactElement => {
  const { draggedItem, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);

  const { drag } = useItemDrag({
    type: 'CARD',
    id,
    text,
    columnId,
  });

  const [, drop] = useDrop({
    accept: 'CARD',
    hover: throttle(200, () => {
      if (!draggedItem) return;
      if (draggedItem.type !== 'CARD') return;
      if (draggedItem.id === id) return;

      dispatch(moveTask(draggedItem.id, id, draggedItem.columnId, columnId));
      dispatch(setDraggedItem({ ...draggedItem, columnId }));
    }),
  });

  drag(drop(ref));

  return (
    <CardContainer
      tabIndex={0}
      ref={ref}
      isPreview={isPreview}
      isHidden={isHidden(draggedItem, 'CARD', id, isPreview)}
    >
      {text}
    </CardContainer>
  );
};
