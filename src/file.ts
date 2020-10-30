const BASE = 1024 * 1024
const IMG_TYPES = ['png', 'jpg', 'jpeg', 'gif'] //图片类型
const EXCEL_TYPES = ['xls', 'xlsx'] // excel类型
const COMPRESS_FILE_TYPES = ['zip', 'rar'] // 压缩包类型



/**
 * 
 * @param size File的size
 * @param number 以兆位最小单位
 */
function isMaxSize(size: number, number: number): boolean {
    return (number * BASE) > size
}


/**
 * 判断 图片文件
 * @param suffix 文件后缀
 */
export function isImgFile(suffix: string): boolean {
    return IMG_TYPES.includes(suffix)
}


/**
 * 判断 excel文件
 * @param suffix 文件后缀
 */
export function isExcelFile(suffix: string): boolean {
    return EXCEL_TYPES.includes(suffix)
}

/**
 * 判断 压缩包文件
 * @param suffix 文件后缀
 */
export function isCompressFile(suffix: string): boolean {
    return COMPRESS_FILE_TYPES.includes(suffix)
}


export function getFileType(): string {
    return ""
}