export default function useMapItems(list_items, list_category, item) {
  list_items = list_category.map((category) => ({
    ...category,
    data: item
      .filter((item) => category.id === item.category)
      .sort((a, b) => a.place - b.place)
      .slice(0, 5),
  }));
  return list_items;
}
