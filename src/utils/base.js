export function throwError (errorContent) {
    throw new Error(errorContent)
}

export function isString(str) {
    return Object.prototype.toString.call(str) === '[object String]' ? true : false
}

export function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]' ? true : false
}

export function isNumber(num) {
    return Object.prototype.toString.call(arr) === '[object Number]' ? true : false
}

export function isUndefined(obj) {
    return Object.prototype.toString.call(arr) === '[object Undefined]' ? true : false
}

export function isBoolean(boolean) {
    return Object.prototype.toString.call(arr) === '[object Boolean]' ? true : false
}



export function arrSortMinToMax(array){
    newArray = array.sort(function compareFunction(item1, item2) {
        return item1.localeCompare(item2);
    });
    return newArray;

}

export function arrSortMaxToMin(array){
    newArray = array.sort(function compareFunction(item1, item2) {
        return item1.localeCompare(item2);
    });
    return newArray.reverse();
}

/**
 * @method 时间格式转换
 * @param {String} '2018-05-07T16:00:00.000Z'
 * @export
 */
export function timeFormat(time){
    if(!isString(time)){
        throwError('时间格式化参数不正确！') 
    }
    const DATE = new Date(time);
    const Y = DATE.getFullYear();
    const M = (DATE.getMonth()+1).toString().padStart(2,'0');
    const D = DATE.getDate().toString().padStart(2,'0');
    const h = DATE.getHours().toString().padStart(2,'0');
    const m = DATE.getMinutes().toString().padStart(2,'0');
    const s = DATE.getSeconds().toString().padStart(2,'0')
    let formatTime = `${Y}-${M}-${D} ${h}:${m}:${s}`;
    return formatTime
}


export function duplicate(arr) {
    const sorter = obj => {
      if (typeof obj === "string") return obj;
      const S = Object.keys(obj).sort();
      const item = {};
      for (const val of S) {
        item[val] = obj[val];
      }
      return item;
    };
  
    const change = (data, key) => {
      const X = {
        en: val => {
          return JSON.stringify(val);
        },
        de: val => {
          return JSON.parse(val);
        }
      };
      const item = [];
      for (let val of data) {
        val = sorter(val); //对象排序
        const c = X[key](val);
        item.push(c);
      }
      return item;
    };
  
    let enRes = change(arr, "en");
    const deRes = [...new Set(enRes)];
    return change(deRes, "de");
  }