
// 获取当前时间节点 早上｜上午｜下午｜晚上
export const getTimeNode = (): string => {
    const hour = new Date().getHours();
    const msg =
        hour <= 9 ? '早上' :
        hour <= 12 ? '中午' :
        hour <= 18 ? '下午' :
        '晚上';
    return msg
}