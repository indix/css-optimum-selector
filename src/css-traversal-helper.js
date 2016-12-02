import CssCheckListHelper from './css-checklist-helper'
import $ from 'jquery'

export default class CssTraversalHelper extends CssCheckListHelper {

  composePathStringHelper(key, val) {
    switch (key) {
      case 'tag': return val
      case 'id': return `#${val}`
      case 'class': return `.${val}`
    }
  }

  formPriorityArray(checkList) {
    return Object.keys(checkList).reduce((pre, cur) => pre.concat(this.composePathStringHelper(cur, checkList[cur])), [])
  }

  isUniqueToParent(element, path) {
    return (element.find(path).length === 1)
  }

  isUniqueInDocument(element, path) {
    const root = element.closest(this.root)
    return root.find(path).length === 1
  }

  nthChildStr(element)  {
    let str = `${element.prop('tagName').toLowerCase()}:nth-child(`;
    element.parent().children().each((idx, child) => {
      if(element.is(child)) str+=`${idx+1})`;
    });
    return str;
  }

  checkUniqueInParent(parent, priorityArray, path) {
    let temPath = ''
    for(let i=0; i<priorityArray.length; i++) {
      for(let j=i; j<priorityArray.length; j++) {
        const newPath = path
          ? `${temPath}${priorityArray[j]} > ${path}`
          : `${temPath}${priorityArray[j]}`
        const result = this.isUniqueToParent(parent, newPath) && newPath
        if (result) return result
      }
      temPath = `${priorityArray[i]}${temPath}`
    }
    return false
  }

  checkCommonPath(path1, path2) {
    return path1 !== null && path1 === path2
  }

  checkCommonParent(elm1, elm2) {
    if (!elm1.length || !elm2.length) return null
    return elm1.is(elm2) ? elm1 : this.checkCommonParent(elm1.parent(), elm2.parent())
  }

  childToParentTraversal(child, par, path=[]) {
    if(par.is(child)) return path
    path.unshift(this.nthChildStr(child))
    path = this.childToParentTraversal(child.parent(), par, path)
    return path
  }

  checkRelativeDegree(path1, path2) {
    let relative = 0
    const path1Array = path1.split(" > ").reverse()
    const path2Array = path2.split(" > ").reverse()
    while (path1Array[relative] && path1Array[relative] === path2Array[relative]) relative++
    this.maxRelativeDegree = relative
    return relative
  }

  getRelativeChildPath(path1, relativeDepth) {
    let depth = this.maxRelativeDegree
    if (relativeDepth <= depth) depth = relativeDepth
    let path = [];
    let iterator = 0;
    const path1Array = path1.split(" > ").reverse()
    while(--depth > -1) path.push(path1Array[iterator++])
    return path.reverse().join(" > ")
  }

}
