async function handleSaveItem (result_items,result_category,store){
    const jsonStringCategory = JSON.stringify(result_category)
    const jsonStringCatItems = JSON.stringify(result_items)
    const data_category = {
        'category': jsonStringCategory
    }
    const data_category_item = {
        'category_item': jsonStringCatItems
    }
    const category = await store.dispatch("actAddCategoryForUser", data_category);
    if(category.status){
        store.commit("setIsLoading", true);
        const cat_items = await store.dispatch("actAddCatItemForUser", data_category_item);
        if(cat_items.status){
            const data = {
                category: JSON.parse(category.data.category),
                item: JSON.parse(cat_items.data.category_item),
                currentPage: store.getters.getCurrentPage,
                sizePage: store.getters.getSizePage
            }
            store.commit("SET_LIST_ITEM", data);
            store.commit("setIsLoading", false);
            return { status : true , category: store.getters.getCategories , items: store.getters.getCategories , list: store.getters.getListItems}
        }
    }



}
export {handleSaveItem} ;