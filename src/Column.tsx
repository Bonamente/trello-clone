import { FC, ReactElement } from 'react';
import { ColumnContainer, ColumnTitle } from './styles';
import { Card } from './Card';
import { AddNewItem } from './AddNewItem';
import { useAppState } from './state/AppStateContext';
import { addTask } from './state/actions';

type ColumnProps = {
  id: string,
  text: string,
}

export const Column: FC<ColumnProps> = ({ id, text }): ReactElement => {
  const { getTasksByListId, dispatch } = useAppState();
  const tasks = getTasksByListId(id);

  return (
    <ColumnContainer>
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
