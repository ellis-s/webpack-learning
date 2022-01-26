const mergeDefault = (data) => {
  return {
    name: 'username',
    age: 18,
    ...data,
  }
}

export {
  mergeDefault
}