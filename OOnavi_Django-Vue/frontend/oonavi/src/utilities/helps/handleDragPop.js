async function handleDragPop(e, listItem, store) {
    const fromId = parseInt(e.from.id.split("-")[1]);
    const toId = parseInt(e.to.id.split("-")[1]);
    const itemOld = store.getters.getItems
    if (toId === fromId) {
        listItem.map((val, index) => {
            val.place = index + 1
        })
        itemOld.map(item => ({...item, listItem}))
        const data = {
            category: store.getters.getCategories,
            item: itemOld,
            currentPage: store.getters.getCurrentPage,
            sizePage: store.getters.getSizePage,
            selectedPage: store.getters.getSelectedPage,
            numberPage: store.getters.getNumberPage
        }
        store.commit("SET_LIST_ITEM", data);
    }
}

export {handleDragPop}