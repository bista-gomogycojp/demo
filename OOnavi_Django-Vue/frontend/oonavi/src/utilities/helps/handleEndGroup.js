function handleEndGroup(e, state_categories, state_items, store, currentPage, sizePage) {
    const valueNewIndex =
        parseInt(e.newIndex) === 10 ? parseInt(e.newIndex) - 1 : parseInt(e.newIndex) + 1;

    const elmChildren = e.to.children[valueNewIndex];
    const elmNewTitle = elmChildren.title;
    const searchNewTitle = (element) => element.title === elmNewTitle;
    const new_index = state_categories.findIndex(searchNewTitle);
    const searchOddTitle = (element) => element.title === e.item.title;
    const old_index = state_categories.findIndex(searchOddTitle);

    if (new_index >= state_categories.length) {
        let k = new_index - state_categories.length + 1;
        while (k--) {
            state_categories.push(undefined);
        }
    }

    if (new_index > old_index) {
        state_categories.splice(new_index - 1, 0, state_categories.splice(old_index, 1)[0]);
    } else {
        state_categories.splice(new_index, 0, state_categories.splice(old_index, 1)[0]);
    }

    let flag = 1
    state_categories.forEach((val, index) => {
        val.place = flag;
        flag++;
    })
    state_categories = state_categories.sort((a, b) => a.place - b.place)
    const data = {
        category : state_categories,
        item: state_items,
        currentPage,
        sizePage
    }
    store.commit("SET_LIST_ITEM", data)
    return {
        category : state_categories,
        items : state_items,
        list: store.getters.getListItems,
        type: 'category'
    }
}
export {handleEndGroup};