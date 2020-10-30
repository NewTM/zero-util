
/**
 * 判断一个值是否 是一个有效的数组
 * @param val any
 */
export function isArray(val: any): boolean {
    return Array.isArray(val) && val.length > 0
}


export function isString(val: any): boolean {
    return typeof val === 'string'
}

export function isNumber(val: any): boolean {
    return typeof val === 'number' || !isNaN(val)
}

