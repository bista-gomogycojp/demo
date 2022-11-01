export default function (next,store){
    if (!store.getters.isLogin) {
        next("/user")
        // store.commit("setLoginModal",true)
    } else {
        next()
    }
}