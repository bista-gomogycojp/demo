async function getUrlFromGG(evt, state_items, state_categories = [], store, type = 'ItemsInTable') {
    evt.stopPropagation();
    evt.preventDefault();
    const url = evt.dataTransfer.getData("URL")
    const getUrl = (url.startsWith('https') || url.startsWith('http')) ? url : ''
    if (getUrl) {
        let id_item = state_items.length + 1
        let domain = (new URL(getUrl))
        const title = domain.hostname
        const host_name = domain.origin
        const result = await store.dispatch("getDataFromGG", host_name)
        const element =  handleElement(evt, store, type)
        const category_id = element ?  element.category_id : 0
        const getIndexTitle = element ? element.getIndexTitle : 1

        const obj_logo = {
            open: true,
            id: id_item,
            place: id_item,
            title: title,
            url: host_name,
            is_active:1,
        }
        const obj_items = {
            id: id_item,
            title: title,
            url: host_name,
            place: 1,
            is_active:1,
            category: parseInt(category_id),
        }
        if (result.status) {
            const data = result.data
            const arr_image = [];
            for (let i = 0; i <= data.length; i++) {
                if (data[i]) {
                    const get_img = result.data[i].replace('//', '/')
                    const set_img = get_img.startsWith('/') ? get_img : `/${get_img}`
                    const img_src = host_name + set_img
                    const getImg = (result.data[i].startsWith('https') || result.data[i].startsWith('http'))
                        ? result.data[i]
                        : img_src;
                    arr_image.push(getImg)
                }
            }
            if (arr_image) {
                if (type === 'LogoBox') {
                    obj_logo.image = arr_image
                    return obj_logo
                } else {
                    obj_items.image = arr_image
                    return {
                        newData: obj_items,
                        data: {
                            newIndex: parseInt(getIndexTitle) + 1,
                            item: state_items,
                            category: state_categories,
                        }

                    }

                }

            }

        } else {
            if (type === 'LogoBox') {
                obj_logo.image = ''
                return obj_logo
            } else {
                obj_items.image = ''
                return {
                    newData: obj_items,
                    data: {
                        newIndex: parseInt(getIndexTitle) + 1,
                        item: state_items,
                        category: state_categories,
                    }

                }
            }

        }
    }
}

function handleElement(evt, store, type) {
    if (type === 'ItemsInTable') {
        const elm = evt.toElement.parentElement
        const elmNewTitle = evt.toElement.getAttribute('title')
        const category_id = elm.getAttribute("id").split("-")[1];
        const searchNewTitle = (element) => element.title === elmNewTitle
        const getIndexTitle = store.getters.getItems.findIndex(searchNewTitle)

        return {category_id, getIndexTitle}
    }


}

export {
    getUrlFromGG
}



