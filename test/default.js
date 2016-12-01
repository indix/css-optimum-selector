export default {
  ignore: {
    class: ['form-label'],
  },
  ignoreFunc: {
    class: (data) => {
      if(data.length > 0) data.push('test-class')
      return data
    }
  }
}
