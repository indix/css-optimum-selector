'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cssTraversalHelper = require('./css-traversal-helper');

var _cssTraversalHelper2 = _interopRequireDefault(_cssTraversalHelper);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CssOptimumSelector = function (_CssOptimumSelectorHe) {
  _inherits(CssOptimumSelector, _CssOptimumSelectorHe);

  function CssOptimumSelector(props) {
    _classCallCheck(this, CssOptimumSelector);

    var _this = _possibleConstructorReturn(this, (CssOptimumSelector.__proto__ || Object.getPrototypeOf(CssOptimumSelector)).call(this, props));

    _this.multiSelector = _this.multiSelector.bind(_this);
    _this.getMultiSelector = _this.getMultiSelector.bind(_this);
    _this.uniqueCssSelector = _this.uniqueCssSelector.bind(_this);
    _this.getUniqueCssSelector = _this.getUniqueCssSelector.bind(_this);
    return _this;
  }

  _createClass(CssOptimumSelector, [{
    key: 'getUniqueCssSelector',
    value: function getUniqueCssSelector(element) {
      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (path && this.isUniqueInDocument(element, path)) return path;
      var checkList = this.getCheckList(element);
      var filteredCheckList = this.getFilteredCheckList(checkList);
      var priorityArray = this.formPriorityArray(filteredCheckList);
      var result = this.checkUniqueInParent(element.parent(), priorityArray, path);
      var parentPath = null;
      if (result) {
        parentPath = result;
      } else {
        parentPath = '' + this.nthChildStr(element);
        if (path) parentPath = parentPath + ' > ' + path;
      }
      return this.getUniqueCssSelector(element.parent(), parentPath);
    }
  }, {
    key: 'uniqueCssSelector',
    value: function uniqueCssSelector(element) {
      return this.getUniqueCssSelector((0, _jquery2.default)(element));
    }
  }, {
    key: 'getMultiSelector',
    value: function getMultiSelector(firstElement, secondElement) {
      var _this2 = this;

      var relativeDepth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.relativeDepth;

      var commonParent = this.checkCommonParent(firstElement, secondElement);
      var noCommonSelector = function noCommonSelector() {
        return [_this2.getUniqueCssSelector(firstElement), _this2.getUniqueCssSelector(secondElement)];
      };
      if (!commonParent) return noCommonSelector();
      var ele1Path = this.childToParentTraversal(firstElement, commonParent).slice(1).join(' > ');
      var ele2Path = this.childToParentTraversal(secondElement, commonParent).slice(1).join(' > ');
      if (this.checkCommonPath(ele1Path, ele2Path)) {
        var path = this.getUniqueCssSelector(commonParent);
        var relativeDegree = this.checkRelativeDegree(ele1Path, ele2Path);
        var relativeChildPath = this.getRelativeChildPath(ele1Path, relativeDepth);
        var commonSelector = path + ' ' + relativeChildPath;
        return [commonSelector];
      }
      return noCommonSelector();
    }
  }, {
    key: 'multiSelector',
    value: function multiSelector(firstElement, secondElement) {
      var relativeDepth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.relativeDepth;

      return this.getMultiSelector((0, _jquery2.default)(firstElement), (0, _jquery2.default)(secondElement), relativeDepth);
    }
  }]);

  return CssOptimumSelector;
}(_cssTraversalHelper2.default);

exports.default = CssOptimumSelector;