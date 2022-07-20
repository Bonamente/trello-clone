import { FC, ReactElement } from 'react';
import { AppContainer } from './components/styles';
import { CustomDragLayer } from './components/CustomDragLayer';
import { Column } from './components/Column';
import { AddNewItem } from './components/AddNewItem';
import { useAppState } from './state/AppStateContext';
import { addList } from './state/actions';

export const App: FC = (): ReactElement => {
  const { lists, dispatch } = useAppState();

  return (
    <AppContainer>
      <CustomDragLayer />
      {lists.map((list) => (
        <Column key={list.id} id={list.id} text={list.text} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => dispatch(addList(text))}
      />
    </AppContainer>
  );
};
