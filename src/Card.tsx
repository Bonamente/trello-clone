import { ReactElement } from 'react';
import { CardContainer } from './styles';

type CardProps = {
  text: string,
}

export const Card: React.FC<CardProps> = ({ text }): ReactElement => (
  <CardContainer>{text}</CardContainer>
);
