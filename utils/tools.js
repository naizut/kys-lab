/**
 * clone an array of json object
 * @param {object<Array>} arr
 */
 export const jsonArrayClone = (arr) => {
  return arr.map((obj) => {
    if (typeof obj !== 'object') return obj
    return JSON.parse(JSON.stringify(obj))
  })
}
