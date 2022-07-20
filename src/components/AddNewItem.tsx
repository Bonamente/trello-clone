import { ReactElement, useState } from 'react';
import { AddItemButton } from './styles';
import { NewItemForm } from './NewItemForm';

type AddNewItemProps = {
  onAdd(text: string): void,
  toggleButtonText: string,
  dark?: boolean,
}

export const AddNewItem: React.FC<AddNewItemProps> = (props): ReactElement => {
  const [showForm, setShowForm] = useState(false);
  const { onAdd, toggleButtonText, dark } = props;

  if (showForm) {
    return (
      <NewItemForm
        onAdd={(text) => {
          if (text === '') {
            setShowForm(false);
            return;
          }
          onAdd(text);
          setShowForm(false);
        }}
      />
    );
  }

  return (
    <AddItemButton dark={dark} onClick={() => setShowForm(true)}>
      {toggleButtonText}
    </AddItemButton>
  );
};
