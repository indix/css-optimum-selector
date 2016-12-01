import defaultProps from './defaults'

export default class CssCheckList {

  constructor(props) {
    this.ignore = (props && props.ignore) || null
    this.ignoreFunc = (props && props.ignoreFunc) || null
    this.root = (props && props.root) || 'html'
    this.priority = (props && props.priority) || defaultProps.priority
    this.relativeDepth = (props && props.relativeDepth) || defaultProps.relativeDepth
  }

  getCheckList(element) {
    const checkListValues = {}
    this.priority.forEach((checkList) => {
      let value = null
      if (checkList === 'tag') value = element.prop('tagName').toLowerCase()
      else {
        value = element.attr(checkList)
        value = value ? value.split(" ") : null
      }
      if (value) checkListValues[checkList] = Array.isArray(value) && value || [value]
    })
    return checkListValues
  }

  getIgnoredValues(key, values) {
    return this.ignore[key]
      ? values.filter(value => !(this.ignore[key].indexOf(value) > -1))
      : values
  }

  getIgnoredValuesFromFunc(key, values) {
    return this.ignoreFunc[key]
      ? this.ignoreFunc[key](values)
      : values
  }

  getFilteredCheckList(checkList) {
    const checkListKeys = Object.keys(checkList)
    const newCheckList = {}
    checkListKeys.forEach((key) => {
      newCheckList[key] = checkList[key]
      if (this.ignoreFunc) newCheckList[key] = this.getIgnoredValuesFromFunc(key, newCheckList[key])
      if (this.ignore) newCheckList[key] = this.getIgnoredValues(key, newCheckList[key])
    })
    return newCheckList
  }

}
