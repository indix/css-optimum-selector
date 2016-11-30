'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cssPath = exports.getCommonCssPath = undefined;

exports.default = function (elm, $) {
  return cssPathToString(cssPath(elm, $));
};

var _cssClass = require('./css-class');

var _cssClass2 = _interopRequireDefault(_cssClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var classSelector = function classSelector(className) {
  var selectors = className.split(/\s/g),
      array = [];

  array = selectors.map(function (selector) {
    if (Object.keys(_cssClass2.default).map(function (cssClass) {
      return _cssClass2.default[cssClass];
    }).includes(selector)) return '';else if (selector.length > 0) return '.' + selector;
    return '';
  });
  return array.join('');
};

var nthChild = function nthChild(elm) {
  var childNumber = 0,
      childNodes = elm.parentNode.childNodes,
      index = 0;

  for (; index < childNodes.length; ++index) {
    if (childNodes[index].nodeType === 1) ++childNumber;

    if (childNodes[index] === elm) return childNumber;
  }
};

var _cssPath = function _cssPath(elm, $, list) {

  var isUnique = function isUnique(selectorList) {
    return $(cssPathToString(selectorList)).length === 1;
  };
  var tag = elm.tagName.toLowerCase(),
      selector = [tag],
      className = elm.getAttribute('class'),
      id = elm.getAttribute('id');

  if (id) {
    list.unshift(tag + '#' + id.trim());
    if (isUnique(list)) return list;
    list.shift();
    selector.push('#' + id.trim());
  }

  if (className) selector.push(classSelector(className));

  if (tag !== 'html' && tag !== 'body' && elm.parentNode) {
    list.unshift(selector.join(''));
    var isUniqueToParent = $(elm.parentNode).find(cssPathToString(list)).length === 1;
    if (!isUniqueToParent) {
      list.shift();
      list.unshift(selector.join(''), nthChild(elm));
    }
    if (!isUnique(list)) return _cssPath(elm.parentNode, $, list);
  }

  return list;
};

var cssPathToString = function cssPathToString(cssPath) {
  return cssPath.reduce(function (prevSelector, currentSelector) {
    if (!prevSelector) return currentSelector;
    if (typeof currentSelector === 'number') return prevSelector + ':nth-child(' + currentSelector + ')';
    return prevSelector + ' > ' + currentSelector;
  }, null);
};

var getCommonCssPath = exports.getCommonCssPath = function getCommonCssPath(css1, css2) {
  return cssPathToString(css1.filter(function (selector, index) {
    return selector === css2[index];
  }));
};

var cssPath = exports.cssPath = function cssPath(elm, $) {
  return _cssPath(elm, $, []);
};