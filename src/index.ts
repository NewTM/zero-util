/**
 * @Descripttion: 文字复制到设备的剪切板
 * @param {text} 要复制的文字
 * @return: Boolean
 */
export function copyToClipboard(text: string): boolean {
  let textArea = document.createElement("textarea"),
    isSuccess = false;
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.width = "2em";
  textArea.style.height = "2em";
  textArea.style.padding = "0";
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";
  textArea.style.background = "transparent";
  textArea.value = text || "";
  document.body.appendChild(textArea);
  if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
    // 区分iPhone设备
    window.getSelection().removeAllRanges(); // 这段代码必须放在前面否则无效
    let range = document.createRange();
    // 选中需要复制的节点
    range.selectNode(textArea);
    // 执行选中元素
    window.getSelection().addRange(range);
    // 执行 copy 操作
    isSuccess = document.execCommand("copy");
    // 移除选中的元素
    window.getSelection().removeAllRanges();
  } else {
    textArea.select();
    isSuccess = document.execCommand("Copy");
  }
  document.body.removeChild(textArea);
  return isSuccess;
}

// 切换 屏幕
export function toggleScreen(bool: boolean): void {
  let elem: any;
  if (bool) {
    elem = document.body;
    elem.webkitRequestFullScreen
      ? elem.webkitRequestFullScreen()
      : elem.mozRequestFullScreen
      ? elem.mozRequestFullScreen()
      : elem.msRequestFullscreen
      ? elem.msRequestFullscreen()
      : elem.requestFullScreen
      ? elem.requestFullScreen()
      : alert("浏览器不支持全屏");
  } else {
    elem = parent.document;
    elem.webkitCancelFullScreen
      ? elem.webkitCancelFullScreen()
      : elem.mozCancelFullScreen
      ? elem.mozCancelFullScreen()
      : elem.cancelFullScreen
      ? elem.cancelFullScreen()
      : elem.msExitFullscreen
      ? elem.msExitFullscreen()
      : elem.exitFullscreen
      ? elem.exitFullscreen()
      : alert("切换失败,可尝试Esc退出");
  }
}

/**
 * @Descripttion: 获取location查询参数
 * @demo '?demo=123&test=test'
 * @return: {demo:123,test:'test'}
 */
export function getQueryParams(str: string): URLSearchParams {
  if (str.indexOf("?") === -1) return;
  const args = new URLSearchParams(str);
  return args;
}

/**
 *参数转换为 FormData
 * @param {对象类型{}} obj
 * @return {FormData} f
 */
export function objToFormData(obj: Obj): FormData {
  const f = new FormData();
  for (const key in obj) {
    f.append(key, obj[key]);
  }
  return f;
}

/**
 * @Descripttion: 函数防抖
 * @param {method} 执行的方法
 * @param {delay} 延迟时间
 * @return: Function
 */
export function _debounce(
  method: Function,
  delay: number,
  context: any
): Function {
  let timer: any;
  return function () {
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      method.apply(context, args);
    }, delay);
  };
}

/**
 * @Descripttion: 函数节流
 * @param {method} 执行的方法
 * @param {delay} 延迟时间
 * @param {context} 绑定的this值
 * @return: Function
 */
export function _throller(
  method: Function,
  delay: number,
  context: any
): Function {
  var begin = new Date().getTime();
  return function () {
    var args = arguments,
      current = new Date().getTime();
    if (current - begin >= delay) {
      method.apply(context, args);
      begin = current;
    }
  };
}

/**
 * @Descripttion: 将base64转换为文件
 * @param {dataurl} base64
 * @param {filename} 要创建的文件名
 * @return: file
 */
export function _dataURLtoFile(dataurl: string, filename: string): File {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: mime,
  });
}

/**文件转换base64
 * @param { 文件对象 } file
 * @return { Promise }
 */
export function _fileToBase64(file: File): Promise<any> {
  if (Object.prototype.toString.call(file) !== "[object File]") {
    console.warn(`file 必须是 文件！ >>>${file}`);
    return;
  }
  let reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onload = function () {
      resolve(this.result);
    };
  });
}

/**
 * @description: 禁止右键、选择、复制
 */
export function disableSelectAndCopy(): void {
  ["contextmenu", "selectstart", "copy"].forEach(function (ev) {
    document.addEventListener(ev, function (event) {
      return (event.returnValue = false);
    });
  });
}

/**
 * @description 获取浏览器版本
 */
export function getBrowserInfo(): string {
  const { userAgent } = navigator; //取得浏览器的userAgent字符串
  const isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
  const isIE =
    userAgent.indexOf("compatible") > -1 &&
    userAgent.indexOf("MSIE") > -1 &&
    !isOpera; //判断是否IE浏览器
  const isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
  const isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
  const isSafari =
    userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
  const isChrome =
    userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

  if (isIE) {
    const reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    const fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) {
      return "IE7";
    } else if (fIEVersion == 8) {
      return "IE8";
    } else if (fIEVersion == 9) {
      return "IE9";
    } else if (fIEVersion == 10) {
      return "IE10";
    } else if (fIEVersion == 11) {
      return "IE11";
    } else {
      return "IE";
    }
  }
  if (isOpera) {
    return "Opera";
  }
  if (isEdge) {
    return "Edge";
  }
  if (isFF) {
    return "FF";
  }
  if (isSafari) {
    return "Safari";
  }
  if (isChrome) {
    return "Chrome";
  }
}

/**
 * @description 获取 设备
 */
export function getOsInfo(): string {
  const userAgent = navigator.userAgent.toLowerCase();
  let name = "Unknown";
  if (userAgent.indexOf("win") > -1) {
    name = "Windows";
  } else if (userAgent.indexOf("iphone") > -1) {
    name = "Iphone";
  } else if (userAgent.indexOf("mac") > -1) {
    name = "Mac";
  } else if (
    userAgent.indexOf("x11") > -1 ||
    userAgent.indexOf("unix") > -1 ||
    userAgent.indexOf("sunname") > -1 ||
    userAgent.indexOf("bsd") > -1
  ) {
    name = "Unix";
  } else if (userAgent.indexOf("linux") > -1) {
    if (userAgent.indexOf("android") > -1) {
      name = "Android";
    } else {
      name = "Linux";
    }
  }
  return name;
}

var a: string = "123";
