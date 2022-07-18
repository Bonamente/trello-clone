import { FC, ReactElement, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { throttle } from 'throttle-debounce-ts';
import { ColumnContainer, ColumnTitle } from './styles';
import { Card } from './Card';
import { AddNewItem } from './AddNewItem';
import { useAppState } from './state/AppStateContext';
import { addTask, moveList } from './state/actions';

import { useItemDrag } from './hooks/useItemDrag';
import { isHidden } from './utils/isHidden';

type ColumnProps = {
  id: string,
  text: string,
}

export const Column: FC<ColumnProps> = ({ id, text }): ReactElement => {
  const { draggedItem, getTasksByListId, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const tasks = getTasksByListId(id);

  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover: throttle(200, () => {
      if (!draggedItem) return;

      if (draggedItem.type === 'COLUMN') {
        if (draggedItem.id === id) return;

        dispatch(moveList(draggedItem.id, id));
      }
    }),
  });

  const { drag } = useItemDrag({ type: 'COLUMN', id, text });
  drag(drop(ref));

  return (
    <ColumnContainer ref={ref} isHidden={isHidden(draggedItem, 'COLUMN', id)}>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card key={task.id} id={task.id} text={task.text} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another card"
        onAdd={(typedText) => dispatch(addTask(typedText, id))}
        dark
      />
    </ColumnContainer>
  );
};
