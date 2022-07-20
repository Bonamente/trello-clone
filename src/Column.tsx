import { FC, ReactElement, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { throttle } from 'throttle-debounce-ts';
import { ColumnContainer, ColumnTitle } from './styles';
import { Card } from './Card';
import { AddNewItem } from './AddNewItem';
import { useAppState } from './state/AppStateContext';
import {
  addTask,
  moveList,
  moveTask,
  setDraggedItem,
} from './state/actions';

import { useItemDrag } from './hooks/useItemDrag';
import { isHidden } from './utils/isHidden';

type ColumnProps = {
  id: string,
  text: string,
  isPreview?: boolean,
}

export const Column: FC<ColumnProps> = (
  { id, text, isPreview },
): ReactElement => {
  const { draggedItem, getTasksByListId, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const tasks = getTasksByListId(id);

  const [, drop] = useDrop({
    accept: ['COLUMN', 'CARD'],
    hover: throttle(200, () => {
      if (!draggedItem) return;
      if (draggedItem.type === 'COLUMN') {
        if (draggedItem.id === id) return;

        dispatch(moveList(draggedItem.id, id));
      } else {
        if (draggedItem.columnId === id) return;
        if (tasks.length) return;

        dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id));
        dispatch(setDraggedItem({ ...draggedItem, columnId: id }));
      }
    }),
  });

  const { drag } = useItemDrag({ type: 'COLUMN', id, text });
  drag(drop(ref));

  return (
    <ColumnContainer
      tabIndex={0}
      ref={ref}
      isPreview={isPreview}
      isHidden={isHidden(draggedItem, 'COLUMN', id, isPreview)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card
          key={task.id}
          id={task.id}
          text={task.text}
          columnId={id}
        />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another card"
        onAdd={(typedText) => dispatch(addTask(typedText, id))}
        dark
      />
    </ColumnContainer>
  );
};
