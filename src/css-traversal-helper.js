import CssCheckListHelper from './css-checklist-helper'

export default class CssTraversalHelper extends CssCheckListHelper {

  composePathStringHelper(key, val) {
    switch (key) {
      case 'tag': return val
      case 'id': return `#${val}`
      case 'class': return `.${val}`
    }
  }

  isUniqueToParent(element, path) {
    return element.parent().find(path).length === 1
  }

  isUniqueInDocument(element, path) {
    console.log('\n', path);
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

  checkUniqueInParent(priorityArray, path, $) {
    let temPath = ''
    for(let i=0; i<priorityArray.length; i++) {
      for(let j=i; j<priorityArray.length; j++) {
        const newPath = `${temPath}${priorityArray[j]} ${path}`
        const result = this.isUniqueToParent($(newPath), newPath) && newPath
        if (result) return result
      }
      temPath = `${priorityArray[i]}${temPath}`
    }
    return false
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

  checkCommonPath(path1, path2){
    path1 !== null && path1 === path2
  }

  formPriorityArray(checkList) {
    return Object.keys(checkList).reduce((pre, cur) => pre.concat(this.composePathStringHelper(cur, checkList[cur])), [])
  }

}
