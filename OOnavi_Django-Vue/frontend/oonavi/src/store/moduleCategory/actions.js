import axiosInstance from "../../plugins/axios";

export default {
    async getCategory({commit}) {
        const category = await axiosInstance.get(`/category`);
        if (category.status === 200) {
            commit("SET_TOTAL_CATEGORY", category.data);
            return {
                status: true,
            };
        }
    },
    async getListCategory({commit, dispatch}) {
        try {
            commit("setIsLoading", true)
            const category = await axiosInstance.get(`/category`);
            if (category.status === 200) {
                const item = await axiosInstance.get(`/category-item`);
                if (item.status === 200) {
                    const data = {
                        category: category.data,
                        category_item: item.data,
                        currentPage: 0,
                        sizePage: 10
                    }
                    dispatch('handleCountPage', data)
                    return {
                        status: true,
                        data: {
                            category: category.data,
                            category_item: item.data,
                        }
                    }

                } else {
                    return {
                        status: false,
                    };
                }
            } else {
                return {
                    status: false,
                };
            }

        } catch (error) {
            commit("setIsLoading", false);
            return {
                status: false,
                error: error.message
            };
        }
    },
    handleCountPage({commit}, {category, category_item, currentPage, sizePage}) {
        if (category) {
            const data = {
                category: category,
                item: category_item,
                currentPage,
                sizePage
            }
            commit("SET_LIST_ITEM", data);
            commit("SET_TOTAL_CATEGORY", category);
            commit("setIsLoading", false)
            return {
                status: true
            }
        }
    },
    async getPaginationPage({commit}, data) {
        try {
            commit("setIsLoading", true)
            if (data.length) {
                commit("SET_PAGINATION_PAGE", data)
                return {
                    status: true,
                }
            }

        } catch (error) {
            commit("setIsLoading", false);
            return {
                status: false,
                error: error.message
            }
        }
    },
    async getRemovedItem({commit}, data) {
        try {
            if (data.item.length && data.category.length) {
                commit("SET_LIST_REMOVED_ITEM", data);
                return {
                    status: true
                }
            } else {
                return {
                    status: false
                }
            }
        } catch (error) {
            commit("setIsLoading", false);
            return {
                status: false,
                error: error.message
            };
        }
    },

    async getAddedItem({commit}, data) {
        try {
            if (data.newData) {
                commit("SET_LIST_ADDED_ITEM", data);
                return {
                    status: true
                }
            } else {
                return {
                    status: false
                }
            }
        } catch (error) {
            commit("setIsLoading", false);
            return {
                status: false,
                error: error.message
            };
        }
    },
    async getItemFromLogo({commit}, data) {
        try {
            if (data.newData) {
                commit("SET_ITEM_FROM_LOGO", data);
                return {
                    status: true
                }
            } else {
                return {
                    status: false
                }
            }
        } catch (error) {
            commit("setIsLoading", false);
            return {
                status: false,
                error: error.message
            };
        }
    },

};
