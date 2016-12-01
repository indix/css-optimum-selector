import defaultProps from './defaults'

export default class CssCheckList {

  constructor(props) {
    this.ignore = props.ignore || null
    this.ignoreFunc = props.ignoreFunc || null
    this.root = props.root || 'html'
    this.priority = props.priority || defaultProps.priority
    this.relativeDepth = props.relativeDepth || defaultProps.relativeDepth
  }

  getFuncForCheckList(element) {
    const funcCheckList = {}
    this.priority.forEach((checkList) => {
      if (checkList === 'tag') funcCheckList[checkList] = $(element).prop
      else funcCheckList[checkList] = $(element).attr
    })
    return funcCheckList
  }

  getCheckList(element) {
    const funcCheckList = this.getFuncForCheckList(element)
    const checkListValues = {}
    this.priority.forEach((checkList) => checkListValues[checkList] = funcCheckList(element))
    if (this.priority.tag) checkListValues.tag = checkListValues.tag.toLowerCase()
    return checkListValues
  }

  getIgnoredValues(key, values) {
    return this.ignore[key]
      ? this.ignore[key].filter(value => values.indexOf(value) > -1)
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
      if (this.ignoreFunc) newCheckList[key] = getIgnoredValuesFromFunc(key, newCheckList[key])
      if (this.ignore) newCheckList[key] = getIgnoredValues(key, newCheckList[key])
    })
    return newCheckList
  }
}
