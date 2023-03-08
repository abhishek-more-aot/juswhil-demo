// Parse the time to string
export const parseTime = (
  time?: object | string | number,
  cFormat?: string
): string | null => {
  if (time === undefined) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date: Date
  if (typeof time === 'object') {
    date = time as Date
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: { [key: string]: number } = {
    y: date?.getFullYear(),
    m: date?.getMonth() + 1,
    d: date?.getDate(),
    h: date?.getHours(),
    i: date?.getMinutes(),
    s: date?.getSeconds(),
    a: date?.getDay()
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      return '0' + value
    }
    return String(value) || '0'
  })
  return timeStr
}

// Format and filter json data using filterKeys array
export const formatJson = (filterKeys: any, jsonData: any) =>
  jsonData.map((data: any) => filterKeys.map((key: string) => {
    if (['createdTimestamp', 'timestamp'].indexOf(key) > -1) {
      return parseTime(data[key])
    } else if (key === 'enabled') {
      return data[key] ? 'enabled' : 'disabled'
    } else if (key.indexOf('.') > 0) {
      return getDescendantProp(data, key)
      // return data[key.substr(0, key.indexOf('.'))][key.substr(key.indexOf('.') + 1)]
    } else {
      return data[key]
    }
  }))

// Check if an element has a class
export const hasClass = (ele: HTMLElement, className: string) => {
  return !!ele.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

// Add class to element
export const addClass = (ele: HTMLElement, className: string) => {
  if (!hasClass(ele, className)) ele.className += ' ' + className
}

// Remove class from element
export const removeClass = (ele: HTMLElement, className: string) => {
  if (hasClass(ele, className)) {
    const reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

// Toggle class for the selected element
export const toggleClass = (ele: HTMLElement, className: string) => {
  if (!ele || !className) {
    return
  }
  let classString = ele.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  ele.className = classString
}

export const getQuery = (query: any) => {
  const processedQuery = Object.assign({}, query)
  // set filter as empty
  processedQuery.filter = []
  // check for filter
  if ('filter' in query) {
    // loop over fields and check for values
    Object.entries(query.filter).forEach(([field, condition]) => {
      // check if field value has be set
      if (field in query && [undefined, ''].indexOf(query[field]) === -1) {
        if (field.indexOf('_') >= 0) {
          var field_temp = field.split('_')[0]
          processedQuery.filter.push(field_temp + '||' + condition + '||' + '"' + processedQuery[field] + '"')
        } else {
          processedQuery.filter.push(field + '||' + condition + '||' + '"' + processedQuery[field] + '"')
        }
        delete processedQuery[field]
      }
    })
  }
  return processedQuery
}

export const getDescendantProp = (obj: any, desc: any) => {
  var arr = desc.split('.')
  while (arr.length && (obj = obj[arr.shift()]));
  return obj
}
