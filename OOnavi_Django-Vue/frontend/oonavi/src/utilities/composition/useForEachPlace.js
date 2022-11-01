export default function useForEachPlace(item, type = '') {
  if(type === 'category'){
    return item.map(value => ({ title: value.title, id:value.id, place:value.place }))
  }
  return item.map(value => ({ id:value.id, category:value.category,title: value.title, place:value.place, url:value.url, image: value.image }))
}
