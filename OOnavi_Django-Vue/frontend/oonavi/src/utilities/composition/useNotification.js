//get  error notication
const notification_error = (notification, description) => {
    notification.error({
        message: 'エラー',
        description: description,
    });
}
//get  success notication
const notification_success = (notification, description) => {
    notification.success({
        message: '成功',
        description: description,
    });
}
//get  warning notication
const notification_warn = (notification, description) => {
    notification.warn({
        message: 'セキュリティ エラー ',
        description: description,
    });
}
//get  warining notication
const notification_warn_backup = (notification, description) => {
    notification.warn({
        message: '警告',
        description: description,
    });
}

export {
    notification_error,
    notification_warn,
    notification_success,
    notification_warn_backup
}