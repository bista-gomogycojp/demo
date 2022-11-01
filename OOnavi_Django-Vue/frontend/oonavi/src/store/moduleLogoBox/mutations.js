export default {
    SET_LOGO_BOX(state, data) {
        // state.listLogo = data.sort((a, b) => a.place - b.place)
        state.listLogo = data
    },
    SET_COUNT_LOGOS(state, data) {
        state.countLogo = data;
    },
    SET_INDEX_PLACE(state, {list}){
        function unique(arr) {
            return Array.from(new Set(arr))
        }
        const uniList = unique(list)
        let flag = 1;
        uniList.forEach((val)=>{
            val.place = flag;
            val.id = flag;
            val.category = 1;
            flag++;
        })
        state.listLogo = uniList.sort((a, b) => a.place - b.place)
    },
};