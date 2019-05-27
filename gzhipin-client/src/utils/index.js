/*包含n个工具函数的模块 */
export function getRedirectTo(type, header) {
    let path;
    if(type==='laoban') {
        path='/laoban'
    } else {
        path='/dashen'
    }

    if(!header) {//没有值返回信息完善界面
        path += 'info'
    } 
    return path
}

