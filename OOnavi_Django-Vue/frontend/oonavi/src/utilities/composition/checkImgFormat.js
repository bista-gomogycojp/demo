const checkImageFormat = (img) => {
    if (
        img.lastIndexOf("png") !== -1 ||
        img.lastIndexOf("jpeg") !== -1 ||
        img.lastIndexOf("jpg") !== -1 ||
        img.lastIndexOf("svg") !== -1 ||
        img.lastIndexOf("gif") !== -1
    ) {
        return true;
    }

    return false;
};

export {
    checkImageFormat
}
