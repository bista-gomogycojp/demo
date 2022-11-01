import {createStore} from "vuex";
import LogoBox from "./moduleLogoBox";
import CategoryBox from "./moduleCategory";
import User from "./moduleUser"
// Create a new store instance.
const store = createStore({
    state() {
        return {
            isLoginOpen: false,
            isResetPasswordOpen: false,
            isGetCodeOpen: false,
            isSearchOpen: false,
            isPictureOpen: false,
            isOpenItemPop:false,
            arrPicture: [],
            arrSettingPic:[],
            arrItemPop: [],
            isCategoryOpen: false,
            isSettingCatOpen:false,
            isRegOpen: false,
            isMobOpen: false,
            isLoggedIn: false,
            isLoading: false,
            isSettingIconOpen:false,
            isDark: false,
            authUser: {},
            imgUser: "",
            getGroupName: "",
            totalCategory: [],
            ItemsFromGG:[],
            getIdCategory: 1,

        };
    },
    mutations: {
        setIdCategory(state, data) {
            state.getIdCategory = data;
        },
        setGroupName(state, data) {
            state.getGroupName = data;
        },
        setIsLoading(state, data) {
            state.isLoading = data;
        },
        setTotalCategory(state, data) {
            state.totalCategory = data;
        },
        setIsLoggedIn(state, data) {
            state.isLoggedIn = data;
        },
        setAuthUser(state, data) {
            state.authUser = data;
        },
        setLoginModal(state, data) {
            state.isLoginOpen = data;
        },
        setPictureModal(state, data) {
            state.arrPicture = data;
        },
        setSettingPicModal(state, data) {
            state.arrSettingPic = data;
        },

        setItemPopModal(state, data) {
            state.arrItemPop = data;
        },
        setItemsFromGG(state, data) {
            state.ItemsFromGG = data;
        },
        setOpenItemPop(state, data) {
            state.isOpenItemPop = data
        },
        setResetPasswordModal(state, data) {
            state.isResetPasswordOpen = data;
        },
        setCodeModal(state, data) {
            state.isGetCodeOpen = data;
        },
        setRegisterModal(state, data) {
            state.isRegOpen = data;
        },
        setSettingIconModal(state, data) {
            state.isSettingIconOpen = data;
        },
        setSettingCatModal(state, data) {
            state.isSettingCatOpen = data;
        },
        setMobileModal(state, data) {
            state.isMobOpen = data;
        },
        setDarkModal(state, data) {
            state.isDark = data;
        },
        setUrlImgUser(state, data) {
            state.imgUser = data;
        },
        setSearchModal(state, data) {
            state.isSearchOpen = data;
        },
        setCategoryModal(state, data) {
            state.isCategoryOpen = data;
        },
    },
    modules: {
        LogoBox,
        CategoryBox,
        User

    },
});

export default store;
