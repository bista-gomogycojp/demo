import {notification_error} from "../composition/useNotification";

export async function getImageFromGG(getUrl, urlName, store, listLogo, notification, type= 'addLogo', id=null) {
    if (getUrl) {
        let domain = (new URL(getUrl))
        const host_name = domain.origin
        const result = await store.dispatch("getDataFromGG", host_name);
        let id_item = listLogo.length + 1
        const obj_logo = {
            open: true,
            id: id ? id : id_item,
            place: id_item,
            title: urlName,
            url: host_name,
            is_active:1,
            type: type
        }

        if (result.status) {
            const arr_image = [];
            for (let i = 0; i <= result.data.length; i++) {
                if (result.data[i]) {
                    const get_img = result.data[i].replace('//', '/')
                    const set_img = get_img.startsWith('/') ? get_img : `/${get_img}`
                    const img_src = host_name + '/' + set_img
                    const getImg = (result.data[i].startsWith('https') || result.data[i].startsWith('http'))
                        ? result.data[i]
                        : img_src;
                    arr_image.push(getImg)
                }
            }
            if (arr_image) {
                obj_logo.image = arr_image
                obj_logo.data = listLogo
                return obj_logo
            }
        } else {
            obj_logo.image = ''
            obj_logo.data = listLogo
            return obj_logo
        }

    } else {
        notification_error(
            notification,
            `サイトURLは正しい形式「https://」または「http://」を入力してください。`
        );
    }
}
