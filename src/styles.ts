import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  width: 100%;
  height: 100%;
  padding: 20px;

  background-color: #3179ba;
`;

export const ColumnContainer = styled.div`
  flex-grow: 0;
  
  width: 300px;
  min-height: 40px;
  margin-right: 20px;
  padding: 8px;

  background-color: #ebecf0;
  border-radius: 3px;
`;

export const ColumnTitle = styled.div`
  padding: 6px 16px 12px;

  font-weight: bold;
`;

export const CardContainer = styled.div`
  max-width: 300px;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;

  background-color: #ffffff;
  border-radius: 3px;
  box-shadow: #091e4240 0px 1px 0px 0px;
  
  cursor: pointer;
`;

type AddItemButtonProps = {
  dark?: boolean,
}

export const AddItemButton = styled.button<AddItemButtonProps>`
  width: 100%;
  max-width: 300px;
  padding: 10px 12px;
  
  text-align: left;
  color: ${(props) => (props.dark ? '#000' : '#fff')};
  
  background-color: #ffffff3d;
  border: none;
  border-radius: 3px;
  
  transition: background 85ms ease-in;
  
  cursor: pointer;

  &:hover {
    background-color: #ffffff52;
  }
`;

export const NewItemFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  width: 100%;
  max-width: 300px;
`;

export const NewItemButton = styled.button`
  padding: 6px 12px;
  
  text-align: center;
  color: #ffffff;
  
  background-color: #5aac44;
  border: none;
  border-radius: 3px;
  box-shadow: none;
`;

export const NewItemInput = styled.input`
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;

  border: none;
  border-radius: 3px;
  box-shadow: #091e4240 0px 1px 0px 0px;
`;
