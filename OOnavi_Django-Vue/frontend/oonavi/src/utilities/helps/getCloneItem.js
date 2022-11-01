function getCloneItem(state_totalLogo,title_item,url_item,image_item,cloneData, is_active) {
    const data = {
        title: title_item,
        url: url_item,
        category:1,
        image: image_item,
        place:state_totalLogo,
        id: state_totalLogo,
        is_active: is_active
    };
    cloneData.value = data
    return data
}
export {
    getCloneItem
}