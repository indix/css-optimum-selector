'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cssPath = undefined;

exports.default = function (elm, $) {
  return cssPathToString(cssPath(elm, $));
};

var _cssClass = require('./css-class');

var _cssClass2 = _interopRequireDefault(_cssClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cssPathToString = function cssPathToString(cssPath) {
  return cssPath.reduce(function (prevSelector, currentSelector) {
    if (!prevSelector) return currentSelector;
    if (typeof currentSelector === 'number') return prevSelector + ':nth-child(' + currentSelector + ')';
    return prevSelector + ' > ' + currentSelector;
  }, null);
};

var classSelector = function classSelector(className) {
  var selectors = className.split(/\s/g);
  var array = [];
  array = selectors.map(function (selector) {
    if (Object.keys(_cssClass2.default).map(function (cssClass) {
      return _cssClass2.default[cssClass];
    }).includes(selector)) return '';else if (selector.length > 0) return '.' + selector;
    return '';
  });
  return array.join('');
};

var nthChild = function nthChild(elm) {
  var childNumber = 0;
  var childNodes = elm.parent().children();
  for (var index = 0; index < childNodes.length; index += 1) {
    if (childNodes[index].nodeType === 1) childNumber += 1;
    if (childNodes[index] === elm) return childNumber;
  }
  return childNumber;
};

var cssPathHelper = function cssPathHelper(elm, $, list) {
  var isUnique = function isUnique(selectorList) {
    return $(cssPathToString(selectorList)).length === 1;
  };
  var tag = elm.prop('tagName').toLowerCase();
  var selector = [tag];
  var className = elm.attr('class');
  var id = elm.attr('id');

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
    if (!isUnique(list)) return cssPathHelper(elm.parentNode, $, list);
  }
  return list;
};

var cssPath = exports.cssPath = function cssPath(elm, $) {
  return cssPathHelper(elm, $, []);
};