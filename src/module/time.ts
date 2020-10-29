
export const TIME_FORMAT_Day = 'YYYY-MM-DD'
export const TIME_FORMAT_Hs = 'HH:mm:ss'
export const TIME_FORMAT_Second = `${TIME_FORMAT_Day} ${TIME_FORMAT_Hs}`


// 获取现在n年后的时间
export function getFutureTime(n: number): Date {
    const now = new Date()
    now.setFullYear(now.getFullYear() + n)
    return now
}

// 月、天、时、分、秒 小于10的加前缀0显示
export function addZeroPrefix(val: number): string {
    if (val < 10) {
        return `0` + val
    }
    return val + ''
}


/**
 * 处理时间字符串 ie ios传入时间字符串到Date()中可能解析错误的问题
 * @param {2020-12-32 12:09:09 string} str 
 */
export function parseTimeStr(str: string): Date {
    return new Date(str.replace(/\-/g, '/'))
}



//获取时间参数
export function getTimeData(date: Date): Obj {
    let month = date.getMonth() + 1,
        day = date.getDate(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();

    return {
        currentYear: date.getFullYear(),
        currentMonth: month,
        currentDay: day,
        currentHours: hours,
        currentMinutes: minutes,
        currentSeconds: seconds,
        zeroMonth: addZeroPrefix(month),
        zeroDay: addZeroPrefix(day),
        zeroHours: addZeroPrefix(hours),
        zeroMinutes: addZeroPrefix(minutes),
        zeroSeconds: addZeroPrefix(seconds)
    }
}


/**
 * 获取两个时间的差值
 * @param {Date} time 
 * @param {Date} date2 
 */
export function getTimeDiff(time: Date, date2 = new Date()): Obj {
    var date3 = date2.getTime() - time.getTime(); //时间差的毫秒数    

    //计算出相差天数
    var diffDays = Math.floor(date3 / (24 * 3600 * 1000))

    //计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    var diffHours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    var diffMinutes = Math.floor(leave2 / (60 * 1000))
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
    var diffSeconds = Math.round(leave3 / 1000)
    return {
        ...getTimeData(time),
        //下面是差值
        diffDays,
        diffHours,
        diffMinutes,
        diffSeconds
    }
}




/**
 * 获取时间差值文字显示
 * @param {时间字符串} timeStr
 */
// export function getTimeDiffText(timeStr:string) {
//     let timeData = getTimeDiff(parseTimeStr(timeStr))
//     let text = isLessThanMinutes(timeData)
//     if (text.length > 0) {
//         return text
//     }
//     // return isLessThanHours(timeData)
//     // if (text.length > 0) {
//     //     return text
//     // }
//     return isLessThanHours(timeData)
// }



// // 小于1小时，显示：xx分钟前；例如：27分钟前
// export function isLessThanMinutes(timeDiff:Obj):string {
//     if (timeDiff.diffDays === 0 && timeDiff.diffHours === 0 && (timeDiff.diffMinutes > 0 && timeDiff.diffMinutes < 60 )) {
//         return `${timeDiff.diffMinutes}分钟前`
//     }
//     return ''
// }

// //时间差值 大于1小时，小于24小时，显示：xx:xx；例如：14:56
// export function isLessThanHours(timeDiff:Obj):string {
//     if (timeDiff.diffHours >= 1 || timeDiff.diffDays > 0) {
//         return `${timeDiff.currentYear}-${timeDiff.zeroMonth}-${timeDiff.zeroDay}`
//     }
//     return ''
// }

// // 大于24小时，显示：xx-xx；例：06-21
// export function isLessThanDay(timeDiff:Obj):string {
//     if (timeDiff.diffDays >= 1) {
//         return `${timeDiff.zeroMonth}-${timeDiff.zeroDay}`
//     }
//     return ''
// }