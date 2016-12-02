import CssOptimumSelectorHelper from './css-traversal-helper'

export default class CssOptimumSelector extends CssOptimumSelectorHelper {

  constructor(props) {
    super(props)
    this.cssPath = this.cssPath.bind(this)
    this.uniqueCssSelector = this.uniqueCssSelector.bind(this)
    this.getCommonSelector = this.getCommonSelector.bind(this)
  }

  cssPath(element, $, path = '') {
    if (path && this.isUniqueInDocument(element, path)) return path
    const checkList = this.getCheckList(element)
    const filteredCheckList = this.getFilteredCheckList(checkList)
    const priorityArray = this.formPriorityArray(filteredCheckList)
    const result = this.checkUniqueInParent(element.parent(), priorityArray, path, $)
    let parentPath = null
    if(result) {
      parentPath = result
    } else {
      parentPath = `${this.nthChildStr(element)}`
      if (path) parentPath = `${parentPath} > ${path}`
    }
    return this.cssPath(element.parent(), $, parentPath)
  }

  uniqueCssSelector(element, $) {
    return this.cssPath($(element), $)
  }

  getCommonSelector(firstElement, secondElement) {
    const commonParent = this.checkCommonParent(firstElement, secondElement);
    if (!commonParent) return false;
    const ele1Path = this.childToParentTraversal(ele1, commonParent).slice(1).join(' > ');
    const ele2Path = this.childToParentTraversal(ele2, commonParent).slice(1).join(' > ');
    if (this.checkCommonPath(ele1Path, ele2Path)) {
      const path = this.cssPath(commonParent, '');
      const commonSelector = `${path} ${ele1Path}`;
      return commonSelector;
    }
    return false;
  }

  commonSelector(firstElement, secondElement) {
    return getCommonSelector($(firstElement), $(secondElement))
  }
}
