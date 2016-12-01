'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cssTraversalHelper = require('./css-traversal-helper');

var _cssTraversalHelper2 = _interopRequireDefault(_cssTraversalHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CssOptimumSelector = function (_CssOptimumSelectorHe) {
  _inherits(CssOptimumSelector, _CssOptimumSelectorHe);

  function CssOptimumSelector(props) {
    _classCallCheck(this, CssOptimumSelector);

    var _this = _possibleConstructorReturn(this, (CssOptimumSelector.__proto__ || Object.getPrototypeOf(CssOptimumSelector)).call(this, props));

    _this.cssPath = _this.cssPath.bind(_this);
    _this.uniqueCssSelector = _this.uniqueCssSelector.bind(_this);
    _this.getCommonSelector = _this.getCommonSelector.bind(_this);
    return _this;
  }

  _createClass(CssOptimumSelector, [{
    key: 'cssPath',
    value: function (_cssPath) {
      function cssPath(_x) {
        return _cssPath.apply(this, arguments);
      }

      cssPath.toString = function () {
        return _cssPath.toString();
      };

      return cssPath;
    }(function (element) {
      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (path && this.isUniqueInDocument(path)) return path;
      var checkList = this.getCheckList(element);
      var filteredCheckList = this.getFilteredCheckList(checkList);
      var priorityArray = this.formPriorityArray(filteredCheckList);
      var result = this.checkUniqueInParent(priorityArray, path);
      var parentPath = path ? path + ' > ' : '';
      if (result) return cssPath(element.parent(), '' + parentPath + result);
      return this.cssPath(element.parent(), '' + parentPath + this.nthChildStr(element));
    })
  }, {
    key: 'uniqueCssSelector',
    value: function uniqueCssSelector(element) {
      return this.cssPath($(element));
    }
  }, {
    key: 'getCommonSelector',
    value: function getCommonSelector(firstElement, secondElement) {
      var commonParent = this.checkCommonParent(firstElement, secondElement);
      if (!commonParent) return false;
      var ele1Path = this.childToParentTraversal(ele1, commonParent).slice(1).join(' > ');
      var ele2Path = this.childToParentTraversal(ele2, commonParent).slice(1).join(' > ');
      if (this.checkCommonPath(ele1Path, ele2Path)) {
        var path = this.cssPath(commonParent, '');
        var commonSelector = path + ' ' + ele1Path;
        return commonSelector;
      }
      return false;
    }
  }, {
    key: 'commonSelector',
    value: function commonSelector(firstElement, secondElement) {
      return getCommonSelector($(firstElement), $(secondElement));
    }
  }]);

  return CssOptimumSelector;
}(_cssTraversalHelper2.default);

exports.default = CssOptimumSelector;