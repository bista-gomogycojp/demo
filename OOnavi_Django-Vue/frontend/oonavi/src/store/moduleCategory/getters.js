export default {
    getListItems: (state) => {
        return state.list_items;
    },
    getItems: (state) => {
        return state.category_items;
    },
    getCurrentPage: (state) => {
        return state.current_page;
    },
    getSizePage: (state) => {
        return state.size_page;
    },
    getSelectedPage: (state) => {
        return state.selected_page;
    },
    getNumberPage: (state) => {
        return state.number_page;
    },
    getCategories: (state) => {
        return state.categories;
    },
    getTotalItems: (state) => {
        return state.total_category;
    },
};
