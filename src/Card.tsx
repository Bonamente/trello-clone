import { FC, ReactElement } from 'react';
import { CardContainer } from './styles';

type CardProps = {
  id: string,
  text: string,
}

export const Card: FC<CardProps> = ({ id, text }): ReactElement => (
  <CardContainer id={id}>{text}</CardContainer>
);
