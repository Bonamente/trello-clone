type Item = {
  id: string,
}

export const findItemIndexById = <TItem extends Item>(
  items: TItem[], id: string):
  number => (items.findIndex((item: TItem) => item.id === id));

const removeItemAtIndex = <TItem>(array: TItem[], index: number):
  TItem[] => ([...array.slice(0, index), ...array.slice(index + 1)]);

const insertItemAtIndex = <TItem>(
  array: TItem[], item: TItem, index: number):
  TItem[] => ([...array.slice(0, index), item, ...array.slice(index)]);

export const moveItem = <TItem>(
  array: TItem[], from: number, to: number): TItem[] => {
  const item = array[from];
  return insertItemAtIndex(removeItemAtIndex(array, from), item, to);
};
