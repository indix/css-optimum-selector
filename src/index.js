import CssOptimumSelectorHelper from './css-optimum-selector-helper'

export default class CssOptimumSelector extends CssOptimumSelectorHelper {

  constructor(props) {
    super(props)
    this.cssPath = this.cssPath.bind(this)
  }

  cssPath(element, path = '') {
    if (path && isUniqueInDocument(path)) return path
    const checkList = getCheckList(element)
    const filteredCheckList = getFilteredCheckList(checkList)
    const priorityArray = this.formPriorityArray(filteredCheckList)
    const result = this.checkUniqueInParent(priorityArray, path)
    const parentPath = path ? `${path} > ` : ''
    if (result) return cssPath(element.parent(), `${parentPath}${result}`)
    return cssPath(element.parent(), `${parentPath}${this.nthChildStr(element)}`)
  }

  uniqueCssSelector(element) {
    return this.cssPath($(element))
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
}
