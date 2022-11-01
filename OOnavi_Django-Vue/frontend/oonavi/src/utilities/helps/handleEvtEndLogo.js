import {notification_error} from "../composition/useNotification";

async function handleEvtEndLogo(e, listLogo, store, cloneData, notification) {
    const fromId = parseInt(e.from.id.split("-")[1]);
    const toId = parseInt(e.to.id.split("-")[1]);
    const toTrash = String(e.to.id)

    const valueNewIndex = parseInt(e.newIndex) + 1;
    const elmChildren = e.to.children[valueNewIndex];

    const removedRow = await removeRow(toId, fromId, listLogo, store);
    if (removedRow) {
        return removedRow;
    }

    const deletedData = await deleteItem(toTrash, listLogo, store);
    if (deletedData) {
        return deletedData;
    }

    const removedColumn = await removeColumn(toId, valueNewIndex, elmChildren, cloneData, e, store);
    if (removedColumn) {
        return removedColumn
    }

    async function removeColumn(toId, valueNewIndex, elmChildren, cloneData, e, store) {
        if (toId && valueNewIndex && elmChildren) {
            store.commit("setIsLoading", true);
            const getIndex = (valueNewIndex === 5 ) ?  valueNewIndex-2 : valueNewIndex+1
            const elmTitle = e.to.children[getIndex]?e.to.children[getIndex].title : '';
            const searchTitle = (element) => element.title === elmTitle
            const getIndexTitle = store.getters.getItems.findIndex(searchTitle)
            const getNewIndex = (getIndexTitle !== -1 && valueNewIndex === 5) ? getIndexTitle+2 :getIndexTitle

            cloneData.category = parseInt(toId)
            const data = {
                newData: cloneData,
                currentPage:store.getters.getCurrentPage,
                sizePage:store.getters.getSizePage,
                category:store.getters.getCategories,
                newIndex: parseInt(getNewIndex),
                items: store.getters.getItems,
                type: 'LogoBox'
            }

            const result = await store.dispatch("getItemFromLogo", data);
            const returnObj = returnData(result, store, "movedColumn",false);
            store.commit("setIsLoading", false);
            return returnObj;

        } else {
            store.commit("setIsLoading", false);
            notification_error(notification, `申し訳ございませんが、もう一度ドラッグしてください。`)
            cloneData.id = e.oldIndex;
            cloneData.place = e.oldIndex;
            listLogo.push(cloneData);
            const result = await store.dispatch("changeIndexPlace", {list: listLogo});
            return returnData(result, store, "movedColumn",true);
        }
    }

    async function removeRow(toId, fromId) {
        if (toId === fromId) {
            store.commit("setIsLoading", true);
            const result = await store.dispatch("changeIndexPlace", {list: listLogo});
            const returnObj = returnData(result, store, "movedRow",false);
            store.commit("setIsLoading", false);
            return returnObj;
        }
    }

    async function deleteItem(toTrash) {
        if (toTrash === "trash-logo-box" || toTrash === "trash-top") {
            store.commit("setIsLoading", true);
            const result = await store.dispatch("changeIndexPlace", {list: listLogo});
            const returnObj = returnData(result, store, "deleteItem",false);
            store.commit("setIsLoading", false);
            return returnObj;
        }
    }

}

function returnData(result, store, type,isError) {
    if (result.status) {
        return {
            list: store.getters.getListLogo,
            list_items: store.getters.getItems,
            list_category: store.getters.getCategories,
            type: type,
            isError:isError
        };
    } else {
        alert("Error");
    }
}

export {handleEvtEndLogo};