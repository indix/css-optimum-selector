'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.childToParentTraversal = exports.checkCommonParent = exports.getCommonSelector = exports.nthChildStr = exports.cssPath = undefined;

var _cssPath = require('./css-path');

var _cssPath2 = _interopRequireDefault(_cssPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkCommonParent = function checkCommonParent(a, b) {
  if (!a.length || !b.length) return null;
  return a.is(b) ? a : checkCommonParent(a.parent(), b.parent());
};
var nthChildStr = function nthChildStr(ele) {
  var str = ele.prop('tagName').toLowerCase() + ':nth-child(';
  ele.parent().children().each(function (idx, child) {
    if (ele.is(child)) str += idx + 1 + ')';
  });
  return str;
};

var childToParentTraversal = function childToParentTraversal(child, par) {
  var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (par.is(child)) return path;
  path.unshift(nthChildStr(child));
  path = childToParentTraversal(child.parent(), par, path);
  return path;
};

var checkCommonPath = function checkCommonPath(path1, path2) {
  return path1 !== null && path1 === path2;
};

var getCommonSelector = function getCommonSelector(ele1, ele2, $) {
  var commonParent = checkCommonParent(ele1, ele2);
  if (!commonParent) return false;
  var ele1Path = childToParentTraversal(ele1, commonParent).slice(1).join(' > ');
  var ele2Path = childToParentTraversal(ele2, commonParent).slice(1).join(' > ');
  if (checkCommonPath(ele1Path, ele2Path)) {
    var path = (0, _cssPath2.default)(commonParent, $);
    var commonSelector = path + ' * ' + ele1Path;
    return commonSelector;
  }
  return false;
};

exports.cssPath = _cssPath2.default;
exports.nthChildStr = nthChildStr;
exports.getCommonSelector = getCommonSelector;
exports.checkCommonParent = checkCommonParent;
exports.childToParentTraversal = childToParentTraversal;