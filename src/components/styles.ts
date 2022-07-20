import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  width: 100%;
  height: 100%;
  padding: 20px;

  background-color: #9668ed;
`;

export const CustomDragLayerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  
  width: 100%;
  height: 100%;
  
  pointer-events: none;
`;

interface DragPreviewContainerProps {
  isHidden?: boolean,
  isPreview?: boolean,
}

export const DragPreviewContainer = styled.div<DragPreviewContainerProps>`
  transform: ${(props) => (props.isPreview ? 'rotate(5deg)' : undefined)};
  opacity: ${(props) => (props.isHidden ? 0 : 1)};
`;

type DragPreviewWrapperProps = {
  position: {
    x: number,
    y: number,
  }
}

export const DragPreviewWrapper = styled.div.attrs<DragPreviewWrapperProps>(
  ({ position: { x, y } }) => (
    { style: { transform: `translate(${x}px, ${y}px)` } }
  ),
) <DragPreviewWrapperProps>``;

export const ColumnContainer = styled(DragPreviewContainer)`
  flex-grow: 0;
  
  width: 300px;
  min-height: 40px;
  margin-right: 20px;
  padding: 8px;
  
  background-color: #ebebf0;
  border-radius: 3px;
`;

export const ColumnTitle = styled.div`
  padding: 6px 16px 12px;

  font-weight: bold;
`;

export const CardContainer = styled(DragPreviewContainer)`
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
  color: ${(props) => (props.dark ? '#000000' : '#ffffff')};
  
  background-color: #ffffff3d;
  border: 1px solid transparent; 
  border-radius: 3px;
  
  transition: 0.3s;

  cursor: pointer;

  &:hover {
    border: 1px solid #000000;
  }

  &:hover,
  &:focus {
    background-color: #ffffff69;    
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
  
  background-color: #4cbb17;
  border: none;
  border-radius: 3px;
  box-shadow: none;

  transition: 0.3s;

  cursor: pointer;

  &:hover,
  &:focus {    
    background-color: #7cfc00;
  }
`;

export const NewItemInput = styled.input`
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;

  border: none;
  border-radius: 3px;
  box-shadow: #091e4240 0px 1px 0px 0px;
`;
