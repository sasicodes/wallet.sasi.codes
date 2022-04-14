export const setToLocalStorage = (key: string, value: any) => {
  let data = typeof value !== 'string' ? JSON.stringify(value) : value
  setToStorage(key, data)
}

export const getFromStorage = (key: string) => {
  return !['undefined', undefined, null].includes(localStorage.getItem(key))
    ? localStorage.getItem(key)
    : null
}
export const setToStorage = (key: string, value: string) => {
  return localStorage.setItem(key, value)
}
