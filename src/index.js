import CssOptimumSelectorHelper from './css-traversal-helper'
import $ from 'jquery'
export default class CssOptimumSelector extends CssOptimumSelectorHelper {

  getUniqueCssSelector(element, path = '') {
    if (path && this.isUniqueInDocument(element, path)) return path
    const checkList = this.getCheckList(element)
    const filteredCheckList = this.getFilteredCheckList(checkList)
    const priorityArray = this.formPriorityArray(filteredCheckList)
    const result = this.checkUniqueInParent(element.parent(), priorityArray, path)
    let parentPath = null
    if(result) {
      parentPath = result
    } else {
      parentPath = `${this.nthChildStr(element)}`
      if (path) parentPath = `${parentPath} > ${path}`
    }
    return this.getUniqueCssSelector(element.parent(), parentPath)
  }

  uniqueCssSelector(element) {
    return this.getUniqueCssSelector($(element))
  }

  getMultiSelector(firstElement, secondElement, relativeDepth = this.relativeDepth) {
    const commonParent = this.checkCommonParent(firstElement, secondElement)
    const noCommonSelector = () => [
      this.getUniqueCssSelector(firstElement),
      this.getUniqueCssSelector(secondElement)
    ]
    if (!commonParent) return noCommonSelector()
    const ele1Path = this.childToParentTraversal(firstElement, commonParent).slice(1).join(' > ')
    const ele2Path = this.childToParentTraversal(secondElement, commonParent).slice(1).join(' > ')
    if (this.checkCommonPath(ele1Path, ele2Path)) {
      const path = this.getUniqueCssSelector(commonParent)
      const relativeDegree = this.checkRelativeDegree(ele1Path, ele2Path)
      const relativeChildPath = this.getRelativeChildPath(ele1Path,relativeDepth)
      const commonSelector = `${path} ${relativeChildPath}`
      return [commonSelector]
    }
    return noCommonSelector()
  }

  multiSelector(firstElement, secondElement, relativeDepth = this.relativeDepth) {
    return getMultiSelector($(firstElement), $(secondElement))
  }
}
