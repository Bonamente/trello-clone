import { DragItem } from '../DragItem';

export const isHidden = (
  draggedItem: DragItem | null,
  itemType: string,
  id: string,
): boolean => (
  Boolean(draggedItem && draggedItem.type === itemType && draggedItem.id === id)
);
