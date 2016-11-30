import customClass from './css-class';

const cssPathToString = cssPath =>
  cssPath.reduce((prevSelector, currentSelector) => {
    if (!prevSelector) return currentSelector;
    if (typeof currentSelector === 'number') return `${prevSelector}:nth-child(${currentSelector})`;
    return `${prevSelector} > ${currentSelector}`;
  }, null);


const classSelector = (className) => {
  const selectors = className.split(/\s/g);
  let array = [];
  array = selectors.map((selector) => {
    if (Object.keys(customClass).map(cssClass => customClass[cssClass]).includes(selector)) return '';
    else if (selector.length > 0) return `.${selector}`;
    return '';
  });
  return array.join('');
};

const nthChild = (elm) => {
  let childNumber = 0;
  const childNodes = elm.parent().children();
  for (let index = 0; index < childNodes.length; index += 1) {
    if (childNodes[index].nodeType === 1) childNumber += 1;
    if (childNodes[index] === elm) return childNumber;
  }
  return childNumber;
};

const cssPathHelper = (elm, $, list) => {
  const isUnique = selectorList => $(cssPathToString(selectorList)).length === 1;
  const tag = elm.prop('tagName').toLowerCase();
  const selector = [tag];
  const className = elm.attr('class');
  const id = elm.attr('id');

  if (id) {
    list.unshift(`${tag}#${id.trim()}`);
    if (isUnique(list)) return list;
    list.shift();
    selector.push(`#${id.trim()}`);
  }
  if (className) selector.push(classSelector(className));
  if (tag !== 'html' && tag !== 'body' && elm.parent()) {
    list.unshift(selector.join(''));
    const isUniqueToParent = elm.parent().find(cssPathToString(list)).length === 1;
    if (!isUniqueToParent) {
      list.shift();
      list.unshift(selector.join(''), nthChild(elm));
    }
    if (!isUnique(list)) return cssPathHelper(elm.parent(), $, list);
  }
  return list;
};

export const cssPath = (elm, $) => cssPathHelper(elm, $, []);

export default function (elm, $) {
  return cssPathToString(cssPath(elm, $));
}
