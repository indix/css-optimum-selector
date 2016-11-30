import customClass from './css-class';

let classSelector = function (className) {
  var selectors = className.split(/\s/g)
    , array = []

  array = selectors.map((selector) => {
    if (Object.keys(customClass).map(cssClass => customClass[cssClass]).includes(selector)) return '';
    else if (selector.length > 0)
      return '.' + selector
    return ''
  })
  return array.join('')
}

let nthChild = function (elm) {
  var childNumber = 0
    , childNodes = elm.parentNode.childNodes
    , index = 0

  for(; index < childNodes.length; ++index) {
    if (childNodes[index].nodeType === 1)
      ++childNumber

    if (childNodes[index] === elm)
      return childNumber
  }
}

const _cssPath = function(elm, $, list) {

  let isUnique = (selectorList) => $(cssPathToString(selectorList)).length === 1
  var tag = elm.tagName.toLowerCase()
    , selector = [ tag ]
    , className = elm.getAttribute('class')
    , id = elm.getAttribute('id')

  if (id) {
    list.unshift( tag + '#' + id.trim() )
    if (isUnique(list))
      return list
    list.shift()
    selector.push('#' + id.trim())
  }

  if (className)
    selector.push( classSelector(className) )

  if (tag !== 'html' && tag !== 'body' && elm.parentNode) {
    list.unshift(selector.join(''))
    var isUniqueToParent = $(elm.parentNode).find(cssPathToString(list)).length === 1
    if (!isUniqueToParent) {
      list.shift()
      list.unshift(selector.join(''), nthChild(elm))
    }
    if (!isUnique(list))
      return _cssPath(elm.parentNode, $, list)
  }

  return list
}

let cssPathToString = function(cssPath) {
  return cssPath.reduce((prevSelector, currentSelector) => {
    if(!prevSelector)
      return currentSelector
    if(typeof currentSelector === 'number')
      return `${prevSelector}:nth-child(${currentSelector})`
    return `${prevSelector} > ${currentSelector}`
  }, null)
}

export let getCommonCssPath = function(css1, css2) {
  return cssPathToString(css1.filter((selector, index) => selector === css2[index]))
}

export let cssPath = function(elm, $) {
  return _cssPath(elm, $, [])
}

export default function(elm, $) {
  return cssPathToString(cssPath(elm, $))
}
