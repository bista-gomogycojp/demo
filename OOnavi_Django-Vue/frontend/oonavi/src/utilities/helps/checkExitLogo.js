import {notification_error} from "../composition/useNotification";

export async function checkExitLogo (objData, store, objImg, notification) {
    const searchTitle = (element) => element.title === objImg.title;
    const setIndexLogo = objData.findIndex(searchTitle);
    const setIndexCategory = store.getters.getItems.findIndex(searchTitle);
    if (setIndexLogo !== -1 || setIndexCategory !== -1) {
        notification_error(
            notification,
            `現在、「 ${objImg.title} 」が存在されています。`
        );
        return;
    }
    objData.push(objImg);
    return objData;
}