import {notification_error} from "../composition/useNotification";

 export async function settingInitial(name, store, notification){
    if (name === "user") {
        const logoBox = await store.dispatch("getListLogoBox");
        if (logoBox.status) {
            const jsonString = JSON.stringify(store.getters.getListLogo);
            const data = {
                logo_box: jsonString,
            };
            await store.dispatch("actAddLogoForUser", data);
            return {
                status: true
            }
        }
    } else if (name === "home") {
        const logoBox = await store.dispatch("getListLogoBox");
        if (logoBox.status) {
            return {
                status: true,
                data : logoBox.data
            }
        } else {
            notification_error(
                notification,
                `現在、プロジェクトが更新中でございます。`
            );
            return {
                status: false
            }
        }
    }
}