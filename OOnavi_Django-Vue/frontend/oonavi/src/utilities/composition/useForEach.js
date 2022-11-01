export default function useForEach(item, category_id, category_id_old = null) {
    let x = 1;
    let i = 1;
    function unique(arr) {
        return Array.from(new Set(arr))
    }
    const unItems = unique(item)

    unItems.forEach((val, index) => {
        if (val.category === category_id) {
            val.place = x;
            val.category = category_id;
            x++;
        }
    });
    if(category_id_old !== null){
        unItems.forEach((val, index) => {
            if (val.category === category_id_old) {
                val.place = i;
                val.category = category_id_old;
                i++;
            }
        });
    }

    return unItems;
}