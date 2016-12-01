'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cssChecklistHelper = require('./css-checklist-helper');

var _cssChecklistHelper2 = _interopRequireDefault(_cssChecklistHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CssTraversalHelper = function (_CssCheckListHelper) {
  _inherits(CssTraversalHelper, _CssCheckListHelper);

  function CssTraversalHelper(props) {
    _classCallCheck(this, CssTraversalHelper);

    var _this = _possibleConstructorReturn(this, (CssTraversalHelper.__proto__ || Object.getPrototypeOf(CssTraversalHelper)).call(this, props));

    _this.nthChildStr = _this.nthChildStr.bind(_this);
    _this.checkCommonPath = _this.checkCommonPath.bind(_this);
    _this.isUniqueToParent = _this.isUniqueToParent.bind(_this);
    _this.formPriorityArray = _this.formPriorityArray.bind(_this);
    _this.checkCommonParent = _this.checkCommonParent.bind(_this);
    _this.isUniqueInDocument = _this.isUniqueInDocument.bind(_this);
    _this.checkUniqueInParent = _this.checkUniqueInParent.bind(_this);
    _this.childToParentTraversal = _this.childToParentTraversal.bind(_this);
    _this.composePathStringHelper = _this.composePathStringHelper.bind(_this);
    return _this;
  }

  _createClass(CssTraversalHelper, [{
    key: 'composePathStringHelper',
    value: function composePathStringHelper(key, val) {
      switch (key) {
        case 'tag':
          return val;
        case 'id':
          return '#' + val;
        case 'class':
          return '.' + val;
      }
    }
  }, {
    key: 'isUniqueToParent',
    value: function isUniqueToParent(element, path) {
      return element.parent().find(path).length === 1;
    }
  }, {
    key: 'isUniqueInDocument',
    value: function isUniqueInDocument(element, path) {
      var root = element.closest(this.root);
      return root.find(path).length === 1;
    }
  }, {
    key: 'nthChildStr',
    value: function nthChildStr(element) {
      var str = element.prop('tagName').toLowerCase() + ':nth-child(';
      element.parent().children().each(function (idx, child) {
        if (element.is(child)) str += idx + 1 + ')';
      });
      return str;
    }
  }, {
    key: 'formPriorityArray',
    value: function formPriorityArray(checkList) {
      var _this2 = this;

      this.priority.reduce(function (pre, cur) {
        return pre.concat(_this2.composePathStringHelper(cur, checkList[cur]));
      }, []);
    }
  }, {
    key: 'checkUniqueInParent',
    value: function checkUniqueInParent(priorityArray, path) {
      var temPath = path;
      for (var i = 0; i < priorityArray.length; i++) {
        for (var j = i; j < priorityArray.length; j++) {
          var newPath = '' + temPath + priorityArray[j];
          var result = this.isUniqueToParent(element, newPath) && newPath;
          if (result) return result;
        }
        temPath += priorityArray[i];
      }
      return false;
    }
  }, {
    key: 'checkCommonParent',
    value: function checkCommonParent(elm1, elm2) {
      if (!elm1.length || !elm2.length) return null;
      return elm1.is(elm2) ? elm1 : this.checkCommonParent(elm1.parent(), elm2.parent());
    }
  }, {
    key: 'childToParentTraversal',
    value: function childToParentTraversal(child, par) {
      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      if (par.is(child)) return path;
      path.unshift(this.nthChildStr(child));
      path = this.childToParentTraversal(child.parent(), par, path);
      return path;
    }
  }, {
    key: 'checkCommonPath',
    value: function checkCommonPath(path1, path2) {
      path1 !== null && path1 === path2;
    }
  }]);

  return CssTraversalHelper;
}(_cssChecklistHelper2.default);

exports.default = CssTraversalHelper;