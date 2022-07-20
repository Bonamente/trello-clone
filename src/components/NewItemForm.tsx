import { ReactElement, useState } from 'react';
import { useFocus } from '../hooks/useFocus';
import {
  NewItemFormContainer,
  NewItemButton,
  NewItemInput,
} from './styles';

type NewItemFormProps = {
  onAdd(text: string): void,
}

export const NewItemForm:
  React.FC<NewItemFormProps> = ({ onAdd }): ReactElement => {
    const [text, setText] = useState('');
    const inputRef = useFocus();

    const handleAddText = (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Enter') {
        onAdd(text);
      }
    };

    return (
      <NewItemFormContainer>
        <NewItemInput
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleAddText}
        />
        <NewItemButton onClick={() => onAdd(text)}>
          Create
        </NewItemButton>
      </NewItemFormContainer>
    );
  };
