import { ReactElement } from 'react';
import { ColumnContainer, ColumnTitle } from './styles';
import { Card } from './Card';
import { AddNewItem } from './AddNewItem';

type ColumnProps = {
  text: string
}

export const Column: React.FC<ColumnProps> = ({ text }): ReactElement => (
  <ColumnContainer>
    <ColumnTitle>{text}</ColumnTitle>
    <Card text="Ready" />
    <Card text="Set" />
    <Card text="Go" />
    <AddNewItem
      onAdd={console.log}
      toggleButtonText="+ Add another card"
      dark
    />
  </ColumnContainer>
);
